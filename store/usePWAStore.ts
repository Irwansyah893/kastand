import { create } from 'zustand'

interface PWAStore {
  deferredPrompt: any
  isInstallable: boolean
  setDeferredPrompt: (prompt: any) => void
  setIsInstallable: (status: boolean) => void
}

export const usePWAStore = create<PWAStore>((set) => ({
  deferredPrompt: null,
  isInstallable: false,
  setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt, isInstallable: !!prompt }),
  setIsInstallable: (status) => set({ isInstallable: status }),
}))
