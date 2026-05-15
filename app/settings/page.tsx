"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  User, 
  Store, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Download,
  Smartphone
} from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("Aplikasi sudah terpasang atau browser Anda tidak mendukung fitur ini. Gunakan menu 'Add to Home Screen' di browser.")
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setDeferredPrompt(null)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Setelan</h1>
        <p className="text-slate-500 text-sm">Atur akun & aplikasi KasStand</p>
      </header>

      {/* Profile Section */}
      <Card className="border-0 shadow-sm bg-white rounded-[2rem] mb-8 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">
              🏪
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-800">{user?.storeName || "Toko Saya"}</h2>
              <p className="text-slate-400 text-sm">{user?.email || "user@example.com"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PWA Install Section */}
      <Card className="border-0 shadow-lg shadow-emerald-500/10 bg-emerald-600 text-white rounded-[2rem] mb-8 overflow-hidden">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold">Install KasStand</p>
              <p className="text-emerald-100 text-xs">Akses lebih cepat di HP</p>
            </div>
          </div>
          <Button 
            className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold rounded-xl h-10 px-6 shadow-md"
            onClick={handleInstall}
          >
            Pasang
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 px-2 mb-2">Akun & Toko</h3>
        <Link href="/settings/profile">
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-3 active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Store className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Profil Toko</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </div>
        </Link>

        <Link href="/settings/account">
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-3 active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <User className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Akun Kasir</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </div>
        </Link>

        <h3 className="font-bold text-slate-800 px-2 mb-2 mt-6">Dukungan</h3>
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm mb-3 active:scale-95 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-700">Pusat Bantuan</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300" />
        </div>

        <button onClick={handleLogout} className="w-full mt-6 flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-3xl font-bold active:scale-95 transition-all border border-red-100 mb-8">
          <LogOut className="w-5 h-5" />
          Keluar dari Aplikasi
        </button>
      </div>
    </div>
  )
}
