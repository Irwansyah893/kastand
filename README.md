# KasStand 🏪

Aplikasi Kasir UMKM Super Ringan untuk membantu pemilik stand kecil, booth, dan kaki lima mencatat penjualan harian tanpa ribet.

## Fitur Utama ✨
- **Mobile First**: Dirancang agar nyaman digunakan sambil berdiri melayani pembeli.
- **Minim Klik**: Kasir super cepat, tinggal tap produk dan bayar.
- **Laporan Harian**: Tahu untung rugi secara realtime.
- **PWA (Progressive Web App)**: Bisa di-install seperti aplikasi native Android.
- **QR Menu**: Pelanggan bisa scan QR dan order langsung via WhatsApp.
- **AI Promo Generator**: Bikin caption promosi untuk sosial media secara otomatis.

## Tech Stack 🛠
- **Framework**: Next.js 16 (App Router)
- **UI**: Tailwind CSS + Shadcn UI (Mobile-first styles)
- **Database**: Supabase (PostgreSQL) + Prisma ORM
- **State Management**: Zustand
- **PWA**: next-pwa

## Cara Menjalankan Secara Lokal 🚀

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   Salin `.env.example` ke `.env` dan isi dengan konfigurasi database Supabase Anda:
   ```bash
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DB]?schema=public"
   NEXT_PUBLIC_SUPABASE_URL="..."
   NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
   ```

3. **Setup Database & Prisma**
   Generate Prisma client dan dorong schema ke database Anda:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed Dummy Data (Opsional)**
   Tambahkan data bohongan untuk testing:
   ```bash
   npx ts-node prisma/seed.ts
   ```

5. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser Anda (sangat disarankan melihat dengan tampilan mobile/device toolbar).

## Struktur Folder 📁
- `/app`: Rute halaman aplikasi (Next.js App Router).
- `/components`: Komponen antarmuka yang dapat digunakan kembali (Tombol, Card, BottomNav, dll).
- `/lib`: Utilitas (Prisma Client, Supabase Client, dll).
- `/prisma`: Skema database.
- `/public`: Aset gambar dan manifest PWA.
- `/store`: State management global (Zustand).

## Filosofi Desain 🎨
Aplikasi ini dibuat dengan prinsip **"Cepat dan Minim Gesekan"**. Warna hijau zamrud (Emerald) digunakan sebagai warna utama untuk merepresentasikan uang, kesegaran, dan kesuksesan. Komponen UI dibuat membulat dan besar-besar agar mudah di-tap dengan satu tangan.
