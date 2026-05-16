"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Share2, Calendar, ChevronRight, Trash2, Printer, FileText, Send } from "lucide-react"
import { useTransactionStore } from "@/store/useTransactionStore"
import { useExpenseStore } from "@/store/useExpenseStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useProductStore } from "@/store/useProductStore"

export default function ReportsPage() {
  const { transactions, deleteTransaction } = useTransactionStore()
  const { expenses } = useExpenseStore()
  const { products } = useProductStore()
  const user = useAuthStore(state => state.user)

  // Perhitungan Keuangan
  const cashTotal = transactions.filter(tx => tx.paymentMethod === "CASH").reduce((acc, tx) => acc + tx.total, 0)
  const qrisTotal = transactions.filter(tx => tx.paymentMethod === "QRIS").reduce((acc, tx) => acc + tx.total, 0)
  const totalOmzet = cashTotal + qrisTotal
  const totalExpense = expenses.reduce((acc, ex) => acc + ex.amount, 0)
  const netTotal = totalOmzet - totalExpense

  // Perhitungan Terjual per Item
  const itemSummary: Record<string, { qty: number, total: number, price: number }> = {}
  transactions.forEach(tx => {
    tx.items.forEach(item => {
      if (!itemSummary[item.name]) {
        itemSummary[item.name] = { qty: 0, total: 0, price: item.price }
      }
      itemSummary[item.name].qty += item.quantity
      itemSummary[item.name].total += item.price * item.quantity
    })
  })

  const handleShareWA = () => {
    const storeName = user?.storeName || "TENAN PARADISE"
    const dateStr = new Date().toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    
    let message = `🦋${storeName.toUpperCase()}  ${dateStr}\n\n\n`
    
    message += `UANG CASH= RP${cashTotal.toLocaleString("id-ID")}\n`
    message += `QRIS= ${qrisTotal.toLocaleString("id-ID")}\n`
    message += `Total =${totalOmzet.toLocaleString("id-ID")}\n\n`
    
    message += `Pengeluaran \n`
    message += `Belanja =\n`
    if (expenses.length > 0) {
      expenses.forEach(ex => {
        message += `${ex.title}(${ex.amount.toLocaleString("id-ID")}) \n`
      })
    } else {
      message += `-\n`
    }
    
    message += `\nTotal penjualan+Pengeluaran\n`
    message += `=${netTotal.toLocaleString("id-ID")}\n\n`
    
    message += `❄️❄️TERJUAL❄️❄️\n`
    Object.entries(itemSummary).forEach(([name, data]) => {
      message += ` ❄${name.toUpperCase()}=${data.price.toLocaleString("id-ID")}×${data.qty}porsi=${data.total.toLocaleString("id-ID")}\n`
    })
    
    message += `\nTotal =`
    const totalsList = Object.values(itemSummary).map(d => d.total.toLocaleString("id-ID"))
    message += totalsList.join(" +") + "=" + totalOmzet.toLocaleString("id-ID") + "\n\n\n\n"
    
    message += `🌲STOK AWAL\n`
    products.forEach(p => {
      if (!p.name.toLowerCase().includes('saos') && !p.name.toLowerCase().includes('kecap')) {
        const terjual = itemSummary[p.name]?.qty || 0
        message += ` ${p.name.toUpperCase().padEnd(12)} = ${ (p.stock || 0) + terjual }\n`
      }
    })
    
    message += ` \n🌲STOK AKHIR \n`
    products.forEach(p => {
      if (!p.name.toLowerCase().includes('saos') && !p.name.toLowerCase().includes('kecap')) {
        message += `${p.name.toUpperCase().padEnd(14)} =${p.stock || 0}\n`
      }
    })
    
    message += `\n\n 🦋STOK BARANG\n`
    products.forEach(p => {
      message += `${p.name}=${p.stock || "-"}\n`
    })
    
    message += `\n\n🦋Yang perlu di Beli\n`
    const needToBuy = products.filter(p => (p.stock || 0) < 5).map(p => p.name.toLowerCase())
    if (needToBuy.length > 0) {
      message += needToBuy.join("\n")
    } else {
      message += `Semua stok aman`
    }
    
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/6282285026241?text=${encodedMessage}`, '_blank')
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
            <span className="text-emerald-100 font-medium text-xs uppercase tracking-widest block mb-2">Total Penjualan + Pengeluaran</span>
            <h3 className="text-4xl font-black italic">Rp {netTotal.toLocaleString("id-ID")}</h3>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">CASH</span>
              <h3 className="text-xl font-bold text-slate-800">Rp {cashTotal.toLocaleString("id-ID")}</h3>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-white rounded-[2rem]">
            <CardContent className="p-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">QRIS</span>
              <h3 className="text-xl font-bold text-blue-600">Rp {qrisTotal.toLocaleString("id-ID")}</h3>
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
                    <p className="text-[10px] text-slate-400 font-medium">
                      {tx.time} • {tx.paymentMethod}
                    </p>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
