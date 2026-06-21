import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
