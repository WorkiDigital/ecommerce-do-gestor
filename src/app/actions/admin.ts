"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Acesso negado. Apenas administradores podem realizar esta ação.");
  }
}

export async function toggleUserVerification(profileId: string) {
  await verifyAdmin();
  try {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) return { success: false, error: "Perfil não encontrado" };

    await prisma.profile.update({
      where: { id: profileId },
      data: { isVerified: !profile.isVerified }
    });
    
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleUserPro(profileId: string) {
  await verifyAdmin();
  try {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) return { success: false, error: "Perfil não encontrado" };

    await prisma.profile.update({
      where: { id: profileId },
      data: { 
        plan: profile.plan === "pro" ? "free" : "pro",
        badge: profile.plan === "pro" ? null : "Destaque"
      }
    });

    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleUserStatus(userId: string) {
  await verifyAdmin();
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, error: "Usuário não encontrado" };

    await prisma.user.update({
      where: { id: userId },
      data: { status: ((user as any).status === "BANNED" ? "ACTIVE" : "BANNED") } as any
    });

    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
export async function toggleUserFeatured(profileId: string) {
  await verifyAdmin();
  try {
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile) return { success: false, error: "Perfil não encontrado" };

    await prisma.profile.update({
      where: { id: profileId },
      data: { isFeatured: !profile.isFeatured }
    });

    revalidatePath("/dashboard/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
