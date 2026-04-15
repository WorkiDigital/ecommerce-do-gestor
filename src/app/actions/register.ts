"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: any) {
  const { name, email, phone, password, confirmPassword } = formData;

  // Basic validations
  if (!name || !email || !phone || !password || !confirmPassword) {
    return { success: false, error: "Todos os campos são obrigatórios" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "As senhas não coincidem" };
  }

  if (password.length < 6) {
    return { success: false, error: "A senha deve ter pelo menos 6 caracteres" };
  }

  try {
    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return { success: false, error: "Este e-mail já está em uso" };
    }

    // Check if phone already exists (unique constraint)
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      return { success: false, error: "Este número de telefone já está cadastrado em outra conta" };
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        role: "GESTOR", // Default role
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Erro no registro:", error);
    return { success: false, error: "Ocorreu um erro ao criar a conta. Tente novamente." };
  }
}
