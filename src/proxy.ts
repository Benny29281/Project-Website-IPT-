import {NextResponse, type NextRequest} from 'next/server';
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-locale', request.nextUrl.pathname.split('/')[1] === 'en' ? 'en' : 'id');
  return NextResponse.next({request: {headers: requestHeaders}});
}
export const config = {matcher: ['/((?!api|admin|_next|favicon.ico).*)']};
