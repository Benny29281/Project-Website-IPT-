import type {Metadata} from 'next';
import type {Locale} from '@/lib/content';
import {CheckoutPage} from '@/components/checkout-page';
export const metadata: Metadata = {title:'Checkout',robots:{index:false,follow:false}};
export default async function Page({params}: {params: Promise<{locale: Locale}>}) {const {locale} = await params;return <main id="main"><section className="page-intro"><div className="container"><p className="eyebrow">INDONESIA PACIFIC TRADE</p><h1>Checkout</h1><p>{locale === 'id' ? 'Lengkapi pengiriman dan lanjutkan ke pembayaran online.' : 'Complete your shipping details and proceed to online payment.'}</p></div></section><section className="section"><div className="container"><CheckoutPage locale={locale}/></div></section></main>}
