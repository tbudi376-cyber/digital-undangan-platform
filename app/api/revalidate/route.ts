import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-Demand Cache Revalidation API Route (Q2)
 *
 * Endpoint to instantly clear ISR cached pages when client data is updated.
 *
 * Usage:
 * POST /api/revalidate
 * Body: { "slug": "desti-anton", "secret": "..." }
 * OR
 * GET /api/revalidate?slug=desti-anton&secret=...
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const searchParams = request.nextUrl.searchParams;

    const slug = body.slug || searchParams.get("slug");
    const secret = body.secret || searchParams.get("secret");

    const expectedSecret = process.env.REVALIDATE_SECRET;
    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Missing required 'slug' parameter" },
        { status: 400 }
      );
    }

    // Revalidate dynamic page and home page
    revalidatePath(`/${slug}`, "page");
    revalidatePath("/", "page");

    return NextResponse.json({
      revalidated: true,
      slug,
      now: Date.now(),
      message: `Cache untuk /${slug} berhasil diperbarui.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const secret = searchParams.get("secret");

  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Invalid revalidation secret" },
      { status: 401 }
    );
  }

  if (!slug) {
    return NextResponse.json(
      { error: "Missing required 'slug' query parameter" },
      { status: 400 }
    );
  }

  revalidatePath(`/${slug}`, "page");
  revalidatePath("/", "page");

  return NextResponse.json({
    revalidated: true,
    slug,
    now: Date.now(),
    message: `Cache untuk /${slug} berhasil diperbarui.`,
  });
}
