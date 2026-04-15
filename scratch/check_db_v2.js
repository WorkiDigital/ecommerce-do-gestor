const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const total = await prisma.profile.count();
    const featured = await prisma.profile.count({ where: { isFeatured: true } });
    
    console.log(JSON.stringify({
      total,
      featured
    }, null, 2));
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch(console.error);
