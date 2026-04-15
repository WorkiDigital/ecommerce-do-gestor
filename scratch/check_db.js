const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const total = await prisma.profile.count();
  const featured = await prisma.profile.count({ where: { isFeatured: true } });
  const all = await prisma.profile.findMany({ take: 5 });
  
  console.log(JSON.stringify({
    total,
    featured,
    samples: all.map(p => ({ slug: p.slug, isFeatured: p.isFeatured }))
  }, null, 2));
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
