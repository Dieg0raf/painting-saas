import { NextRequest, NextResponse } from "next/server";
import { Estimate } from "@/app/types/estimates/estimates";
import { EstimateFormData } from "@/lib/validations/estimate";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        console.error("Unauthorized: No access token found in cookies");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await fetch(`${process.env.BACKEND_URL}/api/estimates/${id}`, {
        method: "GET",
        headers: {
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        console.error("Unauthorized: No access token found in cookies");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.json() as EstimateFormData;
    const res = await fetch(`${process.env.BACKEND_URL}/api/estimates/${id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
            "Authorization": `Bearer ${accessToken.value}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        console.error("Error: ", res.status);
        console.error("Error: ", res.statusText);
        return NextResponse.json({ error: res.statusText }, { status: res.status });
    }
    const responseData: Estimate = await res.json();
    return NextResponse.json(responseData);
}