import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {companyHomeCopy,businessImages} from '@/lib/company-home-content';
import {businessSectors} from '@/lib/corporate-content';
import {landingCopy} from '@/lib/landing-content';
import type {SiteLocale} from '@/lib/locales';
import {CompanyHero} from './company-hero';

export function CompanyHomeIntro({locale}:{locale:SiteLocale}) {
  const t=companyHomeCopy[locale];const landing=landingCopy[locale];
  return <>
    <CompanyHero locale={locale}/>
    <section id="about-us" className="company-home-about"><div className="container"><div className="company-section-heading"><span>01 /</span><h2>{t.aboutHeading}</h2></div>
      <div className="company-about-row"><div className="company-about-copy"><p className="eyebrow">INDONESIA PACIFIC TRADE</p><h3>{t.aboutTitle}</h3><p>{landing.aboutText}</p><Link className="company-learn-link" href={`/${locale}/about`}>{landing.profile}<ArrowRight size={18}/></Link></div><div className="company-about-photo"><Image src="/images/company/business-team.jpg" alt={t.photoNote} width={1100} height={735} sizes="(max-width: 700px) 100vw, 50vw"/></div></div>
      <div className="company-about-row company-about-row-reverse"><div className="company-about-photo"><Image src="/images/company/warehouse.jpg" alt={t.photoNote} width={1100} height={735} sizes="(max-width: 700px) 100vw, 50vw"/><span>{t.network}</span></div><div className="company-about-copy"><p className="eyebrow">PT INDONESIA PACIFIC TRADE</p><h3>{t.companyTitle}</h3><p>{landing.aboutText2}</p><Link className="company-learn-link" href={`/${locale}/about`}>{t.learn}<ArrowRight size={18}/></Link></div></div>
    </div></section>
    <section id="our-business" className="company-home-business"><div className="container"><div className="company-section-heading"><span>02 /</span><h2>{t.business}</h2></div><p className="company-business-intro">{t.businessText}</p><div className="company-business-grid">{businessSectors.map((sector,i)=><Link key={sector.slug} href={`/${locale}/business/${sector.slug}`} className="company-business-card"><div className="company-business-photo"><Image src={businessImages[i]} alt={sector.title[locale]} width={1100} height={735} sizes="(max-width: 700px) 100vw, 50vw"/><span>0{i+1}</span></div><div className="company-business-copy"><h3>{sector.title[locale]}</h3><p>{t.sectorDescriptions[i]}</p><span className="company-learn-link">{t.learn}<ArrowRight size={18}/></span></div></Link>)}</div></div></section>
  </>;
}
