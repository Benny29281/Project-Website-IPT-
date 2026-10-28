# PT Indonesia Pacific Trade

Implementasi struktur dan antarmuka website berdasarkan `prd.md`. Next.js App Router, React, TypeScript, Tailwind CSS, next-intl, Payload CMS, dan PostgreSQL.

## Pembaruan desain sesuai referensi

- Warna utama `#2477D1` dan font Inter Variable yang dimuat lokal.
- Header biru dengan navigasi Home/Profile/Store/Contact (diterjemahkan untuk ID), pencarian produk, dan pilihan bahasa.
- Home berfokus pada belanja: slideshow foto landscape, kategori, serta katalog dengan tombol tambah ke keranjang. Navigasi mencakup panah, indikator, swipe seluler, serta putar/jeda. Slideshow berputar otomatis setiap 5 detik, termasuk saat kursor berada di atas foto, dan berulang dari slide terakhir ke pertama. Fokus keyboard menjeda autoplay; pergantian berhenti sementara saat tab tersembunyi. Preferensi pengurangan gerakan menonaktifkan autoplay awal.
- Konten desain perusahaan dipindahkan ke menu Profile (`/id/about` dan `/en/about`): hero perusahaan, Who We Are, How We Work, Core Products, dan Market Reach.
- Slideshow Home hanya memuat 3 banner landscape: SQ40, Mini 13, dan Mini Evo Gentle Rose. Dua banner Mini mengarah ke kategori Kamera Instax; keduanya belum ditambahkan sebagai produk yang bisa dibeli.
- Delapan produk tersedia: Gigabyte Graphic Card, Fujifilm QuickSnap, Instax SQ40, Wide 400 Black, Wide 400 Green, Mini Pink Lemonade, Square Black Frame, dan Wide Twin Pack. Model GPU belum dikonfirmasi sehingga tidak ada klaim tipe chipset, VRAM, atau performa.
- Foto asli dari lampiran sudah tersimpan di `public/products/` dan digunakan pada katalog, detail produk, serta keranjang. Logo asli tersimpan di `public/brand/logo.png`. Daftar aset ada di `public/products/README.md`.
- Hero Profile memakai foto bisnis stok sementara. Konten profil dan fokus pasar diadaptasi dari desain yang diberikan.
- Website sekarang mencakup keranjang dan checkout online menggunakan Midtrans Snap Redirect, sesuai perluasan kebutuhan terbaru.

## Keranjang dan pembayaran online

Fitur tersedia pada `/id/cart`, `/en/cart`, `/id/checkout`, dan `/en/checkout`. Produk dapat ditambahkan dari katalog maupun halaman detail. Keranjang menyimpan ID dan jumlah produk di localStorage, tanpa menyimpan data pelanggan. Jumlah dibatasi 1–99 per produk dan disinkronkan antar-tab. Setelah pembayaran terverifikasi lunas, hanya jumlah produk pada pesanan tersebut yang dihapus dari keranjang.

Pembayaran memakai **Midtrans Snap Redirect**. Pembeli mengisi kontak dan alamat pengiriman lalu diarahkan ke halaman pembayaran Midtrans; website tidak meminta atau menyimpan nomor kartu. Checkout belum diaktifkan selama harga, ongkir, PostgreSQL, atau kredensial belum diisi. Server tidak menggunakan harga dari browser sebagai dasar tagihan.

Konfigurasi pada `.env`:

1. Isi `DATABASE_URI` dan `PAYLOAD_SECRET` yang kuat.
2. Isi `PRODUCT_PRICES_IDR` dengan objek JSON berisi harga resmi dalam rupiah bulat. Nama produk memakai slug dari `src/lib/content.ts`. Contoh bentuk (isi nilai angka resmi menggantikan `null`):

   ```json
   {"gigabyte-graphic-card":null,"quicksnap":null,"instax-sq40":null,"instax-wide-400":null,"instax-wide-400-green":null,"instax-mini-pink-lemonade":null,"instax-square-black-frame":null,"instax-wide-twin-pack":null}
   ```

3. Isi `SHIPPING_FEE_IDR` dengan ongkir flat rupiah; `0` hanya jika memang gratis. Tarif yang sama berlaku untuk semua alamat; perhitungan kurir/negara belum terintegrasi.
4. Isi `MIDTRANS_SERVER_KEY` dengan Server Key sandbox di mesin sendiri, bukan di chat atau Git. `MIDTRANS_IS_PRODUCTION=false` menggunakan sandbox. Snap Redirect tidak memerlukan Client Key di frontend.
5. Isi `NEXT_PUBLIC_SITE_URL` sesuai alamat website. Atur Payment Notification URL di dashboard Midtrans ke `https://DOMAIN/api/payments/midtrans`. Callback hasil checkout mengarah ke `/{locale}/checkout/result?order=...`.
6. Sebelum mode produksi, uji transaksi sandbox, webhook pada URL publik HTTPS, kegagalan pembayaran, dan pengulangan notifikasi. Gunakan kredensial produksi hanya setelah akun merchant siap.

Koleksi `orders` menyimpan snapshot produk, jumlah, harga server, biaya kirim, alamat, dan status pembayaran. Akses publik ke data pesanan ditutup. Pengembalian dari halaman Midtrans tidak otomatis menandai lunas: webhook dan halaman hasil memeriksa status langsung ke API Midtrans serta mencocokkan jumlah dan mata uang. Webhook memverifikasi tanda tangan SHA-512 dan pembaruan status menolak penurunan dari lunas akibat notifikasi lama. Permintaan checkout memakai idempotency key untuk mengurangi pesanan duplikat. Halaman hasil memerlukan cookie HttpOnly dari browser checkout.

Referensi integrasi: [Snap Integration Guide](https://docs.midtrans.com/docs/snap-snap-integration-guide), [HTTP Notifications](https://docs.midtrans.com/docs/https-notification-webhooks). Implementasi belum mencakup inventori/reservasi stok, perhitungan pajak, pengiriman otomatis, serta proses refund dari admin. Pembatasan laju saat ini berada di memori proses; gunakan pembatasan di proxy tepercaya atau penyimpanan bersama sebelum deployment multi-instance.

Pengujian tanpa menjalankan server:

```powershell
npm run test:commerce
npm run typecheck
npm run build
```

Delapan pengujian mencakup keberadaan delapan foto asli dan logo, data keranjang rusak, harga tidak tersedia, penghapusan produk setelah pembayaran yang tidak berulang, validasi checkout, status fraud, notifikasi terlambat, dan tanda tangan webhook palsu. Transaksi Midtrans dan penyimpanan PostgreSQL belum diuji tanpa konfigurasi layanan. Server lokal tetap dimatikan atas permintaan pengguna.

## Menjalankan lokal

### Membagikan preview lewat GitHub dan Vercel

Repository proyek: `Benny29281/Project-Website-IPT-`. Untuk membagikan website yang bisa dibuka teman melalui tautan, gunakan deployment Next.js di Vercel yang terhubung ke repository tersebut. GitHub menyimpan source code; GitHub Pages hanya menyediakan hosting statis dan tidak menjalankan backend Next.js pada versi proyek ini.

1. Commit dan push perubahan proyek ke repository GitHub. `.env`, `node_modules`, `.next`, dan konfigurasi akun `.vercel` tidak perlu diunggah.
2. Login ke [Vercel](https://vercel.com/new), pilih import repository GitHub, lalu pilih `Project-Website-IPT-`.
3. Gunakan framework **Next.js** dan direktori root proyek. Build command: `npm run build`. Gunakan runtime Node yang memenuhi kebutuhan Payload (Node >=22.23.4 atau >=24.22.1).
4. Untuk preview tampilan, database dan Midtrans belum perlu diaktifkan. Katalog, slideshow, dan keranjang dapat ditinjau; pembayaran tetap tidak tersedia sampai konfigurasi lengkap. Panel admin dan penyimpanan formulir memerlukan PostgreSQL.
5. Deploy, lalu atur `NEXT_PUBLIC_SITE_URL` ke URL deployment dan deploy ulang agar canonical URL, sitemap, dan callback memakai domain yang benar.
6. Bagikan URL deployment kepada teman. Pastikan pengaturan akses deployment mengizinkan teman membuka tautan; jangan menganggap link preview otomatis dapat diakses tanpa login.

Panduan resmi: [Deploy Git repositories on Vercel](https://vercel.com/docs/git), [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs). File kode dan konfigurasi lokal sudah disiapkan; publikasi tetap memerlukan akses akun GitHub/Vercel. Server lokal tidak perlu dinyalakan agar deployment yang sudah berhasil dapat diakses.

```powershell
npm install
npm run dev
```

Buka http://localhost:3000/id atau http://localhost:3000/en. Proyek menyertakan runtime Node lokal melalui dependensi pengembangan karena Node sistem yang tersedia masih versi 20.11.1. Untuk produksi gunakan Node >=22.23.4 (atau >=24.22.1) sesuai kebutuhan Payload.

```powershell
npm run typecheck
npm run build
npm start
```

## Struktur

```text
src/
  app/
    (frontend)/[locale]/       Beranda ID/EN dan layout publik
      [...slug]/              Tentang, katalog/detail, layanan/detail,
                              artikel/detail, kontak, karier, privasi, syarat
    (payload)/admin/           Panel admin Payload
    (payload)/api/             REST API Payload
    api/quote/                Validasi dan penyimpanan permintaan
    globals.css               Identitas visual dan tata letak responsif
    sitemap.ts, robots.ts     SEO dasar
  components/                 Navigasi, footer, katalog, formulir
  lib/content.ts              Konten contoh dwibahasa dan gambar
  payload.config.ts           Koleksi, akses, lokalisasi, PostgreSQL
  proxy.ts                    Bahasa dokumen sesuai URL
```

## CMS dan formulir

1. Salin `.env.example` menjadi `.env`.
2. Buat database PostgreSQL dan isi `DATABASE_URI` serta `PAYLOAD_SECRET` acak (minimal 32 karakter).
3. Jalankan `npm run payload -- generate:importmap` bila mengubah komponen editor.
4. Jalankan aplikasi, lalu buka `/admin` untuk membuat pengguna pertama. Pengguna pertama otomatis diberi peran `admin`; pengguna berikutnya default `editor`.
5. Koleksi tersedia: users, media, categories, products, pages, articles, careers, inquiries, orders. Pengaturan kontak tersedia di global `site-settings`. Payload menyediakan ekspor CSV dari koleksi inquiries.

Formulir memvalidasi input di klien dan server, memeriksa origin, membatasi ukuran input, dan memakai honeypot. Data disimpan ke koleksi inquiries hanya jika database dan secret tersedia. Tanpa konfigurasi, server mengembalikan 503 dan antarmuka menjelaskan bahwa permintaan belum terkirim. Tidak ada konfirmasi sukses palsu.

## Status implementasi

- Siap ditinjau: tampilan responsif, menu seluler, halaman ID/EN, filter dan pencarian produk, detail produk, produk terpilih pada formulir, layanan, contoh artikel, halaman informasi, sitemap, robots, metadata dan hreflang.
- CMS: konfigurasi dan rute admin/API tersedia; membutuhkan PostgreSQL. Konten tampilan publik saat ini berasal dari `src/lib/content.ts`, belum membaca hasil edit CMS.
- Sebelum produksi: hubungkan pembacaan konten CMS, integrasi email, pembatasan laju terdistribusi/Turnstile, analitik, pencadangan, deployment, serta QA aksesibilitas dan performa.
- Isi data perusahaan resmi, katalog asli, dokumen legalitas yang boleh dipublikasikan, foto, alamat dan peta. Tidak ada klaim pengalaman, jumlah pelanggan, sertifikasi, testimoni, atau statistik perusahaan yang dibuat-buat.
- Gambar hero stok Unsplash, artikel contoh, rancangan visi/misi, dan draf kebijakan masih perlu ditinjau sebelum peluncuran. Foto produk dan logo memakai lampiran asli dari pengguna.
- Kontak mengambang membuka formulir selama `NEXT_PUBLIC_WHATSAPP` belum diisi. Setelah nomor resmi diisi (format kode negara tanpa tanda tambah), tombol membuka WhatsApp. Isi `NEXT_PUBLIC_CONTACT_EMAIL` untuk menampilkan email resmi.

PRD tetap menjadi acuan; implementasi ini berfokus pada struktur dan tampilan, belum memenuhi seluruh kriteria rilis produksi pada PRD.

## Catatan dependensi

Dependensi utama sudah diperbarui dan patch transitif DOMPurify/Happy DOM diterapkan. Audit terakhir masih melaporkan temuan tingkat rendah/sedang pada dependensi Payload/Drizzle; perlu ditinjau kembali sebelum produksi. Tidak ada temuan tinggi/kritis pada pemeriksaan terakhir.

## Verifikasi

Versi awal lolos 17 pemeriksaan HTTP dan pemeriksaan browser pada lebar 360 px serta 1440 px. Skrip `npm run test:smoke` telah disesuaikan ke produk Instax. Setelah pembaruan desain, server dihentikan atas permintaan pengguna; pemeriksaan browser dan HTTP belum diulang. Pemeriksaan TypeScript dan build dapat dilakukan tanpa menjalankan server. Penyimpanan PostgreSQL, login admin, dan pengiriman email belum diuji karena layanan belum dikonfigurasi.
