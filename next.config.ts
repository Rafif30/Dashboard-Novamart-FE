import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      }
    ]
  },
  async redirects() {
    return [
        {
            source: "/",
            destination: "/overview",
            permanent: true,
        },
    ];
  },
};

export default nextConfig;
