import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = body.password;

  // Gunakan environment variable ADMIN_PASSWORD, dengan fallback aman 'admin123' untuk lingkungan lokal/dev
  const expected = process.env.ADMIN_PASSWORD || "admin123";

  if (!password || password !== expected) {
    return NextResponse.json(
      { error: "Password salah" },
      { status: 401 }
    );
  }

  return NextResponse.json({ authenticated: true });
}
