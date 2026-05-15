import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding data...")

  // Create a dummy user
  const user = await prisma.user.create({
    data: {
      full_name: 'Budi Hartono',
      email: 'budi.kastand@example.com',
    },
  })

  // Create a store
  const store = await prisma.store.create({
    data: {
      user_id: user.id,
      store_name: 'Es Teh Manis Mantap',
      store_type: 'Minuman',
    },
  })

  // Create some products
  const products = [
    { name: 'Es Teh Manis', price: 5000, category: 'Minuman' },
    { name: 'Es Jeruk', price: 6000, category: 'Minuman' },
    { name: 'Kopi Hitam', price: 4000, category: 'Minuman' },
    { name: 'Gorengan', price: 2000, category: 'Makanan' },
  ]

  for (const p of products) {
    await prisma.product.create({
      data: {
        store_id: store.id,
        product_name: p.name,
        price: p.price,
        category: p.category,
        stock: 50,
      },
    })
  }

  console.log("Seeding complete.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
