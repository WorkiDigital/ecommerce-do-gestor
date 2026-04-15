import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://trafegohub.workidigital.tech";

  // Buscar todos os gestores para criar URLs dinâmicas
  const gestores = await prisma.profile.findMany({
    select: { slug: true, updatedAt: true }
  });

  const gestorUrls = gestores.map((gestor) => ({
    url: `${baseUrl}/gestores/${gestor.slug}`,
    lastModified: gestor.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/gestores`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...gestorUrls,
  ];
}
