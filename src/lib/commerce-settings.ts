import 'server-only';
import {products} from './content';
import {parsePriceMap} from './commerce';
export function getCommerceSettings() {
  const prices = parsePriceMap(process.env.PRODUCT_PRICES_IDR, products.map(p => p.slug));
  const shippingValue = process.env.SHIPPING_FEE_IDR;
  const shipping = shippingValue !== undefined && /^\d+$/.test(shippingValue) && Number.isSafeInteger(Number(shippingValue)) && Number(shippingValue) <= 1_000_000_000 ? Number(shippingValue) : null;
  const ready = Boolean(process.env.DATABASE_URI && process.env.PAYLOAD_SECRET && process.env.MIDTRANS_SERVER_KEY && process.env.NEXT_PUBLIC_SITE_URL && shipping !== null);
  return {prices, shipping, ready, sandbox: process.env.MIDTRANS_IS_PRODUCTION !== 'true'};
}
