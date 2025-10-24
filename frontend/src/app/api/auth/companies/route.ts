import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.value}`,
        },
    });
    const data = await res.json();
    return NextResponse.json(data);
}