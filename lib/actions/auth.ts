"use server"

import { supabase } from "@/lib/supabase"

export async function registerUserAction(formData: any) {
  const { name, storeName, email, password } = formData

  try {
    if (!name || !storeName || !email || !password) {
      return { success: false, message: "Semua data wajib diisi!" }
    }

    // 1. Cek apakah email sudah terdaftar menggunakan API Supabase
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar!" }
    }

    // 2. Simpan User Baru
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([{ full_name: name, email: email }])
      .select()
      .single()

    if (userError) throw userError

    // 3. Simpan Toko Baru
    const { error: storeError } = await supabase
      .from('stores')
      .insert([{ 
        user_id: newUser.id, 
        store_name: storeName, 
        store_type: "UMKM" 
      }])

    if (storeError) throw storeError

    return { 
      success: true, 
      user: { id: newUser.id, email: newUser.email, name: newUser.full_name } 
    }
  } catch (error: any) {
    console.error("SUPABASE_REGISTER_ERROR:", error)
    return { 
      success: false, 
      message: `Gagal Daftar (API): ${error.message || "Kesalahan koneksi"}` 
    }
  }
}

export async function loginUserAction(email: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*, stores(*)')
      .eq('email', email)
      .single()

    if (error || !user) {
      return { success: false, message: "Email tidak ditemukan atau kesalahan login." }
    }

    return { success: true, user }
  } catch (error: any) {
    return { success: false, message: "Gagal terhubung ke API Supabase." }
  }
}
