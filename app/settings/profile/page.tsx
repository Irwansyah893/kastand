"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Store, Camera } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="p-6 flex items-center gap-4 border-b">
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/settings"><ArrowLeft className="w-6 h-6" /></Link>
        </Button>
        <h1 className="text-xl font-bold">Profil Toko</h1>
      </header>

      <div className="p-8 space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner border-2 border-slate-50">
              🏪
            </div>
            <button className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="mt-4 font-bold text-lg text-slate-800">Es Teh Manis Mantap</h2>
          <p className="text-slate-400 text-sm">Stand Minuman</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Nama Toko</Label>
            <Input defaultValue="Es Teh Manis Mantap" className="rounded-2xl bg-slate-50" />
          </div>
          <div className="space-y-2">
            <Label>Jenis Usaha</Label>
            <Input defaultValue="Minuman" className="rounded-2xl bg-slate-50" />
          </div>
          <div className="space-y-2">
            <Label>Alamat / Lokasi</Label>
            <Input placeholder="Contoh: Jl. Merdeka No. 1" className="rounded-2xl bg-slate-50" />
          </div>
          <Button className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-emerald-500/20">
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  )
}
