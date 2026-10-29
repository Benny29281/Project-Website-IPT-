import {ArrowUpRight,MapPin,Phone,Mail} from 'lucide-react';
import {notFound} from 'next/navigation';
import {isSiteLocale,languageAlternates,type SiteLocale} from '@/lib/locales';
import {landingCopy} from '@/lib/landing-content';
import {companyInfo} from '@/lib/company-info';
import {CompanyHomeIntro} from '@/components/company-home-intro';
import {LandingContactForm} from '@/components/landing-contact-form';
import {MarketReach} from '@/components/market-reach';

export async function generateMetadata({params}: {params:Promise<{locale:SiteLocale}>}) {
  const {locale}=await params;if (!isSiteLocale(locale)) notFound();const t=landingCopy[locale];
  const base=process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';const title=`Indonesia Pacific Trade | ${t.business}`;const image=`${base}/images/company/cargo-barge.jpg`;
  return {title:{absolute:title},description:t.heroText,alternates:{canonical:`${base}/${locale}`,languages:languageAlternates(base)},openGraph:{title,description:t.heroText,locale:{id:'id_ID',en:'en_US',zh:'zh_CN',ko:'ko_KR'}[locale],type:'website' as const,images:[image]},twitter:{card:'summary_large_image' as const,title,description:t.heroText,images:[image]}};
}
export default async function Home({params}: {params:Promise<{locale:SiteLocale}>}) {
  const {locale}=await params;if (!isSiteLocale(locale)) notFound();const t=landingCopy[locale];const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL||companyInfo.email;
  const schema={'@context':'https://schema.org','@type':'Organization',name:companyInfo.name,url:`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${locale}`,logo:`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/brand/logo.png`,telephone:'+628211888596',address:{'@type':'PostalAddress',streetAddress:'Landmark Pluit Tower E18 No.RT.5, RT.8/RW.10, Pluit, Penjaringan',addressLocality:'Jakarta Utara',addressRegion:'DKI Jakarta',postalCode:'14450',addressCountry:'ID'},sameAs:[companyInfo.mapsUrl]};
  return <main id="main" className="company-landing">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <CompanyHomeIntro locale={locale}/>
    <section id="market-reach" className="landing-section"><MarketReach locale={locale}/></section>
    <section id="our-location" className="landing-section landing-location"><div className="container landing-location-grid"><div><p className="eyebrow">{t.locationTag}</p><p className="landing-section-name">{t.location}</p><h2>{t.locationTitle}</h2><p className="landing-location-text">{t.locationText}</p><div className="landing-address"><MapPin size={22}/><div><h3>{t.address}</h3><address>{companyInfo.address}</address></div></div><a href={companyInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="button">{t.directions}<ArrowUpRight size={17}/></a></div><div className="landing-map"><iframe src={companyInfo.mapsEmbed} title={t.mapTitle} width="600" height="450" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div></div></section>
    <section id="contact-us" className="landing-section"><div className="container landing-contact-grid"><div><p className="eyebrow">{t.contactTag}</p><p className="landing-section-name">{t.contact}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="landing-contact-detail" href={companyInfo.phoneHref}><Phone size={21}/><span><small>{t.phone}</small><strong>{companyInfo.phone}</strong></span><ArrowUpRight size={18}/></a>{email && <a className="landing-contact-detail" href={`mailto:${email}`}><Mail size={21}/><span><small>{t.email}</small><strong>{email}</strong></span><ArrowUpRight size={18}/></a>}</div><LandingContactForm locale={locale}/></div></section>
  </main>;
}
