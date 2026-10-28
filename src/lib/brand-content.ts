import type {Locale} from './content';
export const brandCopy = {
  id: {
    nav: ['Beranda', 'Profil', 'Produk', 'Kontak'],
    hero: 'Menghubungkan Produk\nBerkualitas Indonesia\ndengan Pasar Internasional',
    discover: 'Kenali Kami', who: 'Tentang Kami', whoTitle: 'Memberdayakan Perdagangan Global\ndari Indonesia',
    profile: 'PT Indonesia Pacific Trade adalah perusahaan perdagangan dan ekspor berbasis di Indonesia, yang menghubungkan produk Indonesia berkualitas dengan permintaan global. Kami berfokus pada sourcing dan distribusi produk fotografi konsumen, termasuk film dan kertas Instax, kamera Fujifilm Instax, serta kamera Polaroid. Dengan fokus operasional dan pasar seperti Tiongkok, Korea Selatan, dan Hong Kong, kami membangun kemitraan yang andal, saling menguntungkan, dan berjangka panjang.',
    how: 'Cara Kami Bekerja', howTitle: 'Solusi Perdagangan Lintas Batas yang Terintegrasi', howText: 'Kami mengelola proses perdagangan untuk mendukung rantai pasok yang lancar dari awal hingga akhir.',
    steps: ['Sourcing', 'Verifikasi', 'Eksekusi', 'Ekspor'],
    descriptions: ['Mengidentifikasi dan mencari produk berkualitas melalui jaringan pemasok Indonesia yang terpercaya.', 'Mengoordinasikan spesifikasi produk, ketersediaan, dan kebutuhan komersial untuk menjaga konsistensi.', 'Mengelola pembelian dan transaksi perdagangan lintas batas dengan transparansi dan efisiensi.', 'Menangani persiapan ekspor dan mengoordinasikan pengiriman menuju pasar internasional.'],
    core: 'Produk Utama', coreSub: 'Solusi Fotografi & Consumer Imaging', featured: 'Pilihan Produk', featuredSub: 'Jelajahi kamera dan film instan untuk kebutuhan bisnis Anda.', all: 'Lihat Semua Produk',
    market: 'Jangkauan Pasar', marketTitle: 'Membangun Koneksi Perdagangan\ndi Kawasan Pasifik', marketText: 'Berbasis di Indonesia sebagai pusat sourcing dan ekspor, kami menjangkau pasar konsumen Asia yang dinamis.',
    category: 'Kategori Produk', info: 'Informasi', help: 'Bantuan', trade: 'Perdagangan', shipping: 'Pengiriman', service: 'Layanan', hours: 'Jam Kerja', days: 'Senin – Jumat',
    quote: 'Permintaan Penawaran', faq: 'Alur Pemesanan', supply: 'Kemitraan Pemasok', shippingText: 'Darat · Laut · Udara', photoPending: 'Foto produk belum tersedia', logoPending: 'Logo versi vektor sementara',
    film: 'Film Instan', camera: 'Kamera Instax', quicksnap: 'QuickSnap', graphic: 'Graphic Card',
  },
  en: {
    nav: ['Home', 'Profile', 'Store', 'Contact'],
    hero: 'Connecting Indonesian\nQuality Products to\nInternational Markets',
    discover: 'Discover More', who: 'Who We Are', whoTitle: 'Empowering Global Trade\nfrom Indonesia',
    profile: 'PT Indonesia Pacific Trade is an Indonesia-based trading and export company dedicated to connecting quality Indonesian products with global demand. We specialize in sourcing and distributing consumer imaging products, including Instax film and paper, Fujifilm Instax cameras, and Polaroid cameras. With a strong operational focus on key markets such as China, South Korea, and Hong Kong, we strive to establish long-term, reliable, and mutually beneficial business partnerships.',
    how: 'How We Work', howTitle: 'Seamless Cross-Border Commercial Solutions', howText: 'We manage the entire trade process to support smooth end-to-end supply chain execution.',
    steps: ['Sourcing', 'Verification', 'Execution', 'Exports'],
    descriptions: ['Identifying and procuring high-quality products from trusted Indonesian supply channels.', 'Coordinating exact product specifications, availability, and commercial requirements to ensure consistency.', 'Managing purchasing and cross-border commercial transactions with full transparency and efficiency.', 'Handling export preparations and coordinating reliable delivery directly to overseas destination markets.'],
    core: 'Core Products', coreSub: 'Consumer Imaging & Photography Solutions', featured: 'Selected Products', featuredSub: 'Explore instant cameras and film for your business.', all: 'View All Products',
    market: 'Market Reach', marketTitle: 'Building Trade Connections\nAcross the Pacific Region', marketText: 'Headquartered in Indonesia as our primary sourcing and export base, we strategically serve dynamic Asian consumer markets.',
    category: 'Shop by Category', info: 'Information', help: 'Help', trade: 'Trade Enquiries', shipping: 'Shipping', service: 'Service', hours: 'Working Hours & Days', days: 'Monday – Friday',
    quote: 'Request a Quote', faq: 'How to Order', supply: 'Supplier Partnerships', shippingText: 'Land · Ocean · Air', photoPending: 'Product photo coming soon', logoPending: 'Temporary vector logo',
    film: 'Instant Film', camera: 'Instax Camera', quicksnap: 'QuickSnap', graphic: 'Graphic Card',
  },
} satisfies Record<Locale, object>;
export const productCategories = [
  {slug:'instant-film', label: {id:'Film Instan',en:'Instant Film'}},
  {slug:'instax-camera', label: {id:'Kamera Instax',en:'Instax Camera'}},
  {slug:'quicksnap', label: {id:'QuickSnap',en:'QuickSnap'}},
  {slug:'graphic-card', label: {id:'Graphic Card',en:'Graphic Card'}},
];
