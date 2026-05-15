"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Dummy fast redirect
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
          <Store className="w-8 h-8 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Daftar Baru</h1>
        <p className="text-slate-500 mb-8">Buat akun KasStand untuk kelola toko dengan lebih mudah.</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-600">Nama Lengkap</Label>
            <Input id="name" placeholder="Budi Hartono" className="bg-slate-50 border-slate-200" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store" className="text-slate-600">Nama Toko/Stand</Label>
            <Input id="store" placeholder="Es Teh Manis Budi" className="bg-slate-50 border-slate-200" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600">Email</Label>
            <Input id="email" type="email" placeholder="contoh@email.com" className="bg-slate-50 border-slate-200" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-600">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-slate-50 border-slate-200" required />
          </div>

          <Button type="submit" className="w-full h-14 text-base font-semibold shadow-lg shadow-emerald-500/25 mt-4">
            Buat Akun
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
