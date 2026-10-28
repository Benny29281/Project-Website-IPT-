import 'server-only';
import {createHmac, timingSafeEqual} from 'node:crypto';
import {verifyNotificationSignature} from './payment-signature';
export const production = () => process.env.MIDTRANS_IS_PRODUCTION === 'true';
export function equalSecret(left: string, right: string) {const a=Buffer.from(left);const b=Buffer.from(right);return a.length === b.length && timingSafeEqual(a,b);}
export function checkoutAccess(orderNumber: string, requestKey: string) {return createHmac('sha256',process.env.PAYLOAD_SECRET!).update(`${orderNumber}:${requestKey}`).digest('hex');}
export function validSignature(body: Record<string,unknown>) {
  return verifyNotificationSignature(body,process.env.MIDTRANS_SERVER_KEY || '');
}
export async function midtransRequest(path: string, body?: unknown, snap = false) {
  const origin = snap ? production() ? 'https://app.midtrans.com' : 'https://app.sandbox.midtrans.com' : production() ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com';
  const response = await fetch(`${origin}${path}`, {method:body ? 'POST' : 'GET',headers:{Accept:'application/json','Content-Type':'application/json',Authorization:`Basic ${Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64')}`},body:body ? JSON.stringify(body) : undefined,cache:'no-store',signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error(`Midtrans request failed: ${response.status}`);
  return response.json();
}
