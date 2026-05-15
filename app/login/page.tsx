"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Store } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const loginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data)
    // Mock login for now, would use Supabase auth
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen p-8 bg-white">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
          <Store className="w-8 h-8 text-emerald-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">Masuk</h1>
        <p className="text-slate-500 mb-8">Selamat datang kembali! Lanjutkan kelola usahamu.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600">Email</Label>
            <Input id="email" type="email" placeholder="contoh@email.com" className="bg-slate-50 border-slate-200" {...register("email")} />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-600">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-slate-50 border-slate-200" {...register("password")} />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full h-14 text-base font-semibold shadow-lg shadow-emerald-500/25">
            Masuk
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
