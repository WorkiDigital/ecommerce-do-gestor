"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(leadId: string, newStatus: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  // Verify ownership
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: {
      profile: {
        select: { userId: true }
      }
    }
  });

  if (!lead || lead.profile.userId !== session.user.id) {
    throw new Error("Lead não encontrado ou não pertence a você");
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: newStatus }
  });

  revalidatePath("/dashboard/leads");
  return { success: true };
}
