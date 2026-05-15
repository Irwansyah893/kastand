"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Copy, Check } from "lucide-react"

export default function AIPromoPage() {
  const [productName, setProductName] = useState("")
  const [promoType, setPromoType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    // Dummy AI placeholder function
    setTimeout(() => {
      setResult(`🔥 PROMO SPESIAL HARI INI 🔥

Belum cobain ${productName} yang lagi viral? Mumpung ada promo ${promoType}, yuk buruan cobain sebelum kehabisan! 😍

✨ Rasa juara, harga bersahabat!
✨ Cocok banget buat nemenin santai kamu hari ini.

📍 Mampir sekarang ke KasStand!
Atau order via WhatsApp: wa.me/628123456789

#PromoHariIni #Diskon #JajananHits #KulinerLokal`)
      setIsGenerating(false)
    }, 1500)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-6 pt-12 bg-slate-50 pb-32">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          AI Promo <Sparkles className="text-orange-500 w-6 h-6" />
        </h1>
        <p className="text-slate-500 text-sm">Bikin kata-kata jualan otomatis pakai AI</p>
      </header>

      <Card className="border-0 shadow-sm mb-6">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2">
            <Label>Nama Produk / Menu</Label>
            <Input 
              placeholder="Contoh: Es Teh Solo" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Jenis Promo</Label>
            <Input 
              placeholder="Contoh: Beli 2 Gratis 1 / Diskon 50%" 
              value={promoType}
              onChange={(e) => setPromoType(e.target.value)}
            />
          </div>
          <Button 
            className="w-full h-12 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handleGenerate}
            disabled={!productName || !promoType || isGenerating}
          >
            {isGenerating ? "Sedang mikir..." : "Buat Kata-kata Promo"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-0 shadow-sm bg-indigo-50 border-indigo-100">
          <CardContent className="p-5 relative">
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-3 right-3 text-indigo-600 hover:bg-indigo-100"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </Button>
            <h3 className="font-semibold text-indigo-900 mb-3 text-sm">Hasil untuk disalin:</h3>
            <p className="text-sm text-indigo-800 whitespace-pre-wrap leading-relaxed">
              {result}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
