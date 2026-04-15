"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function createProfile(data: any) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado para criar um perfil" };
  }

  // Create slug from displayName
  const baseSlug = (data.displayName || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

  try {
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        slug,
        displayName: data.displayName,
        city: data.city,
        state: data.state,
        bio: data.bio,
        niches: data.niches,
        platforms: data.platforms,
        minPrice: Number(data.minPrice) || 0,
        tagline: data.tagline,
        whatsapp: data.whatsapp,
        instagram: data.instagram,
        facebook: data.facebook,
        website: data.website,
      },
      update: {
        displayName: data.displayName,
        city: data.city,
        state: data.state,
        bio: data.bio,
        niches: data.niches,
        platforms: data.platforms,
        minPrice: Number(data.minPrice) || 0,
        tagline: data.tagline,
        whatsapp: data.whatsapp,
        instagram: data.instagram,
        facebook: data.facebook,
        website: data.website,
      }
    });

    return { success: true, slug: profile.slug };
  } catch (error: any) {
    console.error("Error creating profile:", error);
    return { success: false, error: "Erro interno no servidor ao criar o perfil." };
  }
}
