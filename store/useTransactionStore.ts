import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Transaction {
  id: string
  items: any[]
  total: number
  date: string
  time: string
}

interface TransactionStore {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time'>) => void
  deleteTransaction: (id: string) => void
  clearTransactions: () => void
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      addTransaction: (tx) => {
        const now = new Date()
        const newTx = {
          ...tx,
          id: Math.random().toString(36).substring(7),
          date: now.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
          time: now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }),
        }
        set({ transactions: [newTx, ...get().transactions] })
      },
      deleteTransaction: (id) => {
        set({ transactions: get().transactions.filter((tx) => tx.id !== id) })
      },
      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'kasstand-transaction-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
