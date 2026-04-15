import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando o seed do banco de dados...");

  // 1. Limpar dados existentes (opcional, cuidado com produção)
  await prisma.lead.deleteMany();
  await prisma.review.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // 2. Criar Usuários e Perfis dos Gestores Fictícios
  const passwordHash = await bcrypt.hash("senha123", 10);

  const mockGestores = [
    {
      email: "joao@exemplo.com",
      name: "João Silva",
      slug: "joao-silva",
      displayName: "João Silva",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Especialista em escala para lojas online. Mais de R$3,2M gerenciados em 2024 com ROAS médio de 4.8x. Trabalho com e-commerces de moda, beleza e eletrônicos.",
      city: "São Paulo",
      state: "SP",
      whatsapp: "5511999999999",
      instagram: "joaosilva.ads",
      niches: ["ecommerce"],
      platforms: ["meta-ads", "google-ads", "tiktok-ads"],
      minPrice: 1500,
      tagline: "Especialista em escala para lojas. +R$3,2M gerenciados em 2024. ROAS médio 4.8x",
      plan: "pro",
      isVerified: true,
      isFeatured: true,
      avgRating: 4.9,
      reviewCount: 187,
      badge: "TOP 5%",
    },
    {
      email: "camila@exemplo.com",
      name: "Camila Porto",
      slug: "camila-porto",
      displayName: "Camila Porto",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      bio: "34 lançamentos 7 dígitos nos últimos 2 anos. Especialista em funis perpétuos e VSLs que convertem. CPL médio 40% abaixo do mercado. Trabalho com os maiores nomes do digital.",
      city: "Florianópolis",
      state: "SC",
      whatsapp: "5548999999999",
      instagram: "camilaporto.mkt",
      niches: ["infoprodutos"],
      platforms: ["meta-ads"],
      minPrice: 2200,
      tagline: "34 lançamentos 7 dígitos. Especialista em perpétuo e VSL. CPL -40% em média.",
      plan: "pro",
      isVerified: true,
      isFeatured: true,
      avgRating: 5.0,
      reviewCount: 203,
      badge: "VERIFICADA",
    },
    {
      email: "anderson@exemplo.com",
      name: "Anderson Luiz",
      slug: "anderson-luiz",
      displayName: "Anderson Luiz",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      bio: "120+ negócios locais ativos em Curitiba e região. Clínicas, deliverys e serviços em geral. Foco total em ligações e conversões via WhatsApp.",
      city: "Curitiba",
      state: "PR",
      whatsapp: "5541999999999",
      instagram: "anderson.trafego",
      niches: ["local"],
      platforms: ["google-ads", "meta-ads"],
      minPrice: 900,
      tagline: "120+ negócios locais ativos. Clínicas, delivery e serviços. Foco em ligações e WhatsApp.",
      plan: "free",
      isVerified: true,
      isFeatured: false,
      avgRating: 4.8,
      reviewCount: 96,
    }
  ];

  for (const mg of mockGestores) {
    const user = await prisma.user.create({
      data: {
        email: mg.email,
        name: mg.name,
        passwordHash: passwordHash,
        profile: {
          create: {
            slug: mg.slug,
            displayName: mg.displayName,
            avatarUrl: mg.avatarUrl,
            bio: mg.bio,
            city: mg.city,
            state: mg.state,
            whatsapp: mg.whatsapp,
            instagram: mg.instagram,
            niches: mg.niches,
            platforms: mg.platforms,
            minPrice: mg.minPrice,
            tagline: mg.tagline,
            plan: mg.plan,
            isVerified: mg.isVerified,
            isFeatured: mg.isFeatured,
            avgRating: mg.avgRating,
            reviewCount: mg.reviewCount,
            badge: mg.badge,
          }
        }
      }
    });
    console.log(`✅ Criado: ${user.name}`);
  }

  // 3. Adicionar algumas avaliações para o João (ID 1 do mock original)
  const joao = await prisma.profile.findUnique({ where: { slug: "joao-silva" } });
  if (joao) {
    await prisma.review.createMany({
      data: [
        {
          profileId: joao.id,
          reviewerName: "Carlos Eduardo",
          reviewerCompany: "StyleBR E-commerce",
          rating: 5,
          comment: "João transformou nossa operação. De R$20k/mês para R$150k/mês em 6 meses. ROAS consistente acima de 5x.",
        },
        {
          profileId: joao.id,
          reviewerName: "Ana Beatriz",
          reviewerCompany: "Loja Bella Donna",
          rating: 5,
          comment: "Profissional excepcional. Entende profundamente de e-commerce e sempre traz novas estratégias.",
        }
      ]
    });
  }

  console.log("✨ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
