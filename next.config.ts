import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "trafegohub.workidigital.tech",
        "conversa-ecommerce-do-gestor.ubufeb.easypanel.host",
        "localhost:3000"
      ]
    }
  }
};

export default nextConfig;
