import Link from 'next/link';
import {ArrowUpRight,Film,Camera,ScanLine,Cpu} from 'lucide-react';
import {images} from '@/lib/content';
import {copy,brandCopy,productCategories,detailCopy} from '@/lib/detail-content';
import type {SiteLocale as Locale} from '@/lib/locales';
import {PacificMap} from './pacific-map';

const categoryIcons = [Film,Camera,ScanLine,Cpu];
export function CompanyProfile({locale}: {locale: Locale}) {
  const t=brandCopy[locale];
  return <div className="company-profile">
    <section className="reference-hero"><div className="hero-copy"><p>Indonesia Pacific Trade</p><h1>{t.hero}</h1><Link className="button" href="#company-profile">{t.discover}<ArrowUpRight size={16}/></Link></div><div className="hero-photo"><img src={images.workspace} alt={detailCopy[locale].photo} fetchPriority="high"/></div></section>
    <section className="container profile-section" id="company-profile"><div><h2>{t.who}</h2><p className="section-subtitle">{t.whoTitle}</p></div><div><p>{t.profile}</p><Link href={`/${locale}#contact-us`} className="text-link">{detailCopy[locale].contact}<ArrowUpRight size={16}/></Link></div></section>
    <section className="container workflow-section"><div className="center-heading"><h2>{t.how}</h2><p className="section-subtitle">{t.howTitle}</p><p>{t.howText}</p></div><div className="workflow-grid">{t.steps.map((step,i) => <div className="workflow-step" key={step}><h3><span>0{i+1}</span> {step}</h3><p>{t.descriptions[i]}</p></div>)}</div></section>
    <section className="core-section"><div className="container"><div className="center-heading"><h2>{t.core}</h2><p>{t.coreSub}</p></div><div className="category-grid">{productCategories.map((category,i) => {const Icon = categoryIcons[i];return <Link href={`/${locale}/products?category=${category.slug}`} className="category-card" key={category.slug}><span className="category-icon"><Icon size={57} strokeWidth={1.15}/></span><h3>{category.label[locale]}</h3><ArrowUpRight size={17}/></Link>})}</div></div></section>
    <section className="container market-section"><div><h2>{t.market}</h2><p className="section-subtitle">{t.marketTitle}</p><p>{t.marketText}</p><div className="market-tags"><span>{detailCopy[locale].china}</span><span>{detailCopy[locale].korea}</span><span>{detailCopy[locale].hongkong}</span></div><Link className="text-link" href={`/${locale}#contact-us`}>{copy[locale].quote}<ArrowUpRight size={17}/></Link></div><PacificMap locale={locale}/></section>
  </div>;
}
