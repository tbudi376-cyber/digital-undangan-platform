import { NextRequest, NextResponse } from "next/server";
import {
  getAdminPassword,
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
  verifyPasswordTimingSafe,
  createAdminSessionToken,
  verifyAdminSession,
  getAdminCookieOptions,
} from "@/lib/auth";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

/**
 * GET /api/verify-admin
 * Validates the current admin session cookie.
 */
export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("admin_session")?.value;

  if (verifyAdminSession(sessionToken)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json(
    { authenticated: false, error: "Sesi tidak valid atau telah kedaluwarsa" },
    { status: 401 }
  );
}

/**
 * POST /api/verify-admin
 * Verifies credentials, applies brute-force protection, and issues HttpOnly session cookie.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  // 1. Brute-force rate limiting check
  const rateLimit = checkLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan gagal. Akses dikunci sementara selama ${rateLimit.remainingLockoutSeconds} detik.`,
      },
      { status: 429 }
    );
  }

  // 2. Fail-closed: Must have ADMIN_PASSWORD configured on server
  const expectedPassword = getAdminPassword();
  if (!expectedPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not configured on the server" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";

  // 3. Timing-safe password check
  const isMatch = verifyPasswordTimingSafe(password, expectedPassword);

  if (!isMatch) {
    const failedRecord = recordFailedLogin(ip);
    if (failedRecord.isLocked) {
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan gagal. Akses dikunci selama ${failedRecord.remainingLockoutSeconds} detik.`,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Password salah" },
      { status: 401 }
    );
  }

  // 4. Authentication success: reset rate limit and issue secure session cookie
  resetLoginRateLimit(ip);

  const sessionToken = createAdminSessionToken(expectedPassword);
  const cookieOptions = getAdminCookieOptions();

  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(cookieOptions.name, sessionToken, cookieOptions);

  return response;
}

/**
 * DELETE /api/verify-admin
 * Logs out the admin by invalidating the session cookie.
 */
export async function DELETE() {
  const cookieOptions = getAdminCookieOptions();
  const response = NextResponse.json({
    authenticated: false,
    message: "Berhasil keluar dari sesi admin",
  });

  response.cookies.set(cookieOptions.name, "", {
    ...cookieOptions,
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
