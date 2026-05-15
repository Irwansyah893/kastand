"use server"

import { prisma } from "@/lib/prisma"

export async function registerUserAction(formData: any) {
  const { name, storeName, email, password } = formData

  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar!" }
    }

    // Create user and store
    const user = await prisma.user.create({
      data: {
        full_name: name,
        email: email,
        stores: {
          create: {
            store_name: storeName,
            store_type: "UMKM"
          }
        }
      }
    })

    return { success: true, user }
  } catch (error) {
    console.error("Register Error:", error)
    return { success: false, message: "Gagal mendaftar. Coba lagi." }
  }
}

export async function loginUserAction(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { stores: true }
    })

    if (!user) {
      return { success: false, message: "Email tidak ditemukan!" }
    }

    return { success: true, user }
  } catch (error) {
    return { success: false, message: "Terjadi kesalahan." }
  }
}
