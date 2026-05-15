"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ArrowDown, ArrowUp, DollarSign } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Laporan Harian</h1>
        <p className="text-slate-500">Rekapitulasi performa tokomu</p>
      </header>

      <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm border mb-6">
        <CalendarDays className="w-5 h-5 text-emerald-500" />
        <span className="font-medium text-slate-700 text-sm">Hari Ini, 14 Okt 2026</span>
      </div>

      <div className="space-y-4">
        <Card className="bg-emerald-50 border-emerald-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-emerald-700 font-medium text-sm block mb-1">Total Omzet</span>
              <span className="text-2xl font-bold text-emerald-900">Rp 450.000</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-200/50 flex items-center justify-center">
              <ArrowUp className="w-6 h-6 text-emerald-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-100 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-orange-700 font-medium text-sm block mb-1">Pengeluaran</span>
              <span className="text-2xl font-bold text-orange-900">Rp 150.000</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-200/50 flex items-center justify-center">
              <ArrowDown className="w-6 h-6 text-orange-700" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100 shadow-sm mt-4">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-blue-700 font-medium text-sm block mb-1">Laba Bersih</span>
              <span className="text-2xl font-bold text-blue-900">Rp 300.000</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-200/50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-slate-800 mb-4">Produk Paling Laku</h3>
        <Card className="shadow-sm border-0">
          <CardContent className="p-0">
            {[
              { name: "Es Teh Manis", qty: 45, price: "Rp 225.000" },
              { name: "Gorengan", qty: 30, price: "Rp 60.000" },
              { name: "Es Jeruk", qty: 15, price: "Rp 90.000" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.qty} terjual</p>
                  </div>
                </div>
                <span className="font-semibold text-emerald-600 text-sm">{item.price}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
