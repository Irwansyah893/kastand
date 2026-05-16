import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TransactionItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Transaction {
  id: string
  items: TransactionItem[]
  total: number
  paymentMethod: "CASH" | "QRIS" // Tambahkan tipe ini
  date: string
  time: string
}

interface TransactionState {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time'>) => void
  deleteTransaction: (id: string) => void
  clearTransactions: () => void
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (tx) => set((state) => ({
        transactions: [
          {
            ...tx,
            id: Math.random().toString(36).substring(7),
            date: new Date().toLocaleDateString("id-ID"),
            time: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })
          },
          ...state.transactions
        ]
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),
      clearTransactions: () => set({ transactions: [] })
    }),
    { name: 'transaction-storage' }
  )
)
