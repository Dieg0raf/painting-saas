import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { LoginInfo, User } from '@/app/types/auth'

export async function POST(request: NextRequest) {
    console.log("\n---- api/auth/login/route.ts ----");
    const { email, password }: User = await request.json()

    const res = await fetch(' http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })

    if (res.ok) {
        // parse response JSON into a LoginInfo object
        const data: LoginInfo = await res.json()

        // Set cookies in Next.js response
        const nextResponse = NextResponse.json({
            user: {
                id: data.user_id,
                username: data.username,
                role: data.role
            },
            redirect: '/',
            success: true
        }, { status: 200 });

        // Use nextResponse.cookies.set to attach access_token and refresh_token cookies to the response. 
        // This tells the browser to store these tokens securely (with httpOnly, secure, etc.).
        console.log("SETTING access_token")
        nextResponse.cookies.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 900 // 15 minutes
        });
        console.log("SET access_token")

        console.log("SETTING refresh_token")
        nextResponse.cookies.set('refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 604800 // 7 days
        });
        console.log("SET refresh_token")

        // REASON: Setting cookies this way ensures the tokens are stored on the client for future 
        // authenticated requests, and returning the response sends both the user data and sets the 
        // cookies in one HTTP response.

        // Return the NextResponse, which sends both the JSON user info and the cookies to the client.
        return nextResponse;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}