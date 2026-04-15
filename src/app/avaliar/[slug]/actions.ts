"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(data: {
  slug: string;
  reviewerName: string;
  reviewerCompany?: string;
  rating: number;
  comment: string;
}) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { slug: data.slug },
      include: { reviews: true }
    });

    if (!profile) return { success: false, error: "Perfil não encontrado" };

    // 1. Criar o review
    await prisma.review.create({
      data: {
        profileId: profile.id,
        reviewerName: data.reviewerName,
        reviewerCompany: data.reviewerCompany,
        rating: data.rating,
        comment: data.comment,
      }
    });

    // 2. Recalcular média e contagem
    const allReviews = await prisma.review.findMany({
      where: { profileId: profile.id },
      select: { rating: true }
    });

    const count = allReviews.length;
    const avg = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / count;

    await prisma.profile.update({
      where: { id: profile.id },
      data: {
        reviewCount: count,
        avgRating: avg
      }
    });

    revalidatePath(`/gestores/${data.slug}`);
    revalidatePath("/gestores");
    
    return { success: true };
  } catch (error: any) {
    console.error("Error submitting review:", error);
    return { success: false, error: "Erro ao processar sua avaliação." };
  }
}
