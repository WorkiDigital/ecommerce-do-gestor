import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "conversa-ecommerce-do-gestor.ubufeb.easypanel.host",
        "localhost:3000"
      ]
    }
  }
};

export default nextConfig;
