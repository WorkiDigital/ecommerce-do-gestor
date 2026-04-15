"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addPortfolioItem(data: {
  title: string;
  description: string;
  imageUrl: string;
  metrics?: any;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Não autorizado" };
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });

    if (!profile) {
      return { success: false, error: "Perfil não encontrado. Crie seu perfil primeiro." };
    }

    await prisma.portfolioItem.create({
      data: {
        profileId: profile.id,
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        metrics: data.metrics || {},
      }
    });

    revalidatePath("/dashboard/perfil");
    return { success: true };
  } catch (error: any) {
    console.error("Error adding portfolio item:", error);
    return { success: false, error: "Erro ao adicionar item ao portfólio." };
  }
}

export async function deletePortfolioItem(itemId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Não autorizado" };
  }

  try {
    const item = await prisma.portfolioItem.findUnique({
      where: { id: itemId },
      include: { profile: true }
    });

    if (!item || item.profile.userId !== session.user.id) {
      return { success: false, error: "Item não encontrado ou permissão negada." };
    }

    await prisma.portfolioItem.delete({
      where: { id: itemId }
    });

    revalidatePath("/dashboard/perfil");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting portfolio item:", error);
    return { success: false, error: "Erro ao remover item do portfólio." };
  }
}
