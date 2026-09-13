import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getClientData, getGuestbook } from "@/lib/api";
import { ThemeRenderer } from "@/components/themes/ThemeRenderer";

// ---------------------------------------------------------------------------
// Dynamic Invitation Page — Server Component with ISR
// ---------------------------------------------------------------------------
// Each wedding client gets a unique slug (e.g., /andi-nina).
// This page fetches their data from GAS, caches it for 5 minutes (ISR),
// and renders the appropriate theme component.
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate dynamic SEO metadata based on the client's data.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getClientData(slug);

  if (!data) {
    return {
      title: "Undangan Tidak Ditemukan",
      description: "Undangan pernikahan yang Anda cari tidak tersedia.",
    };
  }

  const title = `Undangan Pernikahan ${data.groom_nickname} & ${data.bride_nickname}`;
  const description = `Anda diundang ke pernikahan ${data.groom_full_name} & ${data.bride_full_name}. Mohon konfirmasi kehadiran Anda.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: data.hero_image ? [data.hero_image] : [],
    },
  };
}

/**
 * The main dynamic page component.
 * Fetches client data using ISR and renders the correct theme.
 */
export default async function InvitationPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const to = resolvedSearchParams?.to;
  const guestName = typeof to === "string" ? to : Array.isArray(to) ? to[0] : undefined;
  
  // Q2: Instant Preview mode (?preview=true or ?preview=1) bypasses 5-min ISR cache
  const isPreview = resolvedSearchParams?.preview === "true" || resolvedSearchParams?.preview === "1";

  const [clientData, guestbookData] = await Promise.all([
    getClientData(slug, isPreview),
    getGuestbook(slug, isPreview)
  ]);

  if (!clientData) {
    notFound();
  }

  // Allow overriding theme via URL for catalog demo purposes
  const themeOverride = typeof resolvedSearchParams?.theme === "string" ? resolvedSearchParams.theme : undefined;
  if (themeOverride) {
    clientData.theme = themeOverride;
  }

  return (
    <>
      {isPreview && (
        <aside
          aria-label="Status Mode Preview"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-amber-500/95 text-slate-950 font-medium px-4 py-1.5 rounded-full shadow-lg text-xs backdrop-blur-md flex items-center gap-2 border border-amber-300 pointer-events-auto select-none"
        >
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
          <span>Mode Preview Instan (Cache 5 menit dinonaktifkan)</span>
        </aside>
      )}
      <ThemeRenderer data={clientData} guestName={guestName} guestbook={guestbookData} />
    </>
  );
}
