import type {MetadataRoute} from 'next';
import {products, articles} from '@/lib/content';
import {languageAlternates} from '@/lib/locales';
import {businessSectors} from '@/lib/corporate-content';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const detailed=['id','en'].flatMap(locale => ['', '/about','/products','/services','/contact','/news','/careers','/privacy','/terms', ...products.map(p => `/products/${p.slug}`), ...articles.map(a => `/news/${a.slug}`), ...['export','import','sourcing'].map(s => `/services/${s}`)].map(path => ({url: `${base}/${locale}${path}`, alternates: {languages: !path || path==='/about' || path.startsWith('/products') ? languageAlternates(base,path) : {id: `${base}/id${path}`, en: `${base}/en${path}`}}})));
  return [...detailed.filter(item=>!item.url.endsWith('/terms') && !item.url.endsWith('/privacy')),...['zh','ko'].flatMap(locale=>['','/about','/products',...products.map(p=>`/products/${p.slug}`)].map(path=>({url:`${base}/${locale}${path}`,alternates:{languages:languageAlternates(base,path)}}))),...['id','en','zh','ko'].flatMap(locale=>businessSectors.map(sector=>({url:`${base}/${locale}/business/${sector.slug}`,alternates:{languages:languageAlternates(base,`/business/${sector.slug}`)}})))];
}


