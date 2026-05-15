"use client"

import { useEffect } from "react"
import { usePWAStore } from "@/store/usePWAStore"

export function PWAHandler() {
  const setDeferredPrompt = usePWAStore(state => state.setDeferredPrompt)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      console.log("PWA: Install prompt captured!")
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      usePWAStore.getState().setIsInstallable(false)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [setDeferredPrompt])

  return null
}
