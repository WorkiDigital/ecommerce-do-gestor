"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLeadAction(data: {
  profileId: string;
  name: string;
  email: string;
  phone: string;
  instagram?: string;
  revenue: string;
}) {
  try {
    const lead = await prisma.lead.create({
      data: {
        profileId: data.profileId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        instagram: data.instagram,
        revenue: data.revenue,
      },
    });

    // Revalida o dashboard do gestor para mostrar o novo lead
    revalidatePath("/dashboard");
    
    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    return { success: false, error: "Falha ao salvar lead no banco de dados." };
  }
}
