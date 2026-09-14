import { NextRequest, NextResponse } from "next/server";
import { getGuestbook, getClientData } from "@/lib/api";
import { verifyAdminSession } from "@/lib/auth";

/**
 * API Route to fetch and calculate RSVP summary & catering headcount (Q4).
 * Protected by admin session cookie.
 *
 * GET /api/rsvp-summary?slug=desti-anton
 */
export async function GET(request: NextRequest) {
  // Enforce server-side admin session check (fail-closed)
  const sessionToken = request.cookies.get("admin_session")?.value;
  if (!verifyAdminSession(sessionToken)) {
    return NextResponse.json(
      { error: "Unauthorized. Sesi admin diperlukan untuk mengakses rekap RSVP." },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Parameter 'slug' diperlukan" },
      { status: 400 }
    );
  }

  try {
    // Fetch uncached client data & guestbook entries
    const [clientData, guestbook] = await Promise.all([
      getClientData(slug, true),
      getGuestbook(slug, true),
    ]);

    const bride = clientData?.bride_nickname || "Mempelai Wanita";
    const groom = clientData?.groom_nickname || "Mempelai Pria";
    const coupleName = `${groom} & ${bride}`;

    const totalEntries = guestbook.length;
    const hadirEntries = guestbook.filter(
      (e) => (e.kehadiran || "").toLowerCase() === "hadir"
    );
    const tidakHadirEntries = guestbook.filter(
      (e) => (e.kehadiran || "").toLowerCase() !== "hadir"
    );

    const totalHadir = hadirEntries.length;
    const totalTidakHadir = tidakHadirEntries.length;
    const hadirPercentage =
      totalEntries > 0 ? Math.round((totalHadir / totalEntries) * 100) : 0;

    // Build formatted WhatsApp message for client
    const todayStr = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const hadirListText =
      hadirEntries.length > 0
        ? hadirEntries
            .map((e, idx) => `${idx + 1}. *${e.nama_tamu}* - "${e.pesan}"`)
            .join("\n")
        : "_(Belum ada konfirmasi hadir)_";

    const waReportText = `*REKAP RSVP & ESTIMASI KATERING — TEMU WAKTU*
Kepada: Kak *${coupleName}*
Tanggal Update: ${todayStr}

📊 *RINGKASAN KEHADIRAN:*
• Total Respon Masuk: *${totalEntries}* ucapan
• Konfirmasi Hadir: *${totalHadir}* orang
• Konfirmasi Berhalangan: *${totalTidakHadir}* orang
• Persentase Kehadiran: *${hadirPercentage}%*

🍽️ *ESTIMASI PORSI KATERING:*
• Minimum pax tamu terkonfirmasi: *${totalHadir} porsi*
*(Rekomendasi cadangan buffer katering +10% s.d +20%: ~${Math.ceil(totalHadir * 1.15)} porsi)*

📋 *DAFTAR TAMU TERKONFIRMASI HADIR:*
${hadirListText}

Data ini dapat langsung Kakak jadikan acuan untuk finalisasi porsi katering dan buku tamu fisik di venue ya. Semoga acaranya lancar dan berkah selalu! ✨

— *Temu Waktu Support Team*`;

    return NextResponse.json({
      status: "success",
      data: {
        slug,
        coupleName,
        totalEntries,
        totalHadir,
        totalTidakHadir,
        hadirPercentage,
        entries: guestbook,
        waReportText,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
