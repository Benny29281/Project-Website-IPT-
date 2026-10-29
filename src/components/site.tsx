'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useState} from 'react';
import {ArrowUpRight,ArrowRight,Menu,X,Globe2,Search,Mail,Phone,MapPin,MoveUpRight} from 'lucide-react';
import {baseLocale,localizedPath,languageNames,siteLocales,type SiteLocale} from '@/lib/locales';
import {landingCopy,landingSections} from '@/lib/landing-content';
import {companyInfo} from '@/lib/company-info';
import {businessSectors,corporateCopy,policyPaths} from '@/lib/corporate-content';
import {CartLink} from './cart-provider';
import {siteVisibility} from '@/lib/site-visibility';

export function Brand({light=false}: {light?:boolean}) {
  const [source,setSource]=useState('/brand/logo.png');
  return <span className={`brand ${light ? 'brand-light' : ''}`}><img src={source} onError={()=>{if (source!=='/brand/logo.svg') setSource('/brand/logo.svg')}} alt="Indonesia Pacific Trade" width={288} height={103}/></span>;
}
export function Header({locale}: {locale:SiteLocale}) {
  const t=landingCopy[locale];const contentLocale=locale;const pathname=usePathname();const router=useRouter();const [open,setOpen]=useState(false);
  function switchLanguage(next:string) {
    router.push(`${localizedPath(pathname,next)}${window.location.search}${window.location.hash}`);setOpen(false);
  }
  const links=t.nav.map((name,i)=>!siteVisibility.products && landingSections[i]==='products' ? null : <Link key={name} href={`/${locale}#${landingSections[i]}`} onClick={()=>setOpen(false)}>{name}</Link>);
  return <header className="header landing-header"><div className="container header-inner">
    <Link href={`/${locale}`} aria-label={companyInfo.name}><Brand light/></Link>
    <nav className="nav" aria-label={t.mainNav}>{links}</nav>
    <div className="header-actions">{siteVisibility.products && <form className="header-search" action={`/${contentLocale}/products`} role="search"><input name="q" type="search" aria-label={t.search} placeholder={t.search}/><button aria-label={t.searchButton}><Search size={17}/></button></form>}
      <label className="language language-picker"><Globe2 size={17}/><span className="sr-only">{t.language}</span><select aria-label={t.language} value={locale} onChange={e=>switchLanguage(e.target.value)}>{siteLocales.map(language=><option key={language} value={language}>{languageNames[language]}</option>)}</select></label>
      {siteVisibility.products && <CartLink locale={baseLocale(locale)} label={t.cart}/>}
      <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={t.menu} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X/> : <Menu/>}</button>
    </div>
  </div>{open && <nav className="mobile-navigation" id="mobile-navigation" aria-label={t.mainNav}>{links}{siteVisibility.products && <><Link href={`/${contentLocale}/products`}>{t.store}</Link><form action={`/${contentLocale}/products`} className="mobile-search" role="search"><input name="q" aria-label={t.search} placeholder={t.search}/><button aria-label={t.searchButton}><Search size={18}/></button></form></>}</nav>}</header>;
}
export function Footer({locale}: {locale:SiteLocale}) {
  const t=corporateCopy[locale];const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL||companyInfo.email;
  const whatsapp=process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g,'')||companyInfo.whatsapp;
  const whatsappHref=`https://wa.me/${whatsapp}`;
  return <><footer className="corporate-footer"><div className="container corporate-footer-grid">
    <div className="corporate-footer-about"><Link href={`/${locale}`} aria-label={companyInfo.name}><Brand light/></Link><h2>{t.about}</h2><nav aria-label={t.about}><Link href={`/${locale}#about-us`}>{t.glance}</Link><Link href={`/${locale}#our-business`}>{t.business}</Link><Link href={`/${locale}/about`}>{t.profile}</Link><Link href={`/${locale}#our-location`}>{t.location}</Link></nav></div>
    <div className="corporate-footer-column"><h2>{t.introduction}</h2><nav aria-label={t.introduction}>{businessSectors.map(sector=><Link key={sector.slug} href={`/${locale}/business/${sector.slug}`}>{sector.title[locale]}</Link>)}</nav></div>
    <div className="corporate-footer-column"><h2>{t.information}</h2><nav aria-label={t.information}><Link href={`/${locale}${policyPaths.compliance}`}>{t.compliance}</Link><Link href={`/${locale}/products`}>{t.products}</Link><Link href={`/${locale}${policyPaths.privacy}`}>{t.privacy}</Link><Link href={`/${locale}${policyPaths.terms}`}>{t.terms}</Link><Link href={`/${locale}${policyPaths.social}`}>{t.social}</Link></nav></div>
    <div className="corporate-footer-touch"><svg className="corporate-footer-lines" viewBox="0 0 250 600" preserveAspectRatio="none" aria-hidden="true"><path d="M30 0 240 200 30 400 240 600M240 0 30 200 240 400 30 600M30 200H250M30 400H250"/></svg><h2>{t.touch}</h2><p className="corporate-footer-headline">{t.headline}</p><a className="corporate-contact-button" href={`mailto:${email}`}>{t.contact}<span aria-hidden="true"/><ArrowRight size={20}/></a><div className="corporate-contact-details"><a href={`mailto:${email}`}>{email}</a><a href={whatsappHref} target="_blank" rel="noopener noreferrer">{t.whatsapp} · {companyInfo.phone}</a></div><div className="corporate-contact-icons"><a href={`mailto:${email}`} aria-label={t.email}><Mail size={18}/></a><a href={whatsappHref} aria-label={t.whatsapp} target="_blank" rel="noopener noreferrer"><MessageIcon/></a></div></div>
    <div className="corporate-footer-bottom"><span>© {new Date().getFullYear()} {companyInfo.name}. {landingCopy[locale].rights}</span><span>INDONESIA · ASIA PACIFIC</span></div>
  </div></footer><a className="floating-contact" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageIcon/></a></>;
}
function MessageIcon() {return <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.2A8 8 0 1 1 20 11.5Z"/><path d="M8.2 7.8c-.5 3.7 2.3 6.6 6.1 7l1-1.6-2.3-1-1 1c-1.5-.6-2.3-1.4-2.8-2.9l.9-.9-1-2Z"/></svg>}
export function SectionLink({href,children}: {href:string;children:React.ReactNode}) {return <Link href={href} className="text-link">{children}<ArrowUpRight size={17}/></Link>}
export {ArrowUpRight,ArrowRight,MoveUpRight};
