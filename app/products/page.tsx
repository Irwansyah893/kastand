"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Search, Package, Trash2, Edit3, X, Save } from "lucide-react"
import { useProductStore, Product } from "@/store/useProductStore"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form states
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [initialStock, setInitialStock] = useState("")
  const [category, setCategory] = useState<"Utama" | "Inventaris">("Utama")

  const resetForm = () => {
    setName("")
    setPrice("")
    setStock("")
    setInitialStock("")
    setCategory("Utama")
    setEditingProduct(null)
  }

  const handleSave = () => {
    const productData = {
      name,
      price: Number(price),
      stock: Number(stock),
      initialStock: Number(initialStock),
      category
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }
    
    setIsOpen(false)
    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setName(product.name)
    setPrice(product.price.toString())
    setStock(product.stock.toString())
    setInitialStock(product.initialStock?.toString() || "0")
    setCategory(product.category || "Utama")
    setIsOpen(true)
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Daftar Produk</h1>
          <p className="text-slate-500 text-sm">Kelola stok jualan & inventaris</p>
        </div>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-500/20 gap-2">
              <Plus className="w-4 h-4" />
              Tambah
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-[2.5rem] max-w-[400px] w-[95%] border-0 shadow-2xl p-0 overflow-hidden">
            <DialogHeader className="p-8 pb-4 bg-slate-50">
              <DialogTitle className="text-2xl font-bold text-slate-800 tracking-tight">{editingProduct ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 p-8 pt-4">
              <div className="space-y-2">
                <Label className="text-slate-500 font-bold text-xs uppercase ml-1">Nama Produk / Barang</Label>
                <Input className="h-12 rounded-2xl bg-slate-50 border-slate-200" placeholder="Contoh: Soto Ayam" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-500 font-bold text-xs uppercase ml-1">Harga Jual</Label>
                  <Input className="h-12 rounded-2xl bg-slate-50 border-slate-200" type="number" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-bold text-xs uppercase ml-1">Kategori</Label>
                  <Select value={category} onValueChange={(val: any) => setCategory(val)}>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-0 shadow-xl">
                      <SelectItem value="Utama">Utama (Jualan)</SelectItem>
                      <SelectItem value="Inventaris">Inventaris (Bahan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pb-4">
                <div className="space-y-2">
                  <Label className="text-slate-500 font-bold text-xs uppercase ml-1">Stok Awal</Label>
                  <Input className="h-12 rounded-2xl bg-slate-50 border-slate-200" type="number" placeholder="0" value={initialStock} onChange={(e) => setInitialStock(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-500 font-bold text-xs uppercase ml-1">Stok Sekarang</Label>
                  <Input className="h-12 rounded-2xl bg-slate-50 border-slate-200" type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-emerald-600 font-bold shadow-lg shadow-emerald-500/20 mb-4" onClick={handleSave}>
                <Save className="w-5 h-5 mr-2" />
                Simpan Data
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input 
          className="pl-12 h-14 bg-white border-0 shadow-sm rounded-2xl" 
          placeholder="Cari nama barang..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-30">
          <Package className="w-16 h-16 mb-4" />
          <p className="font-bold text-lg">Belum ada barang</p>
          <p className="text-sm">Klik tombol Tambah untuk memulai</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-sm rounded-3xl overflow-hidden active:scale-[0.98] transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${product.category === 'Utama' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {product.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{product.name}</h3>
                    <p className="text-xs text-slate-400">
                      Rp {product.price.toLocaleString("id-ID")} • 
                      Stok: {product.stock} {product.category === 'Inventaris' && '(Inv)'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-xl text-slate-400" onClick={() => handleEdit(product)}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-red-500" onClick={() => deleteProduct(product.id)}>
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
