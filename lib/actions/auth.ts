"use server"

import { prisma } from "@/lib/prisma"

export async function registerUserAction(formData: any) {
  const { name, storeName, email, password } = formData

  try {
    if (!name || !storeName || !email || !password) {
      return { success: false, message: "Semua data wajib diisi!" }
    }

    // 1. Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar! Silakan gunakan email lain atau login." }
    }

    // 2. Simpan ke Database Supabase
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
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name
      } 
    }
  } catch (error: any) {
    console.error("DATABASE_REGISTER_ERROR:", error)
    
    // Memberikan informasi jika terjadi kesalahan koneksi
    return { 
      success: false, 
      message: `Koneksi Database Gagal: ${error.message?.substring(0, 50) || "Cek konfigurasi Vercel Anda"}` 
    }
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
  } catch (error: any) {
    return { success: false, message: "Gagal terhubung ke Database saat Login." }
  }
}
