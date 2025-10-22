import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {

    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        console.error("Unauthorized: No access token found in cookies");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch("http://127.0.0.1:5000/api/estimates", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.value}`,
        },
    })
    if (!res.ok) {
        console.error("Error: ", res.statusText);
        return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
}