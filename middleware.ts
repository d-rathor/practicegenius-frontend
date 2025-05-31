import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running for:', request.nextUrl.pathname);
  if (request.nextUrl.pathname === '/profile') {
    return NextResponse.redirect(new URL('/dashboard/profile', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
