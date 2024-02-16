import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('tokenAuth');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/minha-lista', '/carrinho'],
};
