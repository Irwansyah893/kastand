import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Expense {
  id: string
  title: string
  amount: number
  date: string
}

interface ExpenseStore {
  expenses: Expense[]
  addExpense: (expense: Omit<Expense, 'id'>) => void
  deleteExpense: (id: string) => void
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => ({
      expenses: [], // Empty for new accounts
      addExpense: (expense) => {
        const newExpense = {
          ...expense,
          id: Math.random().toString(36).substring(7),
        }
        set({ expenses: [newExpense, ...get().expenses] })
      },
      deleteExpense: (id) => {
        set({ expenses: get().expenses.filter((e) => e.id !== id) })
      },
    }),
    {
      name: 'kasstand-expense-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
