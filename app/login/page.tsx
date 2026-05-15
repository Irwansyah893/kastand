"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore(state => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    const success = login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Email atau Password salah!")
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-white">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
          <Store className="w-8 h-8 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Masuk</h1>
        <p className="text-slate-500 mb-8 font-medium">Selamat datang kembali! Lanjutkan kelola usahamu.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600 font-semibold">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="contoh@email.com" 
              className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-600 font-semibold">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                className="h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white transition-all pr-12" 
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

          <Button type="submit" className="w-full h-14 text-base font-semibold shadow-lg shadow-emerald-500/25 rounded-2xl">
            Masuk
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
