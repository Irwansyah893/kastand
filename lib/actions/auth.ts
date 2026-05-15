"use server"

import { PrismaClient } from "@prisma/client"

// Inisialisasi prisma di dalam action untuk menghindari crash saat startup di Vercel
const prisma = new PrismaClient()

export async function registerUserAction(formData: any) {
  const { name, storeName, email, password } = formData

  try {
    if (!prisma) {
      return { success: false, message: "Koneksi Database tidak terinisialisasi." }
    }

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

    return { 
      success: true, 
      user: { id: user.id, email: user.email } 
    }
  } catch (error: any) {
    // Kita tangkap error dan ubah menjadi string sederhana agar tidak dianggap "Sensitive" oleh Next.js
    const errorMsg = error.message || "Unknown Database Error"
    console.error("DB_ERROR_LOG:", errorMsg)
    
    return { 
      success: false, 
      message: `Database Error: ${errorMsg.substring(0, 50)}... (Cek koneksi Supabase Anda)` 
    }
  } finally {
    await prisma.$disconnect()
  }
}

export async function loginUserAction(email: string) {
  const prisma = new PrismaClient()
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { stores: true }
    })
    if (!user) return { success: false, message: "User tidak ditemukan." }
    return { success: true, user }
  } catch (error: any) {
    return { success: false, message: "Gagal terhubung ke Database." }
  } finally {
    await prisma.$disconnect()
  }
}
