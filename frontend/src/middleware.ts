// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {

    console.log("\n---- middleware running ----");
    const { pathname } = request.nextUrl;

    if (pathname.includes("/api")) {
        console.log("---- api request ----\n");
        return NextResponse.next();
    }

    const accessToken = request.cookies.get('access_token');
    const publicRoutes = ['/login'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // console.log("accessToken: ", accessToken);
    console.log("isPublicRoute: ", isPublicRoute);

    // No token + protected route = redirect
    if (!accessToken && !isPublicRoute) {
        console.log("---- redirecting to login ----\n");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Has token + login page = redirect to home
    if (accessToken && isPublicRoute) {
        console.log("---- redirecting to home ----\n");
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Allow request to continue
    console.log("---- request continuing ----\n");
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};