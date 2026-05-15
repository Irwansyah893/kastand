"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Receipt, Plus, Trash2 } from "lucide-react"

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([
    { id: "1", title: "Beli Es Batu", amount: 15000, date: "Hari ini" },
    { id: "2", title: "Gas Elpiji", amount: 22000, date: "Hari ini" },
  ])
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")

  const addExpense = () => {
    if (!title || !amount) return
    const newExpense = {
      id: Math.random().toString(),
      title,
      amount: parseFloat(amount),
      date: "Hari ini",
    }
    setExpenses([newExpense, ...expenses])
    setTitle("")
    setAmount("")
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Pengeluaran</h1>
        <p className="text-slate-500">Catat belanja bahan & kebutuhan stand</p>
      </header>

      {/* Quick Input Form */}
      <Card className="border-0 shadow-sm mb-8">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2">
            <Label>Barang / Kebutuhan</Label>
            <Input 
              placeholder="Contoh: Belanja Gula" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Jumlah (Rp)</Label>
            <Input 
              type="number"
              placeholder="0" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button 
            className="w-full h-12 mt-2 bg-orange-500 hover:bg-orange-600 text-white gap-2"
            onClick={addExpense}
          >
            <Plus className="w-5 h-5" />
            Catat Pengeluaran
          </Button>
        </CardContent>
      </Card>

      <h3 className="font-semibold text-slate-800 mb-4">Riwayat Pengeluaran</h3>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <Card key={exp.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{exp.title}</h4>
                  <p className="text-[10px] text-slate-400">{exp.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-orange-600">Rp {exp.amount.toLocaleString("id-ID")}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300" onClick={() => deleteExpense(exp.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
