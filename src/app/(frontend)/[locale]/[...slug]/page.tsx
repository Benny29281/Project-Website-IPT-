import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowUpRight, ArrowLeft, Ship, Globe2, PackageSearch} from 'lucide-react';
import {images, articles} from '@/lib/content';
import {copy,products,brandCopy,detailCopy,detailTitles} from '@/lib/detail-content';
import {baseLocale,languageAlternates,type SiteLocale as Locale} from '@/lib/locales';
import {Catalog, ProductCards} from '@/components/catalog';
import {QuoteForm} from '@/components/quote-form';
import {ProductImage} from '@/components/product-image';
import {AddToCartButton, ProductPrice} from '@/components/cart-provider';
import {ProductDescription} from '@/components/product-description';
import {CompanyProfile} from '@/components/company-profile';
import {companyInfo} from '@/lib/company-info';
type Props = {params: Promise<{locale: Locale; slug: string[]}>; searchParams: Promise<{product?: string; q?: string; category?: string}>};
const titles: Record<string, [string, string]> = {about: ['Tentang Kami', 'About Us'], products: ['Produk Indonesia', 'Indonesian Products'], services: ['Layanan Perdagangan', 'Trade Services'], news: ['Berita & Artikel', 'News & Insights'], contact: ['Hubungi Kami', 'Contact Us'], careers: ['Karier', 'Careers'], privacy: ['Kebijakan Privasi', 'Privacy Policy'], terms: ['Syarat & Ketentuan', 'Terms & Conditions']};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale, slug} = await params;
  const title = products.find(p => p.slug === slug[1])?.name[locale] || articles.find(a => a.slug === slug[1])?.title[baseLocale(locale)] || detailTitles[locale][slug[0] as 'about'|'products'] || titles[slug[0]]?.[locale === 'id' ? 0 : 1] || '404';
  const path = slug.join('/'); const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return {title, description: slug[0] === 'about' ? brandCopy[locale].profile : undefined, alternates: {canonical: `${base}/${locale}/${path}`, languages: ['about','products'].includes(slug[0]) ? languageAlternates(base,`/${path}`) : {id: `${base}/id/${path}`, en: `${base}/en/${path}`} }};
}
export default async function ContentPage({params, searchParams}: Props) {
  const {locale, slug} = await params; const t = copy[locale]; const en = locale === 'en'; const page = slug[0];
  if (!titles[page] || slug.length > 2 || (slug.length > 1 && !['products','services','news'].includes(page))) notFound();
  const title = detailTitles[locale][page as 'about'|'products'] || titles[page][en ? 1 : 0];
  const intro = (heading: string, sub: string, tag = title) => <section className="page-intro"><div className="container"><div className="breadcrumbs"><Link href={`/${locale}`}>{t.nav[0]}</Link><span>/</span><span>{title}</span></div><p className="eyebrow">{tag}</p><h1>{heading}</h1><p>{sub}</p></div></section>;
  let content;
  if (page === 'products' && slug[1]) {
    const p = products.find(p => p.slug === slug[1]); if (!p) notFound();
    content = <>
      <section className="section"><div className="container">
        <Link className="text-link back-link" href={`/${locale}/products`}><ArrowLeft size={16}/>{t.back}</Link>
        <div className="product-detail">
          <ProductImage locale={locale} className="detail-photo" src={p.image} alt={p.name[locale]} priority/>
          <div>
            <p className="eyebrow">{p.categoryName[locale]}</p><h1>{p.name[locale]}</h1><p>{p.description[locale]}</p>
            <ProductPrice slug={p.slug} locale={locale}/>
            <dl className="specs">{t.specs.map((name, i) => <div key={name}><dt>{name}</dt><dd>{t.specValues[i]}</dd></div>)}</dl>
            <div className="product-purchase"><AddToCartButton slug={p.slug} locale={locale}/><Link className="text-link" href={`/${locale}#contact-us`}>{t.quote}<ArrowUpRight size={17}/></Link></div>
            <p className="content-note">{t.sample}</p>
          </div>
        </div>
        <ProductDescription slug={p.slug} locale={locale}/>
      </div></section>
      <section className="section products-section"><div className="container"><h2>{detailCopy[locale].more}</h2><ProductCards locale={locale}/></div></section>
    </>;
  } else if (page === 'products') {
    const {q = '', category = 'all'} = await searchParams;
    content = <>{intro(t.productsTitle, t.productsText, t.productsTag)}<section className="section"><div className="container"><Catalog key={`${q}:${category}`} locale={locale} initialQuery={q} initialCategory={category}/></div></section></>;
  } else if (page === 'contact') {
    const {product} = await searchParams;
    content = <>{intro(t.contactTitle, t.contactText, en ? 'LET’S WORK TOGETHER' : 'MARI BEKERJA SAMA')}<section className="section"><div className="container contact-grid"><aside><h2>{en ? 'An opportunity to connect.' : 'Sebuah peluang untuk terhubung.'}</h2><p>{en ? 'For buyers, suppliers, and future business partners.' : 'Untuk pembeli, pemasok, dan calon mitra bisnis.'}</p><div className="contact-info"><Globe2 size={24}/><h3>{companyInfo.name}</h3><p>{companyInfo.address}</p><p><a href={companyInfo.phoneHref}>{companyInfo.phone}</a></p><a className="text-link" href={companyInfo.mapsUrl} target="_blank" rel="noopener noreferrer">{en ? 'Open in Google Maps' : 'Buka di Google Maps'}<ArrowUpRight size={15}/></a>{process.env.NEXT_PUBLIC_CONTACT_EMAIL && <p><a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a></p>}</div><p className="content-note">{en ? 'Contact our team before visiting to arrange a meeting.' : 'Hubungi tim kami sebelum berkunjung untuk mengatur pertemuan.'}</p></aside><QuoteForm locale={baseLocale(locale)} product={product}/></div></section></>;
  } else if (page === 'about') {
    content = <CompanyProfile locale={locale}/>;
  } else if (page === 'services') {
    const index = slug[1] ? ['export','import','sourcing'].indexOf(slug[1]) : -1; if (slug[1] && index === -1) notFound();
    content = <>{intro(index >= 0 ? t.services[index] : t.serviceTitle, index >= 0 ? t.serviceDesc[index] : t.serviceText, t.serviceTag)}<section className="section"><div className="container"><div className="service-cards">{t.services.map((name,i) => {const Icon = [Ship, Globe2, PackageSearch][i];return <Link key={name} className="service-tile" href={`/${locale}/services/${['export','import','sourcing'][i]}`}><Icon size={35} strokeWidth={1.4}/><span>0{i+1}</span><h2>{name}</h2><p>{t.serviceDesc[i]}</p><ArrowUpRight size={22}/></Link>})}</div><div className="process"><p className="eyebrow">{en ? 'HOW WE WORK' : 'ALUR KERJA'}</p><h2>{en ? 'A clear path forward.' : 'Langkah yang jelas, dari awal.'}</h2><div className="process-grid">{(en ? ['Discuss your needs','Source & confirm','Agree on a proposal','Coordinate delivery'] : ['Diskusi kebutuhan','Pencarian & konfirmasi','Kesepakatan penawaran','Koordinasi pengiriman']).map((step,i) => <div key={step}><span>0{i+1}</span><h3>{step}</h3></div>)}</div></div></div></section></>;
  } else if (page === 'news') {
    const article = articles.find(a => a.slug === slug[1]); if (slug[1] && !article) notFound();
    content = article ? <>{intro(article.title[baseLocale(locale)], en ? 'Illustrative editorial content · 4 min read' : 'Contoh konten editorial · 4 menit baca', article.category[baseLocale(locale)])}<article className="container article-body"><img src={article.image} alt={article.title[baseLocale(locale)]}/><p className="content-note">{en ? 'Sample article for layout review. Requires editorial approval before publication.' : 'Artikel contoh untuk meninjau tampilan. Memerlukan persetujuan editorial sebelum publikasi.'}</p><h2>{en ? 'Understanding the opportunity' : 'Memahami peluang'}</h2><p>{en ? 'Indonesia offers diverse agricultural and plantation products. For prospective trading partners, understanding product characteristics and business needs is a useful first step before discussing a supply agreement.' : 'Indonesia memiliki ragam hasil pertanian dan perkebunan. Bagi calon mitra perdagangan, memahami karakteristik produk dan kebutuhan bisnis menjadi langkah awal sebelum membahas kesepakatan pasokan.'}</p><h2>{en ? 'Start with the right questions' : 'Mulai dari pertanyaan yang tepat'}</h2><p>{en ? 'Discuss specifications, volume, packaging, and destination with your supplier. Confirm documentation and delivery terms before making commitments. Our team can help explore your requirements through a tailored conversation.' : 'Diskusikan spesifikasi, volume, kemasan, dan tujuan pengiriman dengan calon pemasok. Konfirmasikan dokumen dan ketentuan pengiriman sebelum membuat komitmen. Tim kami dapat membantu mengeksplorasi kebutuhan melalui diskusi yang terarah.'}</p><Link className="button" href={`/${locale}/contact`}>{t.nav[5]}<ArrowUpRight size={17}/></Link></article></> : <>{intro(t.newsTitle, en ? 'Ideas, perspectives, and a closer look at trade.' : 'Ide, perspektif, dan cerita seputar dunia perdagangan.', t.newsTag)}<section className="section"><div className="container news-grid">{articles.map(a => <Link key={a.slug} className="news-card" href={`/${locale}/news/${a.slug}`}><div className="news-image"><img src={a.image} alt={a.title[baseLocale(locale)]}/></div><p className="news-meta">{a.category[baseLocale(locale)]}</p><h2>{a.title[baseLocale(locale)]}</h2><p className="content-note">{en ? 'Sample article' : 'Artikel contoh'}</p></Link>)}</div></section></>;
  } else if (page === 'careers') {
    content = <>{intro(en ? 'Grow with us.' : 'Bertumbuh bersama kami.', en ? 'Explore your next chapter with Indonesia Pacific Trade.' : 'Jelajahi langkah karier Anda bersama Indonesia Pacific Trade.')}<section className="section"><div className="container narrow"><h2>{en ? 'Career updates' : 'Informasi karier'}</h2><p>{en ? 'No verified vacancies are published at this time. Visit this page for future announcements.' : 'Belum ada lowongan terverifikasi yang dipublikasikan. Kunjungi halaman ini untuk informasi selanjutnya.'}</p><Link className="text-link" href={`/${locale}/contact`}>{t.nav[5]}<ArrowUpRight size={17}/></Link></div></section></>;
  } else {
    content = <>{intro(title, en ? 'Draft for company review — not a final legal document.' : 'Draf untuk ditinjau perusahaan — bukan dokumen hukum final.')}<section className="section"><div className="container narrow"><h2>{page === 'privacy' ? (en ? 'Use of inquiry data' : 'Penggunaan data permintaan') : (en ? 'Website information' : 'Informasi website')}</h2><p>{page === 'privacy' ? (en ? 'The inquiry form requests contact details and business requirements to respond to your inquiry. Do not submit confidential or sensitive information. Company-approved retention periods, data controller contact details, and data rights procedures must be added before launch.' : 'Formulir meminta informasi kontak dan kebutuhan bisnis untuk menanggapi permintaan Anda. Hindari mengirim data rahasia atau sensitif. Periode penyimpanan, kontak pengendali data, dan prosedur pemenuhan hak pemilik data perlu dilengkapi sebelum peluncuran.') : (en ? 'Products and articles in this preview are illustrative. Specifications, availability, pricing, and delivery terms must be confirmed in a written agreement. Company-approved terms must be added before launch.' : 'Produk dan artikel pada pratinjau ini bersifat ilustratif. Spesifikasi, ketersediaan, harga, dan ketentuan pengiriman harus dikonfirmasi dalam kesepakatan tertulis. Ketentuan yang disetujui perusahaan perlu dilengkapi sebelum peluncuran.')}</p><Link className="text-link" href={`/${locale}/contact`}>{t.nav[5]}<ArrowUpRight size={17}/></Link></div></section></>;
  }
  return <main id="main">{content}</main>;
}

