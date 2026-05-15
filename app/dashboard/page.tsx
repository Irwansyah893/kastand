"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Wallet, Package, ArrowRight, AlertTriangle, Receipt, QrCode, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/store/useAuthStore"
import { useTransactionStore } from "@/store/useTransactionStore"
import { useExpenseStore } from "@/store/useExpenseStore"
import { useProductStore } from "@/store/useProductStore"

export default function DashboardPage() {
  const user = useAuthStore(state => state.user)
  const { transactions } = useTransactionStore()
  const { expenses } = useExpenseStore()
  const { products } = useProductStore()

  // Calculate real stats
  const todayOmzet = transactions.reduce((acc, tx) => acc + tx.total, 0)
  const totalExpense = expenses.reduce((acc, ex) => acc + ex.amount, 0)
  const profit = todayOmzet - totalExpense
  const lowStockCount = products.filter(p => (p.stock || 0) < 10).length

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Halo, {user?.name?.split(' ')[0] || "Juragan"} 👋</h1>
          <p className="text-slate-500 text-sm">{user?.storeName || "Toko Saya"}</p>
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
            <h2 className="text-4xl font-black mb-1">Rp {todayOmzet.toLocaleString("id-ID")}</h2>
            <div className="flex items-center gap-2 text-xs text-emerald-100 mt-2">
              <span>Berdasarkan {transactions.length} transaksi</span>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Untung Bersih</span>
              <h3 className={`text-xl font-extrabold ${profit >= 0 ? "text-slate-800" : "text-red-500"}`}>
                Rp {profit.toLocaleString("id-ID")}
              </h3>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pengeluaran</span>
              <h3 className="text-xl font-extrabold text-orange-600">Rp {totalExpense.toLocaleString("id-ID")}</h3>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Warning Card (Only if low stock) */}
      {lowStockCount > 0 && (
        <Card className="border-0 bg-orange-50 mb-8 rounded-3xl overflow-hidden shadow-sm shadow-orange-200">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-200 rounded-2xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-orange-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-orange-800">Stok Hampir Habis</p>
              <p className="text-xs text-orange-600">{lowStockCount} produk perlu diisi kembali</p>
            </div>
            <Link href="/products" className="ml-auto text-orange-700 bg-orange-200/50 p-2 rounded-xl">
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      )}

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
