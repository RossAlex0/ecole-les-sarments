import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * Kept conservative on purpose: no strict script/style CSP (that would require
 * nonce middleware and risk breaking Next's inline scripts) — only the headers
 * that harden the site without breaking the YouTube / Google Maps embeds or the
 * Supabase images.
 */
const securityHeaders = [
  // Force HTTPS for 2 years (Vercel serves HTTPS).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Block MIME-type sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Anti-clickjacking: only same-origin may frame the site.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Don't leak full URLs to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful features the site never uses (embeds unaffected).
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.24"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "funnkywkqepwqnasuuxe.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
