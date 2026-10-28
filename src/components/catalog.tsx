'use client';
import {useState} from 'react';
import Link from 'next/link';
import {Search, ArrowUpRight} from 'lucide-react';
import {copy, products, type Locale} from '@/lib/content';
import {productCategories} from '@/lib/brand-content';
import {ProductImage} from './product-image';
import {AddToCartButton, ProductPrice} from './cart-provider';

function ProductCard({locale, product}: {locale: Locale; product: typeof products[number]}) {
  return <article className="product-card"><Link href={`/${locale}/products/${product.slug}`} className="product-image"><ProductImage src={product.image} alt={product.name[locale]}/><span className="circle-arrow"><ArrowUpRight size={19}/></span></Link><div className="product-copy"><span>{product.categoryName[locale]}</span><Link href={`/${locale}/products/${product.slug}`}><h3>{product.name[locale]}</h3></Link><p>{product.description[locale]}</p><ProductPrice slug={product.slug} locale={locale}/><AddToCartButton slug={product.slug} locale={locale}/></div></article>;
}
export function ProductCards({locale, limit}: {locale: Locale; limit?: number}) {
  return <div className="product-grid">{products.slice(0, limit).map(product => <ProductCard locale={locale} product={product} key={product.slug}/>)}</div>;
}
export function Catalog({locale, initialQuery = '', initialCategory = 'all'}: {locale: Locale; initialQuery?: string; initialCategory?: string}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const t = copy[locale];
  const found = products.filter(p => (category === 'all' || p.category === category) && `${p.name[locale]} ${p.description[locale]} ${p.categoryName[locale]}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <><div className="catalog-tools"><div className="filters"><button aria-pressed={category === 'all'} className={category === 'all' ? 'selected' : ''} onClick={() => setCategory('all')}>{t.all}</button>{productCategories.map(c => <button key={c.slug} aria-pressed={category === c.slug} onClick={() => setCategory(c.slug)} className={category === c.slug ? 'selected' : ''}>{c.label[locale]}</button>)}</div><label className="search"><Search size={18}/><input aria-label={t.search} placeholder={t.search} value={query} onChange={e => setQuery(e.target.value)}/></label></div><p className="result-count" role="status">{found.length} {locale === 'id' ? 'produk ditemukan' : 'products found'}</p><div className="product-grid">{found.map(product => <ProductCard key={product.slug} locale={locale} product={product}/>)}</div>{!found.length && <div className="empty-state"><Search size={30}/><h2>{locale === 'id' ? 'Belum ada produk yang sesuai.' : 'No matching products yet.'}</h2><p>{locale === 'id' ? 'Coba kategori lain atau hubungi tim kami untuk kebutuhan Anda.' : 'Try another category or contact our team to discuss your needs.'}</p><button className="button" onClick={() => {setCategory('all'); setQuery('')}}>{locale === 'id' ? 'Tampilkan Semua Produk' : 'Show All Products'}</button></div>}<p className="content-note">{t.sample}</p></>;
}
