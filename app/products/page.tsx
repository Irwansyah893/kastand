"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, MoreVertical, Edit2 } from "lucide-react"

const DUMMY_PRODUCTS = [
  { id: "1", name: "Es Teh Manis", price: 5000, stock: 50, active: true, image: "🍵" },
  { id: "2", name: "Es Jeruk", price: 6000, stock: 30, active: true, image: "🍊" },
  { id: "3", name: "Kopi Hitam", price: 4000, stock: 20, active: true, image: "☕" },
  { id: "4", name: "Gorengan", price: 2000, stock: 5, active: true, image: "🥟" }, // low stock
  { id: "5", name: "Es Batu", price: 1000, stock: 2, active: true, image: "🧊" }, // low stock
]

export default function ProductsPage() {
  const [search, setSearch] = useState("")

  const filtered = DUMMY_PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32 relative">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Daftar Produk</h1>
        <p className="text-slate-500">Kelola menu dan stok jualan</p>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input 
          placeholder="Cari produk..." 
          className="pl-12 bg-white border-0 shadow-sm rounded-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map(product => (
          <Card key={product.id} className={`border-0 shadow-sm ${product.stock < 10 ? 'ring-1 ring-orange-400' : ''}`}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">
                  {product.image}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{product.name}</h3>
                  <div className="flex gap-2 items-center text-sm">
                    <span className="text-emerald-600 font-medium">Rp {product.price.toLocaleString("id-ID")}</span>
                    <span className="text-slate-300">•</span>
                    <span className={product.stock < 10 ? "text-orange-500 font-medium" : "text-slate-500"}>
                      Stok: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${product.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-lg shadow-emerald-500/40 p-0 z-40">
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
