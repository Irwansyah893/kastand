"use server"

// KITA NONAKTIFKAN PRISMA DULU UNTUK TESTING
// import { PrismaClient } from "@prisma/client"

export async function registerUserAction(formData: any) {
  const { name, storeName, email, password } = formData

  try {
    console.log("Mencoba mendaftar:", email)
    
    // KITA LOGIN-KAN SAJA SECARA OTOMATIS (MOCK)
    // Jika kode ini berhasil, berarti Vercel Anda SEHAT. 
    // Jika kode ini tetap error, berarti ada masalah pada konfigurasi Next.js/Vercel Anda.
    
    return { 
      success: true, 
      user: { id: "test-123", email: email, name: name } 
    }
  } catch (error: any) {
    return { success: false, message: "Error Internal Server" }
  }
}

export async function loginUserAction(email: string) {
  return { success: true, user: { email, stores: [{ store_name: "Toko Test" }] } }
}
