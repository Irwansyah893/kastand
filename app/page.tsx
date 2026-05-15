import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Store, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-emerald-500">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white">
        <div className="w-24 h-24 bg-white/20 rounded-3xl backdrop-blur-md flex items-center justify-center mb-8 shadow-lg">
          <Store className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">KasStand</h1>
        <p className="text-emerald-50 text-lg mb-8 max-w-xs leading-relaxed">
          Aplikasi kasir super ringan untuk stand, gerobak, dan kaki lima.
        </p>
      </div>

      {/* Bottom Card */}
      <div className="bg-slate-50 rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Super Cepat</h3>
              <p className="text-sm text-slate-500">Catat jualan cuma 3 detik</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Pantau Untung</h3>
              <p className="text-sm text-slate-500">Langsung tahu hari ini untung berapa</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full h-14 text-base font-semibold rounded-2xl shadow-emerald-500/25 shadow-lg">
            <Link href="/login">Mulai Sekarang</Link>
          </Button>
          <p className="text-center text-sm text-slate-500 font-medium">
            100% Gratis selamanya
          </p>
        </div>
      </div>
    </div>
  )
}
