import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user || !user.passwordHash) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );

          if (!passwordMatch) {
            return null;
          }

          // LÓGICA DE PROMOÇÃO AUTOMÁTICA PARA ADMIN MASTER
          let currentRole = user.role;
          if (user.email === "workidigitaloficial@gmail.com" && user.role !== "ADMIN") {
            const updatedUser = await prisma.user.update({
              where: { id: user.id },
              data: { role: "ADMIN" }
            });
            currentRole = updatedUser.role;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: currentRole,
          };
        } catch (error: any) {
          throw new Error("Erro de conexão com o banco de dados durante o login.");
        }
      },
    }),
  ],
});

