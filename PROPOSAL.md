# Proposal Aplikasi: Serenity AesthetiCare Hub

## 1. Ikhtisar Proyek

**Nama Aplikasi:** Serenity AesthetiCare Hub

**Misi:** Untuk menyediakan platform manajemen terpusat, intuitif, dan cerdas bagi distributor perangkat dan produk estetika. Aplikasi ini bertujuan untuk menyederhanakan operasi bisnis yang kompleks, meningkatkan hubungan dengan klien, dan mendorong pertumbuhan melalui wawasan berbasis data.

**Target Audiens:**
1.  **Pengguna Utama (Distributor):** Perusahaan yang mendistribusikan perangkat medis estetika (mis., laser, RF, ultrasound) dan produk perawatan kulit ke klinik dan profesional medis.
2.  **Pengguna Sekunder (Klien):** Klinik estetika, spa medis, dan dokter yang membeli dan menggunakan perangkat dan produk dari distributor.

## 2. Fitur Inti

Aplikasi ini akan dibagi menjadi dua portal utama: **Portal Admin (untuk distributor)** dan **Portal Klien (untuk klinik/dokter)**.

### 2.1. Portal Admin

Dasbor komprehensif untuk distributor mengelola semua aspek bisnis mereka.

-   **Dasbor Utama:**
    -   Tampilan ringkas metrik utama: pendapatan, klien aktif, status inventaris, dan permintaan layanan yang tertunda.
    -   Bagan interaktif untuk tren pendapatan, demografi klien, dan status inventaris.
    -   Peta real-time yang menunjukkan lokasi perangkat yang telah dipasang atau teknisi layanan.
    -   Feed notifikasi untuk permintaan klien baru dan peringatan penting.

-   **Manajemen Inventaris (CRUD Penuh):**
    -   Melacak perangkat dan produk perawatan kulit dengan detail (mis., kuantitas, tanggal pembelian, garansi, status stok).
    -   Menetapkan perangkat ke klien tertentu saat dijual/dipasang.
    -   Mengelola level stok dengan status visual (Dalam Stok, Stok Rendah, Habis).

-   **Manajemen Layanan:**
    -   Mencatat dan menjadwalkan pemeliharaan, perbaikan, dan kalibrasi peralatan.
    -   Melihat riwayat layanan lengkap untuk setiap perangkat.
    -   Menghasilkan Laporan Perintah Kerja (Work Order) dalam format PDF.

-   **Manajemen Klien (CRUD Penuh):**
    -   Mengelola database klien dengan profil terperinci (kontak, alamat, penanggung jawab).
    -   Mencatat riwayat pembelian, preferensi perawatan, dan catatan penting lainnya.
    -   Lihat perangkat yang dipasang di setiap lokasi klien.

-   **Penjadwalan Janji Temu:**
    -   Mengelola pemesanan untuk demo produk, sesi pelatihan, dan konsultasi dengan klien.

-   **Fitur Berbasis AI:**
    -   **Asisten Pemecahan Masalah:** Memberikan panduan langkah demi langkah yang didukung AI untuk masalah mesin umum.
    -   **Rekomendasi Produk:** Menghasilkan rekomendasi produk yang dipersonalisasi untuk klien berdasarkan riwayat pembelian dan fokus praktik mereka.
    -   **Asisten Bantuan:** Asisten obrolan AI untuk menjawab pertanyaan tentang cara menggunakan aplikasi.

### 2.2. Portal Klien

Portal layanan mandiri yang disederhanakan bagi klien untuk berinteraksi dengan distributor.

-   **Dasbor Klien:**
    -   Ringkasan perangkat yang mereka beli, status garansi, dan janji temu mendatang.
    -   Akses cepat untuk meminta layanan atau bantuan pemecahan masalah.

-   **Peralatan Saya:**
    -   Daftar semua perangkat yang dibeli dari distributor.
    -   Akses mudah ke pemecahan masalah berbasis AI atau untuk mengajukan permintaan layanan untuk perangkat tertentu.

-   **Riwayat Janji Temu:**
    -   Melihat riwayat janji temu yang akan datang dan yang sudah lewat untuk pelatihan, demo, atau layanan.

## 3. Pedoman Gaya & Desain

Tujuannya adalah menciptakan antarmuka yang bersih, profesional, dan menenangkan yang mencerminkan industri estetika.

-   **Palet Warna:**
    -   **Primer:** Lavender lembut (`#E6E6FA`) - Menginspirasi ketenangan dan profesionalisme.
    -   **Latar Belakang:** Abu-abu terang (`#F5F5F5`) - Memberikan latar belakang yang bersih dan modern.
    -   **Aksen:** Ungu tua (`#800080`) - Digunakan sebagai kontras untuk memandu fokus ke tindakan utama (mis., tombol, tautan penting).

-   **Tipografi:**
    -   **Font Tubuh & Judul:** 'Inter' (sans-serif) - Dikenal dengan penampilannya yang modern dan objektif, memberikan keterbacaan yang jelas.

-   **Ikonografi:**
    -   Ikon garis yang bersih dan minimalis dari `lucide-react` yang berhubungan dengan inventaris, layanan, dan manajemen klien.

-   **Tata Letak & UX:**
    -   Tata letak dasbor yang bersih dan intuitif dengan bagian yang jelas.
    -   Penggunaan kartu (cards), tabel, dan lencana (badges) yang konsisten untuk menyajikan informasi.
    -   Transisi dan animasi yang halus untuk memberikan umpan balik (mis., indikator pemuatan, pesan konfirmasi).

## 4. Tumpukan Teknologi

-   **Framework:** Next.js (menggunakan App Router)
-   **Bahasa:** TypeScript
-   **Styling:** Tailwind CSS dengan variabel tema untuk warna, dan komponen dari **shadcn/ui**.
-   **AI Generatif:** Google AI (melalui Gemini) diimplementasikan menggunakan **Genkit**.
-   **Pustaka Peta:** OpenLayers untuk peta interaktif.
-   **Skema & Validasi:** Zod untuk validasi skema yang kuat.
