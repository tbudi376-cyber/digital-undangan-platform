import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = body.password;

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not configured on server" },
      { status: 503 }
    );
  }

  if (!password || password !== expected) {
    return NextResponse.json(
      { error: "Password salah" },
      { status: 401 }
    );
  }

  return NextResponse.json({ authenticated: true });
}
