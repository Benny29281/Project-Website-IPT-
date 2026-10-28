import '@/app/globals.css';
import '@/app/commerce.css';
import '@/app/slideshow.css';
import '@fontsource-variable/inter';
import {headers} from 'next/headers';
export default async function FrontendLayout({children}: {children: React.ReactNode}) {const locale = (await headers()).get('x-site-locale') || 'id'; return <html lang={locale}><body>{children}</body></html>;}
