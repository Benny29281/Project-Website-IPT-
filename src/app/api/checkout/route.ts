import {NextRequest,NextResponse} from 'next/server';
import {createHash,randomUUID} from 'node:crypto';
import {products} from '@/lib/content';
import {calculateTotals,validateCheckout} from '@/lib/commerce';
import {getCommerceSettings} from '@/lib/commerce-settings';
import {checkoutAccess,midtransRequest,production} from '@/lib/midtrans';
import {checkoutError,checkoutRateLimit,readCheckoutBody,validCheckoutOrigin} from '@/lib/checkout-http';
export const runtime='nodejs';
export async function POST(request: NextRequest) {
  if (!validCheckoutOrigin(request)) return checkoutError('Invalid origin',403);
  if (!checkoutRateLimit(request)) return checkoutError('Terlalu banyak permintaan. Coba lagi sebentar. / Too many requests.',429);
  let input;
  try {const raw=await readCheckoutBody(request);if (raw.website) return checkoutError('Invalid request',400);input=validateCheckout(raw,products.map(p=>p.slug));} catch {return checkoutError('Periksa produk, jumlah, dan data pengiriman. / Check your items, quantities, and shipping details.',400);}
  const en=input.locale==='en';const key=request.headers.get('idempotency-key') || '';
  if (!/^[a-f0-9-]{36}$/i.test(key)) return checkoutError('Invalid checkout key',400);
  const settings=getCommerceSettings();const totals=calculateTotals(input.items,settings.prices,settings.shipping);
  if (!settings.ready || totals.total===null) return checkoutError(en ? 'Online payment is not available yet. Your cart has been kept.' : 'Pembayaran online belum tersedia. Keranjang Anda tetap tersimpan.',503);
  if (totals.total !== input.expectedTotal) return checkoutError(en ? 'Prices have changed. Reload checkout to review the new total.' : 'Harga berubah. Muat ulang checkout untuk memeriksa total terbaru.',409);
  const requestKey=createHash('sha256').update(key).digest('hex');
  const fingerprint=createHash('sha256').update(JSON.stringify(input)).digest('hex');
  try {
    const {getPayload}=await import('payload');const {default:config}=await import('@payload-config');const payload=await getPayload({config});
    const found=await payload.find({collection:'orders',where:{requestKey:{equals:requestKey}},limit:1,overrideAccess:true});
    let order: Record<string,any> | undefined=found.docs[0];
    if (order && order.fingerprint!==fingerprint) return checkoutError(en ? 'Your checkout details changed. Reload checkout and try again.' : 'Data checkout berubah. Muat ulang halaman lalu coba kembali.',409);
    if (order?.paymentStatus==='paid') return checkoutError(en ? 'This order is already paid.' : 'Pesanan ini sudah dibayar.',409);
    if (!order) order=await payload.create({collection:'orders',data:{orderNumber:`IPT-${randomUUID()}`,requestKey,fingerprint,locale:input.locale,customer:input.customer,items:input.items.map(item=>({slug:item.slug,name:products.find(p=>p.slug===item.slug)!.name.en,quantity:item.quantity,unitPrice:settings.prices[item.slug]})),subtotal:totals.subtotal,shipping:totals.shipping,total:totals.total,currency:'IDR',paymentStatus:'creating',consent:true},overrideAccess:true});
    if (!order) throw new Error('Missing order');
    if (!order.paymentUrl) {
      if (order.total!==totals.total) return checkoutError(en ? 'Prices have changed. Start a new checkout.' : 'Harga berubah. Mulai checkout baru.',409);
      const base=process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/$/,'');
      const transaction=await midtransRequest('/snap/v1/transactions',{
        transaction_details:{order_id:order.orderNumber,gross_amount:order.total},
        item_details:[...order.items.map((item: Record<string,any>)=>({id:item.slug,price:item.unitPrice,quantity:item.quantity,name:item.name.slice(0,50)})),...(order.shipping>0 ? [{id:'shipping',price:order.shipping,quantity:1,name:'Shipping'}] : [])],
        customer_details:{first_name:input.customer.name,email:input.customer.email,phone:input.customer.phone,shipping_address:{first_name:input.customer.name,phone:input.customer.phone,address:`${input.customer.address}, ${input.customer.province}, ${input.customer.country}`,city:input.customer.city,postal_code:input.customer.postalCode}},
        credit_card:{secure:true},callbacks:{finish:`${base}/${input.locale}/checkout/result?order=${encodeURIComponent(order.orderNumber)}`},
      },true);
      const paymentUrl=new URL(transaction.redirect_url);const expected=production() ? 'app.midtrans.com' : 'app.sandbox.midtrans.com';
      if (paymentUrl.protocol!=='https:' || paymentUrl.hostname!==expected) throw new Error('Invalid gateway URL');
      order=await payload.update({collection:'orders',id:order.id,data:{paymentUrl:paymentUrl.toString(),paymentStatus:'pending'},overrideAccess:true});
    }
    const response=NextResponse.json({orderNumber:order.orderNumber,paymentUrl:order.paymentUrl},{headers:{'Cache-Control':'no-store'}});
    response.cookies.set('ipt_order_access',checkoutAccess(order.orderNumber,requestKey),{httpOnly:true,secure:new URL(process.env.NEXT_PUBLIC_SITE_URL!).protocol==='https:',sameSite:'lax',path:'/api/checkout',maxAge:86400});return response;
  } catch {return checkoutError(en ? 'Unable to prepare your payment. Please retry or contact our team.' : 'Pembayaran belum dapat disiapkan. Coba kembali atau hubungi tim kami.',503);}
}
