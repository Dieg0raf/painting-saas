import { EstimateFormData } from '@/lib/validations/estimate';
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest) {

    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        console.error("Unauthorized: No access token found in cookies");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/api/estimates`, {
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

export async function POST(request: NextRequest) {
    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        console.error("Unauthorized: No access token found in cookies");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.json() as EstimateFormData;
    const res = await fetch(`${process.env.BACKEND_URL}/api/estimates`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.value}`,
        },
    });
    if (!res.ok) {
        console.error("Error: ", res.statusText);
        return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
}