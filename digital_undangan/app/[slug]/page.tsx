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
  const [clientData, guestbookData] = await Promise.all([
    getClientData(slug),
    getGuestbook(slug)
  ]);

  if (!clientData) {
    notFound();
  }

  return <ThemeRenderer data={clientData} guestName={guestName} guestbook={guestbookData} />;
}
