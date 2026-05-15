"use client"

import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Share2, Download } from "lucide-react"

export default function QRMenuPage() {
  const storeLink = "https://wa.me/628123456789?text=Halo,%20saya%20mau%20pesan%20menu%20dari%20KasStand"

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32 items-center">
      <header className="mb-8 w-full text-center">
        <h1 className="text-2xl font-bold text-slate-800">QR Menu WA</h1>
        <p className="text-slate-500 text-sm">Pelanggan scan, langsung order ke WA</p>
      </header>

      <Card className="border-0 shadow-lg mb-8 max-w-[300px] w-full bg-white rounded-[2rem]">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="bg-emerald-500 p-4 rounded-3xl mb-6 shadow-md shadow-emerald-500/20">
            <QRCodeSVG 
              value={storeLink} 
              size={200}
              bgColor={"#10b981"} // emerald-500
              fgColor={"#ffffff"}
              level={"H"}
              includeMargin={false}
            />
          </div>
          <h2 className="text-xl font-bold text-slate-800 text-center mb-1">KasStand Menu</h2>
          <p className="text-slate-500 text-sm text-center">Scan untuk pesan</p>
        </CardContent>
      </Card>

      <div className="w-full max-w-[300px] space-y-3">
        <Button className="w-full h-12 gap-2 text-base rounded-2xl">
          <Share2 className="w-4 h-4" />
          Bagikan Link
        </Button>
        <Button variant="outline" className="w-full h-12 gap-2 text-base rounded-2xl border-slate-200">
          <Download className="w-4 h-4" />
          Simpan QR
        </Button>
      </div>
    </div>
  )
}
