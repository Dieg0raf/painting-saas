// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// * This runs FIRST (before any components - on every page request)
// * Components only load AFTER middleware allows
export default function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    if (pathname.includes("/api")) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('access_token');
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // No token + protected route = redirect
    if (!accessToken && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Has token + login page = redirect to home
    if (accessToken && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Allow request to continue
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};