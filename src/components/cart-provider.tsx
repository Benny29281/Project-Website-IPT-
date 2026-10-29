'use client';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import Link from 'next/link';
import {Check, ShoppingCart} from 'lucide-react';
import {products, type Locale} from '@/lib/content';
import type {SiteLocale} from '@/lib/locales';
import {detailCopy} from '@/lib/detail-content';
import {MAX_QUANTITY, normalizeCart, removePurchased, type CartItem, type CartState} from '@/lib/commerce';
const storageKey = 'ipt-cart-v1';
const slugs = products.map(p => p.slug);
type Settings = {prices: Record<string, number | null>; shipping: number | null; ready: boolean; sandbox: boolean};
type CartContextValue = Settings & {items: CartItem[]; hydrated: boolean; storageAvailable: boolean; add: (slug: string, quantity?: number) => void; setQuantity: (slug: string, quantity: number) => void; complete: (orderNumber: string, items: CartItem[]) => void};
const CartContext = createContext<CartContextValue | null>(null);
function parseStored(raw: string | null): CartState {
  try {const data = JSON.parse(raw || '{}');return {items:normalizeCart(data?.items, slugs), completedOrders:Array.isArray(data?.completedOrders) ? data.completedOrders.filter((x: unknown) => typeof x === 'string').slice(-40) : []};} catch {return {items:[],completedOrders:[]};}
}
export function CartProvider({children, settings}: {children: React.ReactNode; settings: Settings}) {
  const [state, setState] = useState<CartState>({items:[],completedOrders:[]});
  const [hydrated, setHydrated] = useState(false); const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    try {setState(parseStored(localStorage.getItem(storageKey)));} catch {setStorageAvailable(false);} setHydrated(true);
    function sync(e: StorageEvent) {if (e.key === storageKey) setState(parseStored(e.newValue));}
    window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {if (hydrated) {try {localStorage.setItem(storageKey,JSON.stringify(state));} catch {setStorageAvailable(false);}}}, [state,hydrated]);
  const add = useCallback((slug: string, quantity = 1) => {
    if (!slugs.includes(slug) || !Number.isInteger(quantity) || quantity < 1) return;
    setState(old => ({...old, items:normalizeCart([...old.items,{slug,quantity}], slugs)}));
  }, []);
  const setQuantity = useCallback((slug: string, quantity: number) => {
    if (!Number.isInteger(quantity)) return;
    setState(old => ({...old, items:old.items.map(item => item.slug === slug ? {...item,quantity:Math.min(MAX_QUANTITY,quantity)} : item).filter(item => item.quantity > 0)}));
  }, []);
  const complete = useCallback((orderNumber: string, items: CartItem[]) => setState(old => removePurchased(old,orderNumber,items)), []);
  return <CartContext.Provider value={{...settings,items:state.items,hydrated,storageAvailable,add,setQuantity,complete}}>{children}</CartContext.Provider>;
}
export function useCart() {const value = useContext(CartContext);if (!value) throw new Error('CartProvider is missing');return value;}
export function money(value: number, locale: SiteLocale) {return new Intl.NumberFormat({id:'id-ID',en:'en-ID',zh:'zh-CN',ko:'ko-KR'}[locale],{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);}
export function ProductPrice({slug,locale}: {slug: string; locale: SiteLocale}) {
  const {prices} = useCart();const price = prices[slug];return <p className={`product-price ${price === null ? 'price-pending' : ''}`}>{typeof price === 'number' ? money(price,locale) : detailCopy[locale].price}</p>;
}
export function AddToCartButton({slug,locale,quantity = 1}: {slug: string; locale: SiteLocale; quantity?: number}) {
  const {add,items,hydrated} = useCart();const [added,setAdded] = useState(false);
  const full = (items.find(item => item.slug === slug)?.quantity || 0) + quantity > MAX_QUANTITY;
  useEffect(() => {if (!added) return;const timer = setTimeout(() => setAdded(false),1800);return () => clearTimeout(timer)}, [added]);
  return <button className="button add-to-cart" disabled={!hydrated || full} onClick={() => {add(slug,quantity);setAdded(true)}}>{added ? <Check size={16}/> : <ShoppingCart size={16}/>}<span aria-live="polite">{full ? detailCopy[locale].max : added ? detailCopy[locale].added : detailCopy[locale].add}</span></button>;
}
export function CartLink({locale,label}: {locale: Locale;label?:string}) {
  const {items,hydrated} = useCart();const count = hydrated ? items.reduce((sum,item) => sum+item.quantity,0) : 0;
  return <Link className="cart-link" href={`/${locale}/cart`} aria-label={`${label || (locale === 'id' ? 'Keranjang' : 'Cart')} (${count})`}><ShoppingCart size={22}/><span>{count}</span></Link>;
}
