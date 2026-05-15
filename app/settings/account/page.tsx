"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-6 flex items-center gap-4 border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/settings"><ArrowLeft className="w-6 h-6" /></Link>
        </Button>
        <h1 className="text-xl font-bold">Akun Kasir</h1>
      </header>

      <div className="p-8 space-y-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shadow-inner">
            <User className="w-10 h-10" />
          </div>
          <h2 className="mt-4 font-bold text-lg text-slate-800">Budi Hartono</h2>
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold mt-2 border border-emerald-100">
            <ShieldCheck className="w-3 h-3" />
            Pemilik (Owner)
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="budi@example.com" disabled className="rounded-2xl bg-slate-50 border-slate-100 text-slate-400" />
          </div>
          <div className="space-y-2">
            <Label>No. WhatsApp</Label>
            <Input defaultValue="08123456789" className="rounded-2xl bg-slate-50" />
          </div>
          <div className="space-y-2">
            <Label>Password Baru</Label>
            <Input type="password" placeholder="••••••••" className="rounded-2xl bg-slate-50" />
          </div>
          <Button className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-blue-500/10 bg-slate-800 hover:bg-slate-900">
            Simpan Akun
          </Button>
        </div>
      </div>
    </div>
  )
}
