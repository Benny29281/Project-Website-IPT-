import {NextRequest,NextResponse} from 'next/server';
import {checkoutAccess,equalSecret} from '@/lib/midtrans';
import {syncOrderPayment} from '@/lib/order-payment';
import {checkoutError,checkoutRateLimit} from '@/lib/checkout-http';
export const runtime='nodejs';
export async function GET(request: NextRequest) {
  if (!checkoutRateLimit(request)) return checkoutError('Too many requests. Try again shortly.',429);
  const orderNumber=request.nextUrl.searchParams.get('order') || '';const access=request.cookies.get('ipt_order_access')?.value || '';
  if (!/^IPT-[a-f0-9-]{36}$/i.test(orderNumber) || !/^[a-f0-9]{64}$/i.test(access)) return checkoutError('Order access required',403);
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET || !process.env.MIDTRANS_SERVER_KEY) return checkoutError('Payment verification unavailable',503);
  try {
    const {getPayload}=await import('payload');const {default:config}=await import('@payload-config');const payload=await getPayload({config});
    const found=await payload.find({collection:'orders',where:{orderNumber:{equals:orderNumber}},limit:1,overrideAccess:true});const order=found.docs[0];
    if (!order || !equalSecret(access,checkoutAccess(orderNumber,order.requestKey))) return checkoutError('Order access required',403);
    const verified=await syncOrderPayment(payload,order);
    return NextResponse.json({orderNumber,paymentStatus:verified.paymentStatus,total:verified.total,paymentUrl:verified.paymentStatus === 'pending' ? verified.paymentUrl : undefined,items:verified.items.map((item: Record<string,any>)=>({slug:item.slug,quantity:item.quantity}))},{headers:{'Cache-Control':'private, no-store'}});
  } catch {return checkoutError('Unable to verify payment. Try again shortly.',503);}
}
