import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/utils/site";
import "../styles/globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "École Les Sarments — école maternelle & primaire libre à Toulouse";
const DESCRIPTION =
  "École Les Sarments : école hors contrat maternelle et primaire à Toulouse. Effectifs réduits, excellence et bienveillance pour l'épanouissement de chaque enfant.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  publisher: "Vercel",
  authors: [{ name: "Alex Rossignol", url: "https://www.alex-rossignol.fr/" }],
  category: "education",
  keywords: [
    "école",
    "Toulouse",
    "Maternelle",
    "école maternelle Toulouse",
    "école primaire Toulouse",
    "école privée Toulouse",
    "école hors contrat",
    "école privé",
    "éducation",
    "savoir",
    "bienveillance",
    "Les Sarments",
    "musique",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/image/image-og.png", width: 581, height: 393, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/image/image-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
