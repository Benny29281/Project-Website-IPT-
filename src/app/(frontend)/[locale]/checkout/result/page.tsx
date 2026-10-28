import type {Metadata} from 'next';
import type {Locale} from '@/lib/content';
import {PaymentResult} from '@/components/payment-result';
export const metadata: Metadata = {title:'Status Pembayaran / Payment Status',robots:{index:false,follow:false},referrer:'no-referrer'};
export default async function Page({params,searchParams}: {params:Promise<{locale:Locale}>;searchParams:Promise<{order?:string}>}) {const {locale}=await params;const {order=''}=await searchParams;return <main id="main" className="section"><div className="container"><PaymentResult locale={locale} orderNumber={order}/></div></main>}
