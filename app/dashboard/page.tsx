"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Wallet, Package, ArrowRight, AlertTriangle, Receipt, QrCode, Sparkles } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Halo, Juragan 👋</h1>
          <p className="text-slate-500 text-sm">Stand Es Teh Manis</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border flex items-center justify-center">
          <span className="text-xl">🏪</span>
        </div>
      </header>

      <div className="grid gap-4 mb-8">
        {/* Main Stats Card */}
        <Card className="bg-emerald-500 text-white border-0 shadow-2xl shadow-emerald-500/30 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-emerald-50 font-medium text-sm">Uang Masuk Hari Ini</span>
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-black mb-1">Rp 450.000</h2>
            <div className="flex items-center gap-2 text-xs text-emerald-100 mt-2">
              <div className="px-2 py-0.5 bg-white/20 rounded-full font-bold">+15%</div>
              <span>naik dari kemarin</span>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Untung Bersih</span>
              <h3 className="text-xl font-extrabold text-slate-800">Rp 120.000</h3>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Produk Laku</span>
              <h3 className="text-xl font-extrabold text-slate-800">45 Cup</h3>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Warning Card */}
      <Card className="border-0 bg-orange-50 mb-8 rounded-3xl overflow-hidden shadow-sm shadow-orange-200">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-200 rounded-2xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-orange-700" />
          </div>
          <div>
            <p className="text-sm font-bold text-orange-800">Stok Hampir Habis</p>
            <p className="text-xs text-orange-600">Es Batu & Gula Pasir menipis</p>
          </div>
          <Link href="/products" className="ml-auto text-orange-700 bg-orange-200/50 p-2 rounded-xl">
            <ArrowRight className="w-4 h-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Main Grid Menu */}
      <h3 className="font-bold text-slate-800 mb-4 px-1">Menu Utama</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Link href="/sales" className="bg-white p-6 rounded-[2.5rem] border-0 shadow-sm flex flex-col items-center justify-center gap-4 active:scale-95 transition-all">
          <div className="w-14 h-14 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 shadow-inner">
            <Package className="w-7 h-7" />
          </div>
          <span className="font-bold text-slate-700 text-sm">Kasir Jualan</span>
        </Link>
        <Link href="/expense" className="bg-white p-6 rounded-[2.5rem] border-0 shadow-sm flex flex-col items-center justify-center gap-4 active:scale-95 transition-all">
          <div className="w-14 h-14 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 shadow-inner">
            <Receipt className="w-7 h-7" />
          </div>
          <span className="font-bold text-slate-700 text-sm">Catat Belanja</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/qr-menu" className="bg-white p-5 rounded-[2.2rem] border-0 shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-all">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-600 text-[12px]">QR Menu WA</span>
        </Link>
        <Link href="/ai-promo" className="bg-white p-5 rounded-[2.2rem] border-0 shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-all">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="font-bold text-slate-600 text-[12px]">AI Promo</span>
        </Link>
      </div>
    </div>
  )
}
