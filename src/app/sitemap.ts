import type {MetadataRoute} from 'next';
import {products, articles} from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return ['id','en'].flatMap(locale => ['', '/about','/products','/services','/contact','/news','/careers','/privacy','/terms', ...products.map(p => `/products/${p.slug}`), ...articles.map(a => `/news/${a.slug}`), ...['export','import','sourcing'].map(s => `/services/${s}`)].map(path => ({url: `${base}/${locale}${path}`, alternates: {languages: {id: `${base}/id${path}`, en: `${base}/en${path}`}}})));
}
