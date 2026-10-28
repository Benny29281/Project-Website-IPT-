import type {Metadata} from 'next';
import Link from 'next/link';
import type {Locale} from '@/lib/content';
import {CartPage} from '@/components/cart-page';
export const metadata: Metadata = {title:'Keranjang / Cart',robots:{index:false,follow:false}};
export default async function Page({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;return <main id="main"><section className="page-intro"><div className="container"><div className="breadcrumbs"><Link href={`/${locale}/products`}>{locale === 'id' ? 'Produk' : 'Store'}</Link><span>/</span><span>{locale === 'id' ? 'Keranjang' : 'Cart'}</span></div><h1>{locale === 'id' ? 'Keranjang Belanja' : 'Your Shopping Cart'}</h1><p>{locale === 'id' ? 'Periksa pilihan produk dan jumlah sebelum checkout.' : 'Review your products and quantities before checkout.'}</p></div></section><section className="section"><div className="container"><CartPage locale={locale}/></div></section></main>;
}
