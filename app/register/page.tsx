"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { registerUserAction } from "@/lib/actions/auth"

export default function RegisterPage() {
  const router = useRouter()
  const registerStore = useAuthStore(state => state.register)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const [name, setName] = useState("")
  const [storeName, setStoreName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // 1. Save to Database (Server Action)
      const res = await registerUserAction({ name, storeName, email, password })
      
      if (!res.success) {
        setError(res.message || "Gagal mendaftar")
        setLoading(false)
        return
      }

      // 2. Save to Local Store for fast access
      registerStore({ name, storeName, email, password })
      
      router.push("/dashboard")
    } catch (err: any) {
      setError(`Kesalahan Teknis: ${err.message || "Koneksi Terputus"}`)
      console.error("FULL REGISTER ERROR:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-white pb-24">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
          <Store className="w-8 h-8 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Daftar Baru</h1>
        <p className="text-slate-500 mb-8">Data akan disimpan aman di server KasStand.</p>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-600">Nama Lengkap</Label>
            <Input 
              id="name" 
              placeholder="Budi Hartono" 
              className="bg-slate-50 border-slate-200 h-12 rounded-xl" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store" className="text-slate-600">Nama Toko / Stand</Label>
            <Input 
              id="store" 
              placeholder="Es Teh Manis Budi" 
              className="bg-slate-50 border-slate-200 h-12 rounded-xl" 
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="contoh@email.com" 
              className="bg-slate-50 border-slate-200 h-12 rounded-xl" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-600">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="bg-slate-50 border-slate-200 h-12 rounded-xl pr-12" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 text-base font-semibold shadow-lg shadow-emerald-500/25 mt-4 rounded-2xl"
          >
            {loading ? "Mendaftarkan..." : "Buat Akun"}
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
