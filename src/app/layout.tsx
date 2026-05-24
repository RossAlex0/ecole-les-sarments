import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/block/header/Header";
import Footer from "@/components/block/footer/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ecole-les-sermants",
  description: "Ecole des sarments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
