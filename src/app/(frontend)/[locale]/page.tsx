import Link from 'next/link';
import {ArrowRight, ArrowUpRight, Film, Camera, ScanLine, Cpu} from 'lucide-react';
import {type Locale} from '@/lib/content';
import {brandCopy, productCategories} from '@/lib/brand-content';
import {ProductCards} from '@/components/catalog';
import {HomeSlideshow} from '@/components/home-slideshow';

export async function generateMetadata({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const title = 'Indonesia Pacific Trade | Consumer Imaging & Photography';
  const description = locale === 'id' ? 'Jelajahi kamera Instax, film instan, Fujifilm QuickSnap, dan graphic card. Pilih produk, masukkan ke keranjang, dan lanjutkan ke checkout.' : 'Explore Instax cameras, instant film, Fujifilm QuickSnap, and graphics cards. Choose your products, add them to your cart, and continue to checkout.';
  const image = `${base}/banners/instax-sq40.jpg`;
  return {title: {absolute: title}, description, alternates: {canonical: `${base}/${locale}`, languages: {id: `${base}/id`, en: `${base}/en`}}, openGraph: {title, description, locale: locale === 'id' ? 'id_ID' : 'en_US', type: 'website' as const, images: [image]}, twitter: {card: 'summary_large_image' as const, title, description, images: [image]}};
}
const categoryIcons = [Film, Camera, ScanLine, Cpu];
export default async function Home({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params; const t = brandCopy[locale];
  return <main id="main" className="brand-home">
    <h1 className="sr-only">{locale === 'id' ? 'Indonesia Pacific Trade — Kamera, Film Instan & Graphic Card' : 'Indonesia Pacific Trade — Cameras, Instant Film & Graphics Cards'}</h1>
    <HomeSlideshow locale={locale}/>
    <section className="core-section"><div className="container"><div className="center-heading"><h2>{t.core}</h2><p>{t.coreSub}</p></div><div className="category-grid">{productCategories.map((category,i) => {const Icon = categoryIcons[i];return <Link href={`/${locale}/products?category=${category.slug}`} className="category-card" key={category.slug}><span className="category-icon"><Icon size={57} strokeWidth={1.15}/></span><h3>{category.label[locale]}</h3><ArrowUpRight size={17}/></Link>})}</div></div></section>
    <section className="container featured-section store-products"><div className="section-heading"><div><h2>{t.featured}</h2><p>{t.featuredSub}</p></div><Link href={`/${locale}/products`} className="text-link">{t.all}<ArrowRight size={17}/></Link></div><ProductCards locale={locale}/></section>
  </main>;
}
