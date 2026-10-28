import {createHash,timingSafeEqual} from 'node:crypto';
export function verifyNotificationSignature(body: Record<string,unknown>,serverKey: string) {
  if (!serverKey || typeof body.signature_key !== 'string' || !/^[a-f0-9]{128}$/i.test(body.signature_key) || !['order_id','status_code','gross_amount'].every(key=>typeof body[key] === 'string')) return false;
  const expected=createHash('sha512').update(`${body.order_id}${body.status_code}${body.gross_amount}${serverKey}`).digest('hex');
  return timingSafeEqual(Buffer.from(expected),Buffer.from(body.signature_key.toLowerCase()));
}
