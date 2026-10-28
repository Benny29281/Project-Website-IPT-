import 'server-only';
import type {Payload} from 'payload';
import {midtransRequest} from './midtrans';
import {paymentTransition, verifiedPaymentStatus, type PaymentStatus} from './payment-status';
export async function syncOrderPayment(payload: Payload, order: Record<string,any>) {
  let result;
  try {result=await midtransRequest(`/v2/${encodeURIComponent(order.orderNumber)}/status`);} catch (error) {
    // Snap returns 404 before the customer chooses a payment method.
    if (error instanceof Error && error.message.endsWith(': 404')) return order;
    throw error;
  }
  if (result.status_code === '404') return order;
  if (result.order_id !== order.orderNumber || result.currency !== 'IDR' || Number(result.gross_amount) !== order.total) throw new Error('Payment amount or currency mismatch');
  const status=paymentTransition(order.paymentStatus as PaymentStatus,verifiedPaymentStatus(result));
  if (status !== order.paymentStatus) {
    // The condition also protects a concurrent verified paid update from an older request.
    const update=await payload.update({collection:'orders',where:{and:[{id:{equals:order.id}},{paymentStatus:{equals:order.paymentStatus}}]},data:{paymentStatus:status,paymentType:typeof result.payment_type === 'string' ? result.payment_type : undefined},overrideAccess:true});
    return update.docs[0] || (await payload.findByID({collection:'orders',id:order.id,overrideAccess:true}));
  }
  return order;
}
