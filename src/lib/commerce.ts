export type CartItem = {slug: string; quantity: number};
export type CartState = {items: CartItem[]; completedOrders: string[]};
export const MAX_QUANTITY = 99;
export function normalizeCart(value: unknown, allowedSlugs: readonly string[]): CartItem[] {
  if (!Array.isArray(value)) return [];
  const merged = new Map<string, number>();
  for (const item of value.slice(0, 100)) {
    if (!item || typeof item !== 'object' || !allowedSlugs.includes(item.slug) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
    merged.set(item.slug, Math.min(MAX_QUANTITY, (merged.get(item.slug) || 0) + item.quantity));
  }
  return Array.from(merged, ([slug, quantity]) => ({slug, quantity}));
}
export function removePurchased(state: CartState, orderNumber: string, purchased: CartItem[]): CartState {
  if (state.completedOrders.includes(orderNumber)) return state;
  return {items: state.items.map(item => ({...item, quantity: item.quantity - (purchased.find(p => p.slug === item.slug)?.quantity || 0)})).filter(item => item.quantity > 0), completedOrders: [...state.completedOrders.slice(-39), orderNumber]};
}
export function parsePriceMap(raw: string | undefined, slugs: readonly string[]): Record<string, number | null> {
  let parsed: Record<string, unknown> = {};
  try {const value = JSON.parse(raw || '{}'); if (value && typeof value === 'object' && !Array.isArray(value)) parsed = value;} catch { /* Invalid settings disable payment rather than inventing prices. */ }
  return Object.fromEntries(slugs.map(slug => [slug, typeof parsed[slug] === 'number' && Number.isSafeInteger(parsed[slug]) && Number(parsed[slug]) > 0 && Number(parsed[slug]) <= 1_000_000_000 ? parsed[slug] : null]));
}
export function calculateTotals(items: CartItem[], prices: Record<string, number | null>, shipping: number | null) {
  const priced = items.length > 0 && items.every(item => typeof prices[item.slug] === 'number' && Number(prices[item.slug]) > 0);
  const subtotal = priced ? items.reduce((sum,item) => sum + Number(prices[item.slug]) * item.quantity, 0) : null;
  return {subtotal, shipping, total: subtotal !== null && shipping !== null ? subtotal + shipping : null};
}
export type CheckoutInput = {locale: 'id' | 'en'; items: CartItem[]; expectedTotal: number; customer: {name: string; email: string; phone: string; address: string; city: string; province: string; postalCode: string; country: string; notes: string}; consent: true};
export function validateCheckout(value: unknown, slugs: readonly string[]): CheckoutInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid');
  const input = value as Record<string, unknown>;
  if (typeof input.expectedTotal !== 'number' || !Number.isSafeInteger(input.expectedTotal) || input.expectedTotal < 1) throw new Error('total');
  if (!Array.isArray(input.items) || !input.items.length || input.items.length > slugs.length) throw new Error('items');
  const items: CartItem[] = []; const seen = new Set<string>();
  for (const item of input.items) {
    if (!item || typeof item !== 'object' || !slugs.includes(item.slug) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY || seen.has(item.slug)) throw new Error('items');
    items.push({slug:item.slug, quantity:item.quantity}); seen.add(item.slug);
  }
  if (!input.customer || typeof input.customer !== 'object' || Array.isArray(input.customer)) throw new Error('customer');
  const raw = input.customer as Record<string, unknown>;
  const customer = Object.fromEntries(['name','email','phone','address','city','province','postalCode','country','notes'].map(key => [key, typeof raw[key] === 'string' ? raw[key].trim() : ''])) as CheckoutInput['customer'];
  if (Object.entries(customer).some(([key, v]) => v.length > (key === 'notes' || key === 'address' ? 1000 : 200))) throw new Error('customer');
  if (customer.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) || !/^[+\d\s().-]{7,30}$/.test(customer.phone) || customer.address.length < 10 || !customer.city || !customer.province || !/^[a-zA-Z0-9 -]{3,12}$/.test(customer.postalCode) || !customer.country || input.consent !== true) throw new Error('customer');
  return {locale: input.locale === 'en' ? 'en' : 'id', items, expectedTotal: input.expectedTotal, customer, consent: true};
}
