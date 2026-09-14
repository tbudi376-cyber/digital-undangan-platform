import crypto from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 24 * 60 * 60; // 24 hours
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout

interface RateLimitRecord {
  failedAttempts: number;
  firstFailedAt: number;
  lockedUntil: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

/**
 * Periodically purge stale rate limit records to prevent memory growth.
 */
function cleanupExpiredRateLimits() {
  const now = Date.now();
  for (const [ip, record] of loginAttempts.entries()) {
    if (now > record.lockedUntil && now - record.firstFailedAt > LOGIN_WINDOW_MS) {
      loginAttempts.delete(ip);
    }
  }
}

/**
 * Retrieve configured admin password, or null if unconfigured.
 * Fail-closed: Never returns a default or fallback password.
 */
export function getAdminPassword(): string | null {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd || typeof pwd !== "string" || pwd.trim() === "") {
    return null;
  }
  return pwd;
}

/**
 * Check if the given IP address is currently rate-limited/locked out.
 */
export function checkLoginRateLimit(ip: string): { allowed: boolean; remainingLockoutSeconds?: number } {
  cleanupExpiredRateLimits();
  const record = loginAttempts.get(ip);
  if (!record) {
    return { allowed: true };
  }

  const now = Date.now();
  if (record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, remainingLockoutSeconds: remainingSeconds };
  }

  // If window expired and not locked out, reset count
  if (now - record.firstFailedAt > LOGIN_WINDOW_MS) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

/**
 * Record a failed login attempt for the given IP address.
 */
export function recordFailedLogin(ip: string): { isLocked: boolean; remainingLockoutSeconds?: number } {
  cleanupExpiredRateLimits();
  const now = Date.now();
  let record = loginAttempts.get(ip);

  if (!record || now - record.firstFailedAt > LOGIN_WINDOW_MS) {
    record = {
      failedAttempts: 1,
      firstFailedAt: now,
      lockedUntil: 0,
    };
    loginAttempts.set(ip, record);
    return { isLocked: false };
  }

  record.failedAttempts += 1;
  if (record.failedAttempts >= MAX_LOGIN_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    const remainingSeconds = Math.ceil(LOCKOUT_DURATION_MS / 1000);
    return { isLocked: true, remainingLockoutSeconds: remainingSeconds };
  }

  return { isLocked: false };
}

/**
 * Reset rate limit tracking for an IP address upon successful login.
 */
export function resetLoginRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

/**
 * Timing-safe password verification to prevent side-channel timing attacks.
 */
export function verifyPasswordTimingSafe(provided: string, expected: string): boolean {
  if (typeof provided !== "string" || typeof expected !== "string") {
    return false;
  }

  const providedHash = crypto.createHash("sha256").update(provided).digest();
  const expectedHash = crypto.createHash("sha256").update(expected).digest();

  return crypto.timingSafeEqual(providedHash, expectedHash);
}

/**
 * Create an HMAC-signed session token for the authenticated admin.
 */
export function createAdminSessionToken(secret: string): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin:${expiresAt}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${expiresAt}.${signature}`;
}

/**
 * Verify an HMAC-signed admin session token.
 */
export function verifyAdminSession(token: string | undefined): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  const secret = getAdminPassword();
  if (!secret) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return false;
  }

  const [expiresAtStr, signature] = parts;
  if (!signature || signature.length !== 64 || !/^[0-9a-f]{64}$/i.test(signature)) {
    return false;
  }

  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) {
    return false; // Token expired or invalid timestamp
  }

  const payload = `admin:${expiresAtStr}`;
  const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

  try {
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (sigBuffer.length !== expectedBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

/**
 * Standard cookie configuration for the admin session.
 */
export function getAdminCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
