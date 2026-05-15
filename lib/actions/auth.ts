"use server"

import { prisma } from "@/lib/prisma"

export async function registerUserAction(formData: any) {
  const { name, storeName, email, password } = formData

  try {
    // 1. Validasi Input Dasar
    if (!name || !storeName || !email || !password) {
      return { success: false, message: "Semua data wajib diisi!" }
    }

    // 2. Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar! Silakan login." }
    }

    // 3. Simpan ke Database
    // Kita buat User dan Store sekaligus dalam satu transaksi
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
    console.error("DEBUG REGISTER ERROR:", error)
    
    // Memberikan pesan error yang lebih spesifik jika memungkinkan
    if (error.code === 'P2002') {
      return { success: false, message: "Email sudah digunakan." }
    }
    
    return { 
      success: false, 
      message: `Gagal Daftar: ${error.message || "Kesalahan Server"}` 
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
    return { success: false, message: `Login Error: ${error.message}` }
  }
}
