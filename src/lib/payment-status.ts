export type PaymentStatus = 'creating' | 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled' | 'refunded';
export function verifiedPaymentStatus(result: Record<string, unknown>): PaymentStatus {
  const state=result.transaction_status;
  if (['refund','partial_refund','chargeback','partial_chargeback'].includes(String(state))) return 'refunded';
  if (result.status_code === '200' && ['settlement','capture'].includes(String(state)) && (!result.fraud_status || result.fraud_status === 'accept')) return 'paid';
  if (state === 'expire') return 'expired';
  if (state === 'cancel') return 'cancelled';
  if (['deny','failure'].includes(String(state)) || result.fraud_status === 'deny') return 'failed';
  return 'pending';
}
export function paymentTransition(current: PaymentStatus, next: PaymentStatus): PaymentStatus {
  if (current === 'refunded') return current;
  if (current === 'paid' && next !== 'refunded') return current;
  if (['expired','cancelled','failed'].includes(current) && next === 'pending') return current;
  return next;
}
