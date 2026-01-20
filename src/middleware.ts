import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // allow landing page
  if (pathname === '/') {
    return NextResponse.next()
  }

  const token = request.cookies.get('access')?.value

  console.log('TOKEN:', token) // DEBUG

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/employer/:path*'],
}
