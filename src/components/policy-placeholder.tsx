import {notFound} from 'next/navigation';
import {corporateCopy,policyPaths,type CorporatePolicy} from '@/lib/corporate-content';
import {isSiteLocale,type SiteLocale,languageAlternates} from '@/lib/locales';

export async function policyMetadata(params:Promise<{locale:SiteLocale}>,policy:CorporatePolicy) {
  const {locale}=await params;if(!isSiteLocale(locale)) notFound();
  const path=policyPaths[policy];const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
  return {title:corporateCopy[locale][policy],robots:{index:false,follow:true},alternates:{canonical:`${base}/${locale}${path}`,languages:languageAlternates(base,path)}};
}
export async function PolicyPlaceholder({params,policy}:{params:Promise<{locale:SiteLocale}>;policy:CorporatePolicy}) {
  const {locale}=await params;if(!isSiteLocale(locale)) notFound();
  return <main id="main" className="policy-placeholder"><div className="container"><h1>{corporateCopy[locale][policy]}</h1></div></main>;
}
