import {NextRequest,NextResponse} from 'next/server';
import {readCheckoutBody,checkoutError} from '@/lib/checkout-http';
import {validSignature} from '@/lib/midtrans';
import {syncOrderPayment} from '@/lib/order-payment';
export const runtime='nodejs';
export async function POST(request: NextRequest) {
  let data;
  try {data=await readCheckoutBody(request);} catch {return checkoutError('Invalid notification',400);}
  if (!validSignature(data)) return checkoutError('Invalid signature',403);
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) return checkoutError('Payment storage unavailable',503);
  try {
    const {getPayload}=await import('payload');const {default:config}=await import('@payload-config');const payload=await getPayload({config});
    const found=await payload.find({collection:'orders',where:{orderNumber:{equals:data.order_id}},limit:1,overrideAccess:true});const order=found.docs[0];
    if (!order) return checkoutError('Order not found',404);
    if (Number(data.gross_amount)!==order.total) return checkoutError('Invalid amount',400);
    await syncOrderPayment(payload,order);
    return NextResponse.json({received:true});
  } catch {return checkoutError('Payment verification temporarily unavailable',503);}
}
