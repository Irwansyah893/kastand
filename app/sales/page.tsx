"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, ShoppingCart, Trash2, X, CheckCircle2, Package } from "lucide-react"
import { useCartStore } from "@/store/useCartStore"
import { useProductStore } from "@/store/useProductStore"
import { useTransactionStore } from "@/store/useTransactionStore"
import Link from "next/link"

export default function SalesPage() {
  const { items, addItem, removeItem, updateQuantity, clearCart, total } = useCartStore()
  const { products } = useProductStore()
  const addTransaction = useTransactionStore(state => state.addTransaction)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "QRIS">("CASH")

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = total()

  const handleCheckout = () => {
    // Save to real transaction store
    addTransaction({
      items: [...items],
      total: total(),
      paymentMethod: paymentMethod // Pass the payment method
    } as any)

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      clearCart()
      setIsCartOpen(false)
    }, 1500)
  }

  const getProductQty = (id: string) => {
    return items.find(item => (item as any).id === id)?.quantity || 0
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-32">
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-10 px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Kasir Pintar</h1>
            <p className="text-sm text-slate-500">Tap produk untuk jualan</p>
          </div>
          {totalItems > 0 && (
            <Button variant="ghost" className="text-red-500 font-semibold" onClick={clearCart}>
              Reset
            </Button>
          )}
        </div>
      </header>

      {products.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-8">
          <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mb-4 text-slate-400">
            <Package className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Belum ada produk jualan</h3>
          <p className="text-slate-500 text-sm mb-6">Anda perlu menambahkan produk di menu Produk terlebih dahulu.</p>
          <Button asChild className="rounded-xl px-8">
            <Link href="/products">Tambah Produk Sekarang</Link>
          </Button>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 gap-3">
          {products.filter(p => p.category === "Utama" || !p.category).map((product) => {
            const qty = getProductQty(product.id)
            return (
              <Card 
                key={product.id} 
                className={`border-2 transition-all active:scale-90 cursor-pointer ${
                  qty > 0 ? "border-emerald-500 bg-emerald-50/50" : "border-transparent shadow-sm"
                }`}
                onClick={() => addItem(product as any)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center relative">
                  {qty > 0 && (
                    <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      {qty}
                    </span>
                  )}
                  <span className="text-4xl mb-3 block">{product.image}</span>
                  <span className="font-semibold text-slate-800 text-sm mb-1 leading-tight">{product.name}</span>
                  <span className="text-emerald-600 font-bold text-sm">Rp {product.price.toLocaleString("id-ID")}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-24 left-0 right-0 px-4 z-40 max-w-md mx-auto">
          <Button 
            className="w-full h-16 rounded-3xl shadow-2xl shadow-emerald-500/30 text-lg flex justify-between px-6"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <span className="font-bold">{totalItems} item</span>
            </div>
            <span className="font-extrabold text-xl">Rp {totalPrice.toLocaleString("id-ID")}</span>
          </Button>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-end max-w-md mx-auto">
          <div className="bg-white rounded-t-[3rem] p-8 min-h-[60vh] flex flex-col animate-in slide-in-from-bottom duration-500">
            {showSuccess ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Berhasil!</h2>
                <p className="text-slate-500">Transaksi telah dicatat.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">Daftar Belanja</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="rounded-full bg-slate-100">
                    <X className="w-6 h-6 text-slate-500" />
                  </Button>
                </div>

                <div className="flex-1 overflow-auto space-y-6 mb-8 no-scrollbar">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{(item as any).image}</span>
                        <div>
                          <p className="font-bold text-slate-800">{(item as any).name}</p>
                          <p className="text-sm font-medium text-emerald-600">Rp {item.price.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-2xl border">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-xl hover:bg-white text-slate-400" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-6 text-center text-slate-700">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-xl hover:bg-white text-emerald-600" 
                          onClick={() => addItem(item as any)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex gap-2 mb-4">
                    <Button 
                      className={`flex-1 h-12 rounded-xl font-bold ${paymentMethod === 'CASH' ? 'bg-slate-800' : 'bg-slate-100 text-slate-400'}`}
                      onClick={() => setPaymentMethod('CASH')}
                    >
                      💵 CASH
                    </Button>
                    <Button 
                      className={`flex-1 h-12 rounded-xl font-bold ${paymentMethod === 'QRIS' ? 'bg-emerald-600' : 'bg-slate-100 text-slate-400'}`}
                      onClick={() => setPaymentMethod('QRIS')}
                    >
                      📱 QRIS
                    </Button>
                  </div>

                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-400 font-medium">Total Pembayaran</span>
                    <span className="text-3xl font-black text-slate-800">Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <Button className="w-full h-16 text-xl font-bold rounded-3xl shadow-xl shadow-emerald-500/30" onClick={handleCheckout}>
                    Selesaikan Pesanan
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
