"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Share2, Calendar, ChevronRight, Trash2, Printer, FileText, Send } from "lucide-react"
import { useTransactionStore } from "@/store/useTransactionStore"
import { useExpenseStore } from "@/store/useExpenseStore"
import { useAuthStore } from "@/store/useAuthStore"

export default function ReportsPage() {
  const { transactions, deleteTransaction } = useTransactionStore()
  const { expenses } = useExpenseStore()
  const user = useAuthStore(state => state.user)

  const totalOmzet = transactions.reduce((acc, tx) => acc + tx.total, 0)
  const totalExpense = expenses.reduce((acc, ex) => acc + ex.amount, 0)
  const totalTransaksi = transactions.length
  const untungBersih = totalOmzet - totalExpense

  const handleShareWA = () => {
    const storeName = user?.storeName || "Toko Saya"
    const dateStr = new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })
    
    let message = `*📊 LAPORAN HARIAN KASSTAND*\n`
    message += `*${storeName}*\n`
    message += `📅 Tanggal: ${dateStr}\n`
    message += `------------------------------------------\n\n`
    
    message += `*💰 RINGKASAN KEUANGAN*\n`
    message += `• Total Omzet: Rp ${totalOmzet.toLocaleString("id-ID")}\n`
    message += `• Total Belanja: Rp ${totalExpense.toLocaleString("id-ID")}\n`
    message += `• *Untung Bersih: Rp ${untungBersih.toLocaleString("id-ID")}*\n\n`
    
    message += `*🛒 AKTIVITAS JUALAN*\n`
    message += `• Total Transaksi: ${totalTransaksi}\n`
    
    if (transactions.length > 0) {
      message += `\n*📝 DETAIL TRANSAKSI TERAKHIR:*\n`
      transactions.slice(0, 10).forEach((tx, idx) => {
        message += `${idx + 1}. [${tx.time}] - Rp ${tx.total.toLocaleString("id-ID")}\n`
      })
    }

    if (expenses.length > 0) {
      message += `\n*💸 DETAIL PENGELUARAN:*\n`
      expenses.slice(0, 5).forEach((ex, idx) => {
        message += `- ${ex.title}: Rp ${ex.amount.toLocaleString("id-ID")}\n`
      })
    }

    message += `\n------------------------------------------\n`
    message += `_Laporan dikirim otomatis via KasStand App_`
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Laporan Harian</h1>
          <p className="text-slate-500 text-sm">{new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <Button className="rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-500/20 gap-2" onClick={handleShareWA}>
          <Send className="w-4 h-4" />
          Kirim WA
        </Button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <Card className="border-0 shadow-lg bg-emerald-600 text-white rounded-[2rem]">
          <CardContent className="p-8">
            <span className="text-emerald-100 font-medium text-xs uppercase tracking-widest block mb-2">Untung Bersih Hari Ini</span>
            <h3 className="text-4xl font-black italic">Rp {untungBersih.toLocaleString("id-ID")}</h3>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Omzet</span>
              <h3 className="text-xl font-bold text-slate-800">Rp {totalOmzet.toLocaleString("id-ID")}</h3>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Total Belanja</span>
              <h3 className="text-xl font-bold text-orange-600">Rp {totalExpense.toLocaleString("id-ID")}</h3>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 text-lg">Riwayat Transaksi</h3>
        <Button 
          variant="ghost" 
          className="text-emerald-600 font-bold text-xs gap-2"
          onClick={() => window.print()}
        >
          <FileText className="w-4 h-4" />
          Ekspor PDF
        </Button>
      </div>

      {transactions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-30">
          <TrendingUp className="w-16 h-16 mb-4" />
          <p className="font-bold">Belum ada transaksi hari ini</p>
          <p className="text-xs">Mulai jualan untuk melihat laporan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <Card key={tx.id} className="border-0 shadow-sm rounded-3xl overflow-hidden group no-print">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Rp {tx.total.toLocaleString("id-ID")}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{tx.time} • {tx.items?.length || 0} Produk</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl text-slate-300 hover:text-red-500 transition-colors"
                    onClick={() => deleteTransaction(tx.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {transactions.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 no-print">
          <Button className="h-14 rounded-2xl bg-slate-800 font-bold gap-2 shadow-lg shadow-slate-200" onClick={() => window.print()}>
            <Printer className="w-5 h-5" />
            Cetak Struk Laporan
          </Button>
        </div>
      )}
    </div>
  )
}
