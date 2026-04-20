import { MetadataRoute } from "next";

export const revalidate = 86400; // Cache de 1 dia

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/"],
    },
    sitemap: "https://trafegohub.workidigital.tech/sitemap.xml",
  };
}
