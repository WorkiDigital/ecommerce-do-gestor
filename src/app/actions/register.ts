"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: any) {
  console.log("Recebendo dados de registro:", { ...formData, password: "***", confirmPassword: "***" });
  const { name, email, phone, password, confirmPassword } = formData;

  // Basic validations
  if (!name || !email || !phone || !password || !confirmPassword) {
    console.log("Validação falhou: campos faltando");
    return { success: false, error: "Todos os campos são obrigatórios" };
  }

  if (password !== confirmPassword) {
    console.log("Validação falhou: senhas não coincidem");
    return { success: false, error: "As senhas não coincidem" };
  }

  if (password.length < 6) {
    console.log("Validação falhou: senha curta");
    return { success: false, error: "A senha deve ter pelo menos 6 caracteres" };
  }

  try {
    // Check if email already exists
    console.log("Verificando e-mail...");
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      console.log("Erro: e-mail já existe");
      return { success: false, error: "Este e-mail já está em uso" };
    }

    // Check if phone already exists (unique constraint)
    console.log("Verificando telefone...");
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      console.log("Erro: telefone já existe");
      return { success: false, error: "Este número de telefone já está cadastrado em outra conta" };
    }

    // Hash the password
    console.log("Criptografando senha...");
    const passwordHash = await bcrypt.hash(password, 10);

    // Check if this is the first user (if so, make them ADMIN)
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? "ADMIN" : "GESTOR";

    // Create the user
    console.log(`Salvando no banco de dados como ${role}...`);
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        role,
      },
    });

    console.log("Registro concluído com sucesso!");
    return { success: true };
  } catch (error: any) {
    console.error("ERRO CRÍTICO NO REGISTRO:", error.message || error);
    return { success: false, error: `Erro técnico: ${error.message || "Verifique os logs do servidor"}` };
  }
}
