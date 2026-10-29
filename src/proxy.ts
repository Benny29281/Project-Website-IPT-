import {NextResponse, type NextRequest} from 'next/server';
import {isSiteLocale} from '@/lib/locales';
export function proxy(request: NextRequest) {
  const parts=request.nextUrl.pathname.split('/').filter(Boolean);const locale=parts[0];
  // Profile and catalog support all four languages. Legacy transaction and
  // editorial routes still use English until their translations are available.
  if ((locale==='zh'||locale==='ko') && parts.length>1 && !['about','products','business','terms','social-media-policy','basic-compliance-policy','privacy'].includes(parts[1])) {const target=request.nextUrl.clone();target.pathname=`/en/${parts.slice(1).join('/')}`;return NextResponse.redirect(target)}
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-locale', isSiteLocale(locale) ? locale : 'id');
  return NextResponse.next({request: {headers: requestHeaders}});
}
export const config = {matcher: ['/((?!api|admin|_next|favicon.ico).*)']};
