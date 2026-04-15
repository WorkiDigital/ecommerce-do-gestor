"use server";

import prisma from "@/lib/prisma";

export async function incrementProfileViews(profileId: string) {
  try {
    await prisma.profile.update({
      where: { id: profileId },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error incrementing views:", error);
    return { success: false };
  }
}

export async function incrementWhatsappClicks(profileId: string) {
  try {
    await prisma.profile.update({
      where: { id: profileId },
      data: {
        whatsappClicks: {
          increment: 1,
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    return { success: false };
  }
}
