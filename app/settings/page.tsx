import { Card, CardContent } from "@/components/ui/card"
import { QrCode, Sparkles, User, Store, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const menuItems = [
    { title: "Profil Toko", icon: Store, href: "/settings/profile", color: "text-blue-500", bg: "bg-blue-100" },
    { title: "QR Menu Pelanggan", icon: QrCode, href: "/qr-menu", color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "AI Promo Generator", icon: Sparkles, href: "/ai-promo", color: "text-orange-500", bg: "bg-orange-100" },
    { title: "Akun Kasir", icon: User, href: "/settings/account", color: "text-purple-500", bg: "bg-purple-100" },
  ]

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Setelan</h1>
        <p className="text-slate-500">Atur toko dan fitur tambahan</p>
      </header>

      <div className="space-y-3 mb-8">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <Link key={i} href={item.href} className="block active:scale-95 transition-transform">
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="font-medium text-slate-700">{item.title}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <button className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl bg-red-50 text-red-600 font-semibold active:scale-95 transition-transform mt-auto">
        <LogOut className="w-5 h-5" />
        Keluar
      </button>
    </div>
  )
}
