# ANVIEO Academy — LMS Portal Template (Node.js & Next.js 16)

Template antarmuka portal pembelajaran terpadu untuk **ANVIEO Academy**, dibangun mengikuti sistem desain resmi dari proyek `lms-web` (AUI Institutional Design Tokens, Tipografi Fraunces & Karla, serta Architectural Grid Rails).

Template ini dirancang siap pakai (*ready-to-use prototype*) berbasis **Node.js** tanpa ketergantungan autentikasi backend (*tanpa auth / client-side simulated state*), sehingga sangat cepat diuji dan diintegrasikan ke API backend nantinya.

---

## 🚀 Fitur Halaman & Komponen

### 1. Halaman Masuk / Login (`/login` & `/`)
- **Split-Screen Layout**:
  - **Sisi Kiri (Prestige Showcase)**: Badge akreditasi, poin keunggulan (Socratic AI, Evaluasi Reviewer 1-on-1, Sertifikat Industri), kartu testimoni alumni beranimasi rotasi, serta metrik *live* kepuasan & kelulusan siswa.
  - **Sisi Kanan (Kartu Login)**:
    - **Tab Pemilih Peran (*Role Selector*)**: Siswa, Reviewer, dan Instruktur.
    - **Bar Coba Demo 1-Klik**: Tombol *quick autofill* untuk mencoba akun Siswa, Reviewer, atau Instruktur tanpa perlu mengetik manual.
    - **Input Semantik**: Email (`autocomplete="username"`), Kata Sandi (`autocomplete="current-password"`), dan tombol *Show/Hide Password*.
    - **Modal Lupa Kata Sandi**: Alur pemulihan kata sandi interaktif dengan simulasi pengiriman instruksi reset email.
    - **Tombol SSO Cepat**: Integrasi visual tombol Masuk dengan Google dan GitHub.
    - **Transisi Dashboard**: Klik tombol *Masuk ke Portal Belajar* akan langsung mengarahkan Anda ke Dashboard Siswa (`/dashboard`).

### 2. Halaman Pendaftaran / Registrasi (`/register`)
- **Formulir Pendaftaran Terstruktur**:
  - **Nama Lengkap**: Sesuai KTP untuk pencetakan sertifikat kelulusan.
  - **Email Aktif**: Untuk verifikasi dan korespondensi akademik.
  - **Nomor WhatsApp**: Notifikasi SLA review kode tugas dan kelulusan modul.
  - **Pilihan Jalur Spesialisasi**: *Fullstack Web & AI Architecture*, *Cloud & Distributed Backend Systems*, *Cyberlaw & AI Governance*, atau *Financial Engineering & Valuation*.
  - **Kata Sandi dengan Real-time Strength Meter**: Bar 4 tingkat (*Sangat Lemah*, *Cukup*, *Kuat*, *Sangat Kuat*) mendeteksi kombinasi huruf besar-kecil, angka, dan simbol.
  - **Persetujuan Ketentuan Layanan**: Modal *popup* membaca etika pembelajaran, integritas akademik (anti-plagiarisme), dan SLA review 1x24 jam.
  - **Tombol Coba Data Sampel**: Pengisian 1-klik untuk pengujian instan.

### 3. Dashboard Siswa / Portal Preview (`/dashboard`)
- **Banner Selamat Datang**: Sapaan personal siswa dengan tracking *7-Day Study Streak* 🔥 dan poin XP (*2,840 XP*).
- **Kartu Progress Jalur Belajar**: Indikator persentase 68% (14 dari 20 modul), estimasi durasi modul berjalan, dan tombol *Lanjutkan Belajar: Modul 15*.
- **Reviewer Code Studio Tab**: Kartu hasil telaah baris kode tugas submission oleh *Principal Engineer* dengan status kelulusan bintang 5 (⭐⭐⭐⭐⭐) dan rincian kriteria evaluasi.
- **Socratic AI Tutor Tab**: Widget asisten AI 24/7 dengan tombol uji cepat logika algoritma dan penjelasan error tanpa jalan pintas instan.
- **Sidebar SLA Reviewer**: Jaminan evaluasi tugas $\le$ 24 jam dengan rerata waktu tanggap 4.8 jam.

### 4. Sistem Tema Global (Light & Dark Mode)
- **100% Dukungan Light & Dark Mode**: Dilengkapi *theme toggle* di header dan skrip anti-flicker (*zero flash*) di tag `<head>`.
- Warna latar belakang disesuaikan: Warm Parchment (`#FBF8F1`) di siang hari, dan Pure Obsidian Architectural Black (`#0A0A0C` & `#141418`) di malam hari.

---

## 🛠️ Spesifikasi Teknologi

- **Runtime**: Node.js (v20+)
- **Framework**: Next.js 16.4.3 (Turbopack, App Router)
- **Library**: React 19.3.0
- **Bahasa**: TypeScript 5
- **Gaya Desain**: Vanilla CSS Design Tokens (AUI Institutional Palette: Deep Navy `#0A2E52`, Prestige Gold `#C9962E`, Cream `#FBF8F1`)
- **Ikonografi**: SVG Mandiri (`FlatIcon.tsx`) tanpa ketergantungan library eksternal yang berat.

---

## 💻 Cara Menjalankan Proyek

### 1. Jalankan Server Pengembangan (Dev Server)

Server dikonfigurasi pada port **`3001`** agar tidak bentrok dengan `lms-web` (yang biasanya berjalan di port `3000`):

```bash
# Menggunakan Bun (Sangat cepat):
bun run dev

# Atau menggunakan npm / npx:
npm run dev
```

Buka peramban Anda di:
- **Halaman Login**: [http://localhost:3001/login](http://localhost:3001/login) (atau [http://localhost:3001](http://localhost:3001))
- **Halaman Registrasi**: [http://localhost:3001/register](http://localhost:3001/register)
- **Halaman Dashboard**: [http://localhost:3001/dashboard](http://localhost:3001/dashboard)

### 2. Membangun Bundle Produksi (Build)

```bash
bun run build
# atau
npm run build
```

---

## 📁 Struktur Berkas

```
lms-portal/
├── public/
│   ├── logo-dark.png         # Logo ANVIEO mode terang
│   ├── logo-light.png        # Logo ANVIEO mode gelap
│   └── alumni/               # Foto avatar alumni untuk testimoni & profil siswa
├── src/
│   ├── app/
│   │   ├── globals.css       # Token warna AUI, Blackbox frame, dan styling form portal
│   │   ├── layout.tsx        # Root layout, Google Fonts (Fraunces & Karla), Theme script
│   │   ├── page.tsx          # Root route (merender LoginPage)
│   │   ├── login/
│   │   │   └── page.tsx      # Rute halaman /login
│   │   ├── register/
│   │   │   └── page.tsx      # Rute halaman /register
│   │   └── dashboard/
│   │       └── page.tsx      # Rute halaman /dashboard
│   └── components/
│       ├── AuthShowcase.tsx  # Panel kiri: benefit, testimonial carousel, stats strip
│       ├── BlackboxRails.tsx # Signature grid rails arsitektural ANVIEO
│       ├── FlatIcon.tsx      # Koleksi ikon SVG mandiri
│       ├── LoginForm.tsx     # Formulir login interaktif & demo autofill
│       ├── RegisterForm.tsx  # Formulir registrasi, password strength, modal ToS
│       ├── PortalHeader.tsx  # Header portal terintegrasi dengan theme switch
│       ├── PortalDashboardPreview.tsx # Komponen dashboard siswa interaktif
│       └── ThemeToggle.tsx   # Tombol toggle Dark/Light mode
├── next.config.ts            # Konfigurasi Next.js 16
├── tsconfig.json             # Konfigurasi TypeScript
└── package.json              # Konfigurasi dependensi Node.js
```
