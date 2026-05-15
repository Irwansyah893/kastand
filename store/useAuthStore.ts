import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserProfile {
  name: string
  storeName: string
  email: string
  password?: string
}

interface AuthStore {
  user: UserProfile | null
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  register: (profile: UserProfile) => void
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: (email, password) => {
        const currentUser = get().user
        if (currentUser && currentUser.email === email && currentUser.password === password) {
          set({ isLoggedIn: true })
          return true
        }
        return false
      },
      register: (profile) => {
        set({ user: profile, isLoggedIn: true })
      },
      logout: () => {
        set({ isLoggedIn: false })
      },
      updateProfile: (updatedFields) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updatedFields } })
        }
      },
    }),
    {
      name: 'kasstand-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
