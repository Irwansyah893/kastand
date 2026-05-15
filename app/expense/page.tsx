"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Receipt, Plus, Trash2, Package } from "lucide-react"
import { useExpenseStore } from "@/store/useExpenseStore"

export default function ExpensePage() {
  const { expenses, addExpense, deleteExpense } = useExpenseStore()
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")

  const handleAdd = () => {
    if (!title || !amount) return
    addExpense({
      title,
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'long' }),
    })
    setTitle("")
    setAmount("")
  }

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Pengeluaran</h1>
        <p className="text-slate-500">Catat belanja bahan & kebutuhan stand</p>
      </header>

      {/* Quick Input Form */}
      <Card className="border-0 shadow-sm mb-8 rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-600">Barang / Kebutuhan</Label>
            <Input 
              placeholder="Contoh: Belanja Gula" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl bg-slate-50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-600">Jumlah (Rp)</Label>
            <Input 
              type="number"
              placeholder="0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="rounded-xl bg-slate-50"
            />
          </div>
          <Button 
            className="w-full h-14 mt-2 bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-2xl shadow-lg shadow-orange-500/20 font-bold"
            onClick={handleAdd}
          >
            <Plus className="w-5 h-5" />
            Catat Pengeluaran
          </Button>
        </CardContent>
      </Card>

      <h3 className="font-bold text-slate-800 mb-4 px-1 text-lg">Riwayat Pengeluaran</h3>
      {expenses.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center opacity-40">
          <Receipt className="w-12 h-12 mb-2" />
          <p className="text-sm font-medium">Belum ada catatan belanja</p>
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((exp) => (
            <Card key={exp.id} className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{exp.title}</h4>
                    <p className="text-[10px] text-slate-400">{exp.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-orange-600">Rp {exp.amount.toLocaleString("id-ID")}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-red-500" onClick={() => deleteExpense(exp.id)}>
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
