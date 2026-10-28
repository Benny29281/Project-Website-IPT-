# Product Requirements Document (PRD)
## Website Resmi PT Indonesia Pacific Trade

> **Pembaruan ruang lingkup — 28 Oktober 2026:** Pengguna meminta website mendukung keranjang dan checkout dengan pembayaran online. Keputusan ini menggantikan pengecualian e-commerce pada bagian 5.2 untuk pengembangan saat ini. Integrasi awal memakai Midtrans Snap Redirect dalam sandbox; harga produk, ongkir, kredensial merchant, dan uji transaksi masih harus dilengkapi sebelum pembayaran diaktifkan. Enam produk referensi mencakup Instax SQ40, Wide 400 Black, Wide 400 Green, Mini Pink Lemonade, Square Black Frame, dan Wide Twin Pack.

| Item | Keterangan |
|---|---|
| Versi dokumen | 1.0 (Draft) |
| Tanggal | 28 Oktober 2026 |
| Pemilik produk | Manajemen PT Indonesia Pacific Trade |
| Status | Draft untuk ditinjau |

> **Catatan:** Dokumen ini disusun berdasarkan asumsi umum untuk perusahaan perdagangan (trading). Bagian bertanda **[ASUMSI]** atau **[ISI]** perlu dikonfirmasi/dilengkapi oleh pihak perusahaan sebelum masuk tahap desain dan pengembangan.

---

## 1. Ringkasan Eksekutif

PT Indonesia Pacific Trade membutuhkan website resmi sebagai wajah digital perusahaan: media untuk membangun kredibilitas, memperkenalkan produk dan layanan, serta menjadi kanal utama bagi calon mitra, pembeli, dan pemasok untuk menghubungi perusahaan. Website ditargetkan bersifat profesional, cepat, responsif di perangkat seluler, mudah dikelola oleh tim internal tanpa keahlian teknis, serta siap dioptimasi untuk mesin pencari (SEO).

## 2. Latar Belakang dan Masalah

- Perusahaan belum memiliki (atau belum memiliki yang memadai) kehadiran online resmi yang dapat dijadikan rujukan oleh mitra bisnis.
- Calon klien B2B umumnya memeriksa legalitas dan reputasi perusahaan secara online sebelum melakukan kontak.
- Informasi produk dan layanan masih tersebar melalui kanal personal (WhatsApp, email, katalog PDF) sehingga sulit dikelola dan tidak konsisten.
- Perusahaan belum memiliki saluran terukur untuk menangkap prospek (*lead*) dari pasar domestik maupun internasional.

## 3. Tujuan dan Metrik Keberhasilan

### 3.1 Tujuan Bisnis

1. Membangun kredibilitas dan citra profesional perusahaan.
2. Menghasilkan prospek (*lead*) berkualitas melalui formulir permintaan penawaran dan kontak.
3. Menyediakan katalog produk/komoditas yang mudah diakses dan diperbarui.
4. Menjangkau pasar internasional melalui dukungan dua bahasa (Indonesia dan Inggris).

### 3.2 Metrik Keberhasilan (KPI) **[ASUMSI, sesuaikan target]**

| Metrik | Target 3 bulan setelah peluncuran |
|---|---|
| Pengunjung unik per bulan | ≥ 1.000 |
| Pengiriman formulir *Request a Quote* / Kontak | ≥ 20 per bulan |
| Skor Lighthouse (Performance, SEO, Accessibility) | ≥ 90 |
| Waktu muat halaman utama (LCP) | ≤ 2,5 detik |
| Bounce rate | ≤ 60% |
| Halaman terindeks Google | 100% halaman publik |

## 4. Target Pengguna

| Persona | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Pembeli / importir** | Perusahaan domestik atau luar negeri yang mencari pemasok komoditas | Daftar produk, spesifikasi, cara memesan, bukti kredibilitas |
| **Calon pemasok / mitra** | Produsen atau supplier yang ingin bekerja sama | Profil perusahaan, kriteria kemitraan, kontak resmi |
| **Investor / institusi** | Bank, lembaga, atau instansi yang melakukan verifikasi | Legalitas, profil manajemen, alamat dan kontak resmi |
| **Pencari kerja** | Calon karyawan | Informasi lowongan dan cara melamar |
| **Media / publik** | Pihak yang mencari informasi perusahaan | Berita, siaran pers, kontak |

## 5. Ruang Lingkup

### 5.1 Dalam Lingkup (In Scope)

- Website *company profile* multi-halaman, dwibahasa (ID/EN).
- Katalog produk/komoditas (tanpa transaksi pembayaran online).
- Formulir kontak dan permintaan penawaran (*Request a Quote*).
- Blog/berita perusahaan.
- Panel admin (CMS) untuk mengelola konten.
- SEO teknis dasar, analitik, dan keamanan dasar.
- Integrasi WhatsApp dan Google Maps.

### 5.2 Di Luar Lingkup (Out of Scope) untuk Rilis Pertama

- E-commerce dengan keranjang belanja dan pembayaran online.
- Portal login pelanggan/mitra.
- Aplikasi seluler native.
- Integrasi ERP/akuntansi.
- Sistem pelacakan pengiriman (*shipment tracking*).

> Item di luar lingkup dapat dipertimbangkan pada fase berikutnya (lihat bagian 14).

## 6. Struktur Informasi (Sitemap)

```
Beranda
├── Tentang Kami
│   ├── Profil Perusahaan
│   ├── Visi & Misi
│   ├── Manajemen / Tim
│   └── Legalitas & Sertifikasi
├── Produk
│   ├── Daftar Kategori
│   └── Detail Produk
├── Layanan
│   ├── Ekspor
│   ├── Impor
│   └── Sourcing & Logistik         [ASUMSI]
├── Mengapa Kami (Keunggulan)
├── Berita & Artikel
│   └── Detail Artikel
├── Karier
├── Kontak
│   └── Request a Quote
├── Kebijakan Privasi
└── Syarat & Ketentuan
```

## 7. Kebutuhan Fungsional

Prioritas: **P0** = wajib rilis awal, **P1** = penting, **P2** = opsional/fase berikutnya.

### 7.1 Halaman Beranda (P0)

- FR-001: *Hero section* berisi tagline perusahaan dan tombol ajakan bertindak (CTA) "Hubungi Kami" / "Request a Quote".
- FR-002: Ringkasan singkat tentang perusahaan.
- FR-003: Sorotan kategori produk unggulan.
- FR-004: Ringkasan layanan.
- FR-005: Bagian keunggulan perusahaan (angka pencapaian, pengalaman, jangkauan negara tujuan) **[ISI]**.
- FR-006: Logo klien/mitra dan testimoni (P1).
- FR-007: Cuplikan berita terbaru.
- FR-008: CTA akhir halaman dan *footer* lengkap.

### 7.2 Tentang Kami (P0)

- FR-010: Sejarah dan profil perusahaan.
- FR-011: Visi, misi, dan nilai perusahaan.
- FR-012: Profil manajemen (foto, nama, jabatan) (P1).
- FR-013: Legalitas: NIB, NPWP, SIUP/izin usaha terkait, keanggotaan asosiasi, dan sertifikasi **[ISI]**. Tampilkan hanya data yang boleh dipublikasikan.

### 7.3 Katalog Produk (P0)

- FR-020: Halaman daftar produk dengan filter kategori dan pencarian.
- FR-021: Halaman detail produk: nama, foto (galeri), deskripsi, spesifikasi, minimum order, kemasan, asal produk, dan sertifikasi.
- FR-022: Tombol "Minta Penawaran" pada setiap produk yang otomatis membawa nama produk ke formulir.
- FR-023: Unduh brosur/katalog PDF (P1).
- FR-024: Produk terkait pada halaman detail (P2).

### 7.4 Layanan (P0)

- FR-030: Halaman per layanan yang menjelaskan proses, manfaat, dan alur kerja.
- FR-031: Infografis alur kerja dari permintaan hingga pengiriman (P1).

### 7.5 Berita dan Artikel (P1)

- FR-040: Daftar artikel dengan paginasi dan kategori.
- FR-041: Halaman detail artikel dengan tombol bagikan.
- FR-042: Metadata SEO dan gambar sampul per artikel.

### 7.6 Karier (P2)

- FR-050: Daftar lowongan aktif beserta deskripsi dan persyaratan.
- FR-051: Formulir lamaran dengan unggah CV (PDF, maks. 5 MB), atau tautan email.

### 7.7 Kontak dan Request a Quote (P0)

- FR-060: Formulir kontak: nama, perusahaan, email, telepon/WhatsApp, negara, subjek, pesan.
- FR-061: Formulir *Request a Quote*: produk, perkiraan volume, negara/pelabuhan tujuan, *incoterm* yang diinginkan, catatan tambahan.
- FR-062: Validasi sisi klien dan server, perlindungan spam (reCAPTCHA/hCaptcha atau *honeypot*).
- FR-063: Notifikasi email otomatis ke tim internal dan email konfirmasi ke pengirim.
- FR-064: Seluruh pengiriman tersimpan di basis data dan dapat dilihat di panel admin.
- FR-065: Informasi alamat, telepon, email, jam operasional, dan peta Google Maps tertanam.
- FR-066: Tombol WhatsApp mengambang (*floating button*).

### 7.8 Dwibahasa (P0)

- FR-070: Pilihan bahasa Indonesia dan Inggris pada *header*.
- FR-071: URL terpisah per bahasa (mis. `/id/...` dan `/en/...`) dengan tag `hreflang`.
- FR-072: Seluruh konten (halaman, produk, artikel) dapat diterjemahkan melalui CMS.

### 7.9 Panel Admin / CMS (P0)

- FR-080: Login aman dengan peran pengguna (Admin, Editor).
- FR-081: CRUD untuk halaman, produk, kategori, artikel, lowongan, dan media.
- FR-082: Manajemen pengiriman formulir dengan ekspor ke CSV.
- FR-083: Pengaturan SEO (judul, deskripsi, gambar OG) per halaman.
- FR-084: Pengaturan umum situs: logo, kontak, tautan media sosial, skrip analitik.
- FR-085: Pratinjau konten sebelum dipublikasikan, dengan status Draft/Terbit (P1).

### 7.10 Fitur Pendukung

- FR-090: Tautan media sosial (LinkedIn, Instagram, dll.) **[ISI]**.
- FR-091: Banner persetujuan cookie (P1).
- FR-092: Halaman 404 yang informatif dan peta situs XML otomatis.
- FR-093: Pengalihan (*redirect*) 301 yang dapat dikelola (P2).

## 8. Kebutuhan Non-Fungsional

### 8.1 Performa

- LCP ≤ 2,5 detik, CLS ≤ 0,1, INP ≤ 200 ms pada koneksi 4G.
- Gambar dioptimasi otomatis (WebP/AVIF, *lazy loading*, ukuran responsif).
- Pemanfaatan CDN untuk aset statis.

### 8.2 Keamanan

- HTTPS wajib (TLS) dengan HSTS.
- Perlindungan terhadap OWASP Top 10 (XSS, CSRF, SQL injection, dll.).
- Kata sandi di-*hash*, dukungan autentikasi dua faktor untuk admin (P1).
- *Rate limiting* pada formulir dan login.
- Pencadangan (*backup*) otomatis harian dengan retensi minimal 14 hari.
- Pembaruan keamanan dan dependensi berkala.

### 8.3 Responsivitas dan Kompatibilitas

- Pendekatan *mobile-first*; mendukung lebar layar 360 px hingga 1920 px.
- Peramban: dua versi stabil terakhir Chrome, Safari, Firefox, dan Edge.

### 8.4 Aksesibilitas

- Mengacu pada WCAG 2.1 level AA: kontras warna, navigasi keyboard, teks alternatif gambar, label formulir.

### 8.5 SEO

- Struktur HTML semantik, satu `h1` per halaman.
- Meta title/description, Open Graph, dan Twitter Card per halaman.
- Data terstruktur (schema.org: `Organization`, `Product`, `Article`, `BreadcrumbList`).
- `sitemap.xml`, `robots.txt`, URL kanonik, dan `hreflang`.
- Didaftarkan ke Google Search Console dan Bing Webmaster Tools.

### 8.6 Ketersediaan dan Skalabilitas

- Target *uptime* ≥ 99,5%.
- Arsitektur mampu menangani lonjakan trafik tanpa perubahan besar.

### 8.7 Kepatuhan Hukum

- Kebijakan Privasi dan Syarat & Ketentuan sesuai **UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)**; data pribadi dari formulir hanya digunakan sesuai tujuan yang dinyatakan.
- Bila menyasar pengunjung Uni Eropa, pertimbangkan kepatuhan GDPR (mis. persetujuan cookie).
- Penggunaan aset (foto, font, ikon) harus berlisensi sah.

## 9. Desain dan Pengalaman Pengguna

### 9.1 Prinsip Desain

- **Profesional dan tepercaya:** tata letak bersih, banyak ruang kosong, hierarki jelas.
- **Global namun berakar lokal:** kesan perdagangan Asia-Pasifik, tetap memuat identitas Indonesia.
- **Fokus konversi:** CTA konsisten dan mudah ditemukan di setiap halaman.

### 9.2 Identitas Visual **[ISI]**

| Elemen | Keterangan |
|---|---|
| Logo | Disediakan perusahaan (format vektor SVG/AI) |
| Warna utama | Usulan: biru laut / teal sebagai simbol Pasifik, dengan aksen hangat **[ASUMSI]** |
| Tipografi | Maksimal 2 keluarga font (mis. satu untuk judul, satu untuk isi) |
| Fotografi | Foto asli produk, pelabuhan, dan operasional; hindari foto stok generik bila memungkinkan |

### 9.3 Alur Pengguna Utama

1. **Pembeli:** Beranda → Produk → Detail Produk → Request a Quote → Konfirmasi.
2. **Verifikasi mitra:** Beranda → Tentang Kami → Legalitas → Kontak.
3. **Pemasok:** Beranda → Layanan/Tentang Kami → Kontak.

## 10. Arsitektur dan Teknologi (Keputusan Final)

Stack yang dipilih: **React (Next.js) + Payload CMS + PostgreSQL**, seluruhnya berbasis **TypeScript** dalam satu proyek/aplikasi.

| Lapisan | Teknologi | Fungsi |
|---|---|---|
| Frontend | Next.js (React) + TypeScript | Tampilan, routing, render server (SSR/SSG), SEO |
| Styling | Tailwind CSS + shadcn/ui | UI responsif dan komponen konsisten |
| Backend | Next.js Route Handlers / Server Actions | Pemrosesan formulir, pengiriman email, API |
| CMS / Panel admin | Payload CMS (terpasang di dalam Next.js, akses di `/admin`) | Pengelolaan produk, artikel, halaman, media, lowongan |
| Basis data | PostgreSQL | Penyimpanan seluruh data konten dan pengiriman formulir |
| Dwibahasa (i18n) | next-intl + fitur lokalisasi Payload | Konten Indonesia dan Inggris |
| Penyimpanan media | Penyimpanan lokal server atau object storage S3-compatible | Foto produk, brosur PDF, CV pelamar |
| Email | Resend atau Amazon SES | Notifikasi formulir dan email konfirmasi |
| Anti-spam | Cloudflare Turnstile atau reCAPTCHA | Melindungi formulir |
| Hosting | VPS (Docker) di region Singapura/Jakarta, atau Vercel + PostgreSQL terkelola (Neon/Supabase), dengan CDN | Latensi rendah untuk Asia |
| Analitik | Google Analytics 4 + Google Search Console | Pengukuran KPI |
| Version control & CI/CD | Git (GitHub) + GitHub Actions | Pengelolaan kode dan deployment otomatis |

### Alur Kerja Sistem

1. Admin/editor login ke `/admin` dan mengelola konten melalui Payload CMS.
2. Data tersimpan di PostgreSQL.
3. Next.js mengambil data dan merender halaman untuk pengunjung (dengan *caching* agar cepat).
4. Saat pengunjung mengirim formulir, backend memvalidasi, menyimpan ke PostgreSQL, lalu mengirim email notifikasi ke tim internal.

### Alasan Pemilihan

- Satu aplikasi dan satu deployment, sehingga lebih sederhana dan hemat biaya hosting.
- Satu bahasa (TypeScript) di seluruh stack, memudahkan perawatan.
- SEO dan performa kuat melalui Next.js.
- PostgreSQL stabil, gratis, dan skalabel untuk pengembangan lanjutan (portal mitra, integrasi CRM).

## 11. Kebutuhan Konten

| Konten | Penanggung Jawab | Status |
|---|---|---|
| Logo dan panduan identitas visual | Perusahaan | **[ISI]** |
| Profil, visi-misi, sejarah perusahaan | Perusahaan | **[ISI]** |
| Daftar produk beserta spesifikasi dan foto | Perusahaan | **[ISI]** |
| Dokumen legalitas yang akan ditampilkan | Perusahaan | **[ISI]** |
| Foto tim manajemen | Perusahaan | **[ISI]** |
| Terjemahan Indonesia ↔ Inggris | Penyedia konten / penerjemah | **[ISI]** |
| Artikel awal (minimal 3) | Perusahaan / penulis konten | **[ISI]** |
| Kebijakan Privasi dan Syarat & Ketentuan | Perusahaan + konsultan hukum | **[ISI]** |

## 12. Analitik dan Pelacakan

- Pasang Google Analytics 4 dengan event: `form_submit`, `quote_request`, `whatsapp_click`, `brochure_download`, `language_switch`.
- Pantau sumber trafik, halaman terpopuler, dan negara pengunjung.
- Laporan bulanan ringkas untuk manajemen.

## 13. Rencana Peluncuran dan Jadwal **[ASUMSI]**

| Fase | Aktivitas | Estimasi |
|---|---|---|
| 1. Discovery | Konfirmasi PRD, pengumpulan konten, riset kompetitor | Minggu 1–2 |
| 2. Desain | *Wireframe*, desain UI, persetujuan | Minggu 3–5 |
| 3. Pengembangan | Front-end, CMS, formulir, dwibahasa, integrasi | Minggu 6–10 |
| 4. Pengisian konten | Input konten dan terjemahan | Minggu 9–11 |
| 5. QA / UAT | Uji fungsional, performa, keamanan, aksesibilitas | Minggu 11–12 |
| 6. Peluncuran | Konfigurasi domain, SSL, go-live, pendaftaran Search Console | Minggu 13 |
| 7. Pasca-peluncuran | Pemantauan, perbaikan, garansi (mis. 30 hari) | Minggu 14–17 |

### Kriteria Penerimaan (Acceptance Criteria) Rilis

- Semua kebutuhan **P0** berfungsi sesuai spesifikasi.
- Tidak ada *bug* kritis atau mayor yang terbuka.
- Skor Lighthouse ≥ 90 pada halaman utama (seluler dan desktop).
- Formulir terbukti mengirim email dan menyimpan data.
- Konten dua bahasa lengkap untuk seluruh halaman P0.
- Admin dan editor telah menerima pelatihan penggunaan CMS.

## 14. Peta Jalan Fase Berikutnya (Pasca-Rilis 1)

- Portal mitra/pelanggan dengan login dan riwayat permintaan.
- Integrasi CRM (mis. HubSpot/Zoho) untuk pengelolaan prospek otomatis.
- Fitur pelacakan pengiriman.
- Tambahan bahasa (mis. Mandarin, Jepang, Arab) sesuai pasar tujuan.
- Chatbot / live chat.
- Katalog produk yang terhubung dengan sistem inventaris.

## 15. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten dan materi terlambat disediakan | Jadwal mundur | Tetapkan tenggat konten dan PIC di sisi perusahaan sejak awal |
| Kualitas terjemahan kurang baik | Citra tidak profesional | Gunakan penerjemah/*reviewer* penutur asli |
| Perubahan ruang lingkup di tengah proyek | Biaya dan waktu membengkak | Terapkan prosedur *change request* |
| Spam pada formulir | Kotak masuk penuh, prospek tersaring | Anti-spam, validasi, *rate limiting* |
| Kerentanan keamanan | Kebocoran data, situs diretas | Pembaruan rutin, WAF, backup, audit keamanan |
| Penyalahgunaan data legalitas yang dipublikasikan | Risiko penipuan | Tampilkan hanya data yang perlu; sensor informasi sensitif |

## 16. Asumsi dan Ketergantungan

- Perusahaan memiliki atau akan membeli nama domain (mis. `indonesiapacifictrade.co.id`) dan akan menyediakan akses DNS.
- Perusahaan menyediakan seluruh konten, logo, dan foto sesuai jadwal.
- Perusahaan menunjuk satu penanggung jawab (PIC) untuk persetujuan dan umpan balik.
- Domain `.co.id` mensyaratkan dokumen legalitas perusahaan (akta, NIB/NPWP) saat pendaftaran.
- Biaya berulang (domain, hosting, layanan email, lisensi pihak ketiga) ditanggung perusahaan.

## 17. Pertanyaan Terbuka

1. Komoditas/produk apa saja yang akan ditampilkan pada rilis pertama, dan berapa jumlahnya?
2. Apakah perusahaan fokus pada ekspor, impor, atau keduanya? Negara tujuan utama?
3. Apakah sudah ada domain, hosting, logo, dan panduan merek?
4. Siapa yang akan mengelola konten setelah peluncuran (tim internal atau vendor)?
5. Berapa batas anggaran proyek, dan apakah hosting memakai VPS sendiri atau layanan cloud? (Platform sudah diputuskan: Next.js + Payload CMS + PostgreSQL.)
6. Apakah perlu menampilkan harga, atau hanya "minta penawaran"?
7. Dokumen legalitas dan sertifikasi apa yang boleh ditampilkan secara publik?
8. Apakah ada situs kompetitor atau referensi desain yang disukai?

## 18. Persetujuan

| Peran | Nama | Tanda Tangan | Tanggal |
|---|---|---|---|
| Pemilik Produk / Direksi | | | |
| Penanggung Jawab Proyek (PIC) | | | |
| Pengembang / Vendor | | | |

---

*Akhir dokumen.*
