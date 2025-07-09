# Serenity AesthetiCare Hub

Selamat datang di Serenity AesthetiCare Hub, solusi manajemen lengkap yang dirancang khusus untuk distributor perangkat dan produk estetika. Aplikasi ini memberdayakan bisnis Anda dengan fitur-fitur canggih untuk mengelola inventaris, layanan, klien, dan banyak lagi.

## Ikhtisar Proyek

Aplikasi ini dibangun menggunakan tumpukan teknologi modern untuk memberikan pengalaman pengguna yang cepat, responsif, dan cerdas. Ini terdiri dari dua portal utama:

1.  **Portal Admin:** Dasbor komprehensif untuk distributor mengelola seluruh operasi bisnis mereka.
2.  **Portal Klien:** Portal layanan mandiri untuk klinik dan dokter untuk melihat riwayat mereka, mengelola janji temu, dan meminta layanan.

Lihat [PROPOSAL.md](./PROPOSAL.md) untuk detail lengkap tentang visi, fitur, dan pedoman gaya aplikasi.

## Fitur Utama

-   **Manajemen Inventaris (CRUD):** Lacak perangkat dan produk dengan detail lengkap, termasuk kuantitas, tanggal pembelian, garansi, dan status stok.
-   **Manajemen Klien (CRUD):** Kelola profil klien, termasuk informasi kontak, riwayat pembelian, preferensi, dan penanggung jawab.
-   **Manajemen Layanan:** Catat dan jadwalkan pemeliharaan, perbaikan, dan kalibrasi peralatan. Lihat riwayat layanan, biaya, dan penugasan teknisi.
-   **Penjadwalan Janji Temu:** Kelola pemesanan untuk demo, pelatihan, dan konsultasi.
-   **Pelaporan & Analitik:** Dasbor interaktif dengan laporan visual tentang tren pendapatan, demografi klien, dan status inventaris.
-   **Fitur Berbasis AI:**
    -   **Rekomendasi Produk:** Hasilkan rekomendasi produk yang dipersonalisasi untuk klien.
    -   **Asisten Pemecahan Masalah:** Dapatkan panduan langkah demi langkah untuk masalah mesin umum.
    -   **Asisten Bantuan:** Asisten AI untuk menjawab pertanyaan tentang penggunaan aplikasi.
-   **Peta Real-time:** Tampilkan lokasi teknisi layanan atau perangkat yang dikerahkan secara real-time.

## Tumpukan Teknologi

-   **Framework:** Next.js (dengan App Router)
-   **Bahasa:** TypeScript
-   **Styling:** Tailwind CSS & shadcn/ui
-   **AI & GenAI:** Google AI & Genkit
-   **Peta:** OpenLayers
-   **Linting & Formatting:** ESLint & Prettier (dikonfigurasi secara default di Next.js)

## Memulai

### Prasyarat

-   Node.js (versi 20.x atau lebih tinggi)
-   npm, yarn, atau pnpm

### Instalasi & Menjalankan Secara Lokal

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/user/repo.git
    cd repo
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan Variabel Lingkungan:**
    Buat file `.env` di root proyek dan tambahkan kredensial database Anda dan kunci API yang diperlukan.

    ```env
    # Konfigurasi Database (Contoh untuk PostgreSQL)
    POSTGRES_URL="postgresql://postgres:postgres@localhost:5432/thehub"

    # Kunci API Google AI (jika menggunakan Genkit)
    GOOGLE_API_KEY="AIzaSy..."
    ```

4.  **Konfigurasi Database (Opsional):**
    Aplikasi ini saat ini menggunakan data tiruan dari `src/lib/data.ts`. Untuk menggunakan database PostgreSQL nyata, Anda perlu:
    -   Membuat database PostgreSQL.
    -   Menjalankan skema SQL yang disediakan di `src/lib/schema.sql` untuk membuat tabel.
    -   Membatalkan komentar dan mengkonfigurasi klien database di dalam file *server actions* (`src/app/actions.ts`).

5.  **Jalankan server pengembangan:**
    Aplikasi ini menggunakan Genkit untuk fitur AI, yang berjalan sebagai proses terpisah.

    -   Di satu terminal, jalankan server pengembangan Next.js:
        ```bash
        npm run dev
        ```
        Ini akan memulai aplikasi di `http://localhost:9002`.

    -   Di terminal lain, jalankan server pengembangan Genkit:
        ```bash
        npm run genkit:dev
        ```
        Ini akan memulai layanan Genkit, memungkinkan fitur AI berfungsi.

### Login & Akses

Aplikasi ini dilengkapi dengan sistem login tiruan untuk demonstrasi:

-   **Login Admin:**
    -   Email: `admin@aestheticare.pro`
    -   Password: `password`
-   **Login Klien:**
    -   Email: `info@dermaster.com`
    -   Password: `password`

## Struktur Proyek

```
/
├── public/                 # Aset statis (gambar, font)
├── src/
│   ├── app/                # Rute aplikasi (App Router)
│   │   ├── (auth)/         # Grup rute untuk halaman otentikasi
│   │   ├── admin/          # Rute dan UI untuk Portal Admin
│   │   ├── client/         # Rute dan UI untuk Portal Klien
│   │   ├── globals.css     # Gaya global dan variabel tema
│   │   └── layout.tsx      # Tata letak root
│   ├── ai/                 # Konfigurasi Genkit dan alur AI
│   │   ├── flows/          # Alur Genkit untuk tugas-tugas AI
│   │   └── genkit.ts       # Inisialisasi dan konfigurasi Genkit
│   ├── components/         # Komponen React yang dapat digunakan kembali
│   │   ├── ui/             # Komponen UI dari shadcn/ui
│   │   └── ...
│   ├── hooks/              # Hook kustom
│   ├── lib/                # Utilitas, data tiruan, dan skema
│   │   ├── data.ts         # Data tiruan untuk aplikasi
│   │   ├── schema.sql      # Skema database SQL
│   │   ├── schemas.ts      # Skema validasi Zod
│   │   └── utils.ts        # Fungsi utilitas (mis., cn)
│   └── types/              # Definisi tipe TypeScript
├── .env.example            # Contoh variabel lingkungan
├── next.config.ts          # Konfigurasi Next.js
├── package.json            # Dependensi dan skrip proyek
└── tsconfig.json           # Konfigurasi TypeScript
```
