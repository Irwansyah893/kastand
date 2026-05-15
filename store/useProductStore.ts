import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  stock?: number
  isActive: boolean
}

interface ProductStore {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  setProducts: (products: Product[]) => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [], // Empty by default for new accounts
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Math.random().toString(36).substring(7),
        }
        set({ products: [...get().products, newProduct] })
      },
      updateProduct: (id, updatedFields) => {
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, ...updatedFields } : p
          ),
        })
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) })
      },
      setProducts: (products) => set({ products }),
    }),
    {
      name: 'kasstand-product-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
