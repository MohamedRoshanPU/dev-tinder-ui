import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [{ source: "/", destination: "/feed", permanent: true }];
  },
  images: {
    domains: ["avatar.iran.liara.run"], // Add this domain
  },
};

export default nextConfig;
