import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function POST() {
    console.log("\n---- api/auth/logout/route.ts ----");


    const cookieStore = await cookies();
    console.log("DELETING access_token")
    cookieStore.delete('access_token');
    console.log("DELETED access_token")

    console.log("DELETING refresh_token")
    cookieStore.delete('refresh_token');
    console.log("DELETED refresh_token")


    return NextResponse.json({
        message: 'Successfully logged out',
        redirect: '/login',
        success: true
    }, { status: 200 });
}