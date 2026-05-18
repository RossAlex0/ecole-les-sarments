import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import '../styles/globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ecole-les-sermants',
  description: 'Ecole des sarments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={playfair.variable}>
      <body>{children}</body>
    </html>
  );
}
