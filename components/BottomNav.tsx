"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, PlusCircle, Settings, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/products", icon: LayoutGrid, label: "Produk" },
    { href: "/sales", icon: PlusCircle, label: "Jual", primary: true },
    { href: "/reports", icon: FileText, label: "Laporan" },
    { href: "/settings", icon: Settings, label: "Setelan" },
  ]

  // Hide nav on splash screen or login
  if (pathname === "/" || pathname === "/login") return null

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname.startsWith(link.href)

          if (link.primary) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="bg-emerald-500 text-white p-4 rounded-full shadow-lg shadow-emerald-500/30 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-medium text-emerald-600 mt-1">
                  {link.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                isActive ? "text-emerald-500" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className={cn("text-[10px] font-medium", isActive && "font-semibold")}>
                {link.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
