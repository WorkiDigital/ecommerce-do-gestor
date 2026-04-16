"use server";

import prisma from "@/lib/prisma";

function getTodayUTC() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function incrementProfileViews(profileId: string) {
  try {
    const today = getTodayUTC();
    await Promise.all([
      prisma.profile.update({
        where: { id: profileId },
        data: { views: { increment: 1 } } as any,
      }),
      prisma.dailyProfileStats.upsert({
        where: { profileId_date: { profileId, date: today } },
        create: { profileId, date: today, views: 1, whatsappClicks: 0 },
        update: { views: { increment: 1 } },
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.error("Error incrementing views:", error);
    return { success: false };
  }
}

export async function incrementWhatsappClicks(profileId: string) {
  try {
    const today = getTodayUTC();
    await Promise.all([
      prisma.profile.update({
        where: { id: profileId },
        data: { whatsappClicks: { increment: 1 } } as any,
      }),
      prisma.dailyProfileStats.upsert({
        where: { profileId_date: { profileId, date: today } },
        create: { profileId, date: today, views: 0, whatsappClicks: 1 },
        update: { whatsappClicks: { increment: 1 } },
      }),
    ]);
    return { success: true };
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    return { success: false };
  }
}
