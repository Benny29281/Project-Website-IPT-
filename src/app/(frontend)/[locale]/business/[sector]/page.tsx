import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {ArrowLeft,ArrowUpRight,Cpu,Layers,Camera,Monitor} from 'lucide-react';
import {businessSectors,corporateCopy} from '@/lib/corporate-content';
import {isSiteLocale,languageAlternates,type SiteLocale} from '@/lib/locales';

type Props={params:Promise<{locale:SiteLocale;sector:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {locale,sector}=await params;const item=businessSectors.find(item=>item.slug===sector);
  if(!isSiteLocale(locale)||!item) notFound();
  const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  return {title:item.title[locale],description:item.intro[locale]||undefined,alternates:{canonical:`${base}/${locale}/business/${sector}`,languages:languageAlternates(base,`/business/${sector}`)}};
}
export default async function BusinessPage({params}:Props) {
  const {locale,sector}=await params;const index=businessSectors.findIndex(item=>item.slug===sector);
  if(!isSiteLocale(locale)||index<0) notFound();
  const item=businessSectors[index];const t=corporateCopy[locale];const Icon=[Cpu,Layers,Camera,Monitor][index];
  return <main id="main" className="business-detail"><section className="business-detail-hero"><div className="container"><Link className="text-link" href={`/${locale}`}><ArrowLeft size={16}/>{t.back}</Link><p className="eyebrow">{t.introduction}</p><Icon size={46} strokeWidth={1.2}/><h1>{item.title[locale]}</h1>{item.intro[locale]&&<p className="business-detail-intro">{item.intro[locale]}</p>}</div></section><section className="section"><div className="container"><nav className="business-detail-links" aria-label={t.introduction}>{businessSectors.map(other=><Link aria-current={other.slug===sector?'page':undefined} key={other.slug} href={`/${locale}/business/${other.slug}`}>{other.title[locale]}<ArrowUpRight size={16}/></Link>)}</nav></div></section></main>;
}
