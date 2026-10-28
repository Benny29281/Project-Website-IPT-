'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {ArrowUpRight, ArrowRight, Menu, X, Globe2, Search, Mail, MoveUpRight} from 'lucide-react';
import {copy, type Locale} from '@/lib/content';
import {brandCopy, productCategories} from '@/lib/brand-content';
import {CartLink} from './cart-provider';

export function Brand({light = false}: {light?: boolean}) {
  const [source, setSource] = useState('/brand/logo.png');
  return <span className={`brand ${light ? 'brand-light' : ''}`}><img src={source} onError={() => {if (source !== '/brand/logo.svg') setSource('/brand/logo.svg')}} alt="Indonesia Pacific Trade" width={288} height={103}/></span>;
}

export function Header({locale}: {locale: Locale}) {
  const t = brandCopy[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const other = locale === 'id' ? 'en' : 'id';
  const paths = ['', '/about', '/products', '/contact'];
  return <header className="header"><div className="container header-inner">
    <Link href={`/${locale}`} aria-label="Indonesia Pacific Trade"><Brand light/></Link>
    <nav className={open ? 'nav nav-open' : 'nav'} aria-label={locale === 'id' ? 'Navigasi utama' : 'Main navigation'}>
      {t.nav.map((name, i) => <Link onClick={() => setOpen(false)} className={(i === 0 ? pathname === `/${locale}` : pathname.startsWith(`/${locale}${paths[i]}`)) ? 'active' : ''} key={name} href={`/${locale}${paths[i]}`}>{name}</Link>)}
    </nav>
    <div className="header-actions">
      <form className="header-search" action={`/${locale}/products`} role="search"><input name="q" type="search" aria-label={copy[locale].search} placeholder={locale === 'id' ? 'CARI PRODUK…' : 'SEARCH PRODUCT…'}/><button aria-label={locale === 'id' ? 'Cari' : 'Search'}><Search size={17}/></button></form>
      <Link className="language" href={pathname.replace(`/${locale}`, `/${other}`)} aria-label={locale === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}><Globe2 size={19}/><span>{locale.toUpperCase()}</span></Link>
      <Link className="header-contact" href={`/${locale}/contact`} aria-label={t.nav[3]}><Mail size={21}/></Link>
      <CartLink locale={locale}/>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-navigation">{open ? <X/> : <Menu/>}</button>
    </div>
  </div>{open && <nav id="mobile-navigation" className="mobile-navigation" aria-label={locale === 'id' ? 'Navigasi seluler' : 'Mobile navigation'}>{t.nav.map((name,i) => <Link key={name} href={`/${locale}${paths[i]}`} onClick={() => setOpen(false)}>{name}</Link>)}<form action={`/${locale}/products`} className="mobile-search" role="search"><input name="q" aria-label={copy[locale].search} placeholder={copy[locale].search}/><button aria-label={locale === 'id' ? 'Cari' : 'Search'}><Search size={18}/></button></form></nav>}</header>;
}

export function Footer({locale}: {locale: Locale}) {
  const t = brandCopy[locale]; const c = copy[locale];
  return <><footer className="footer"><div className="container">
    <div className="footer-links">
      <div><h3>{t.category}</h3>{productCategories.map(category => <Link key={category.slug} href={`/${locale}/products?category=${category.slug}`}>{category.label[locale]}</Link>)}</div>
      <div><h3>{t.info}</h3><Link href={`/${locale}/about`}>{locale === 'id' ? 'Profil Perusahaan' : 'Company Profile'}</Link><Link href={`/${locale}/privacy`}>{c.privacy}</Link><Link href={`/${locale}/products`}>{locale === 'id' ? 'Katalog Produk' : 'Product Catalog'}</Link><Link href={`/${locale}/news`}>{locale === 'id' ? 'Artikel' : 'Blogs'}</Link></div>
      <div><h3>{t.help}</h3><Link href={`/${locale}/services`}>{t.faq}</Link><Link href={`/${locale}/contact`}>{c.nav[5]}</Link><Link href={`/${locale}/terms`}>{c.terms}</Link></div>
      <div><h3>{t.trade}</h3><Link href={`/${locale}/contact?type=quote`}>{t.quote}</Link><Link href={`/${locale}/contact?type=supplier`}>{t.supply}</Link><Link href={`/${locale}/services`}>{locale === 'id' ? 'Layanan Ekspor' : 'Export Services'}</Link></div>
      <div><h3>{t.shipping}</h3><Link href={`/${locale}/services/sourcing`}>{locale === 'id' ? 'Darat' : 'Land'}</Link><Link href={`/${locale}/services/export`}>{locale === 'id' ? 'Laut' : 'Ocean'}</Link><Link href={`/${locale}/services/export`}>{locale === 'id' ? 'Udara' : 'Air'}</Link></div>
    </div>
    <div className="footer-social"><span>INDONESIA → ASIA PACIFIC</span><Link href={`/${locale}/contact`} aria-label={c.nav[5]}><Mail size={17}/></Link>{process.env.NEXT_PUBLIC_WHATSAPP && <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP.replace(/\D/g,'')}`} aria-label="WhatsApp"><MessageIcon/></a>}</div>
    <div className="footer-company"><Link href={`/${locale}`}><Brand/></Link><div><h3>PT INDONESIA PACIFIC TRADE</h3><p>{c.footerText}</p><p>{locale === 'id' ? 'Basis sourcing & ekspor: Indonesia' : 'Sourcing & export base: Indonesia'}</p>{process.env.NEXT_PUBLIC_CONTACT_EMAIL && <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>}</div><div><h3>{t.service}</h3><p>{t.hours}</p><Link className="text-link" href={`/${locale}/contact`}>{locale === 'id' ? 'Hubungi tim kami' : 'Contact our team'}<ArrowUpRight size={15}/></Link></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} PT Indonesia Pacific Trade. {c.rights}</span><span>{c.demo}</span></div>
  </div></footer><WhatsApp locale={locale}/></>;
}

function MessageIcon() {return <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z"/><path d="M8.2 7.8c-.5 3.7 2.3 6.6 6.1 7l1-1.6-2.3-1-1 1c-1.5-.6-2.3-1.4-2.8-2.9l.9-.9-1-2Z"/></svg>}
function WhatsApp({locale}: {locale: Locale}) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '');
  return <a className="floating-contact" href={number ? `https://wa.me/${number}` : `/${locale}/contact`} aria-label={number ? 'WhatsApp' : copy[locale].nav[5]}><MessageIcon/></a>;
}
export function SectionLink({href, children}: {href: string; children: React.ReactNode}) {return <Link href={href} className="text-link">{children}<ArrowUpRight size={17}/></Link>}
export {ArrowUpRight, ArrowRight, MoveUpRight};
