import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  stock: number // Ini sebagai Stok Akhir / Sekarang
  initialStock: number // Ini sebagai Stok Awal
  category: "Utama" | "Inventaris" // Pembeda di laporan
  image?: string
}

interface ProductState {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Math.random().toString(36).substring(7) }]
      })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updatedProduct } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      }))
    }),
    { name: 'product-storage' }
  )
)
