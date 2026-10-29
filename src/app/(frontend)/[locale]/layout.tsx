import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {Header, Footer} from '@/components/site';
import {isSiteLocale} from '@/lib/locales';
import {landingCopy} from '@/lib/landing-content';
import {CartProvider} from '@/components/cart-provider';
import {getCommerceSettings} from '@/lib/commerce-settings';
export const metadata: Metadata = {title: {default: 'Indonesia Pacific Trade | Consumer Imaging & Photography', template: '%s | Indonesia Pacific Trade'}, description: 'Produk consumer imaging, kamera Instax, film instan, serta solusi sourcing dan ekspor dari Indonesia untuk pasar internasional.'};
export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale: string}>}) {
  const {locale} = await params; if (!isSiteLocale(locale)) notFound();
  return <NextIntlClientProvider locale={locale} messages={{}} timeZone="Asia/Jakarta"><CartProvider settings={getCommerceSettings()}><a className="skip-link" href="#main">{landingCopy[locale].skip}</a><Header locale={locale}/>{children}<Footer locale={locale}/></CartProvider></NextIntlClientProvider>;
}
