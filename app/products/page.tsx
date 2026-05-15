"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus, MoreVertical, Edit2, Trash2, X, Package } from "lucide-react"
import { useProductStore, Product } from "@/store/useProductStore"

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form states
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("📦")

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSave = () => {
    if (!name || !price) return

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        price: parseFloat(price),
        category,
        image,
      })
    } else {
      addProduct({
        name,
        price: parseFloat(price),
        category,
        image,
        isActive: true,
        stock: 100
      })
    }
    closeModal()
  }

  const openEdit = (p: Product) => {
    setEditingProduct(p)
    setName(p.name)
    setPrice(p.price.toString())
    setCategory(p.category)
    setImage(p.image)
    setIsAddModalOpen(true)
  }

  const closeModal = () => {
    setIsAddModalOpen(false)
    setEditingProduct(null)
    setName("")
    setPrice("")
    setCategory("")
    setImage("📦")
  }

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Semua Produk</h1>
          <p className="text-slate-500 text-sm">Kelola stok & harga jualan</p>
        </div>
        <Button 
          className="w-12 h-12 rounded-2xl shadow-lg shadow-emerald-500/20 p-0"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input 
          placeholder="Cari produk..." 
          className="pl-12 h-14 rounded-2xl border-0 shadow-sm bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {products.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mb-4 text-slate-400">
            <Package className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-slate-800 mb-1">Belum ada produk</h3>
          <p className="text-slate-500 text-sm mb-6">Tambahkan produk pertama Anda<br/>untuk mulai jualan.</p>
          <Button onClick={() => setIsAddModalOpen(true)} className="rounded-xl px-8">
            Tambah Produk
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-sm rounded-3xl overflow-hidden group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                  {product.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{product.name}</h3>
                  <p className="text-emerald-600 font-extrabold">Rp {product.price.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="rounded-xl text-slate-400" onClick={() => openEdit(product)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl text-red-300 hover:text-red-500" onClick={() => deleteProduct(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col justify-end max-w-md mx-auto">
          <div className="bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">{editingProduct ? "Edit Produk" : "Tambah Produk"}</h2>
              <Button variant="ghost" size="icon" onClick={closeModal} className="rounded-full bg-slate-100">
                <X className="w-6 h-6 text-slate-500" />
              </Button>
            </div>

            <div className="space-y-5 mb-8">
              <div className="space-y-2">
                <Label>Nama Produk</Label>
                <Input placeholder="Contoh: Es Teh Manis" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Harga Jual (Rp)</Label>
                <Input type="number" placeholder="5000" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Emoji / Icon</Label>
                <Input placeholder="🍵" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>
            </div>

            <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-emerald-500/20" onClick={handleSave}>
              Simpan Produk
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
