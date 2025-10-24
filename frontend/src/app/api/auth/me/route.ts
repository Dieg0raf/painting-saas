import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get("access_token");
    if (!accessToken) {
        console.error("Unauthorized: No access token found");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // It's best to handle errors at both the API route (route.ts) level and at the hook/component level.
    // At the route level, return clear error responses and status codes.
    // At the hook/component level, handle those errors gracefully in the UI.

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken.value}`,
            },
        });

        if (!res.ok) {
            // Forward the error message and status from the backend if possible
            const errorData = await res.json().catch(() => ({}));
            return NextResponse.json(
                { error: errorData.error || "Failed to get user" },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        // Log server-side error for debugging
        console.error(error);
        return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
    }
}