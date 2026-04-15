const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const result = await prisma.profile.updateMany({
      where: {
        OR: [
          { slug: { startsWith: 'herickson-maia' } },
          { slug: { startsWith: 'paulo-henrique' } }
        ]
      },
      data: { isFeatured: true }
    });
    
    console.log(`Sucesso! ${result.count} perfis marcados como Destaque.`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch(console.error);
