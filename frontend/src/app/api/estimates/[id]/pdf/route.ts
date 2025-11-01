import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const accessToken = request.cookies.get("access_token");

    if (!accessToken) {
        console.error("Unauthorized: No access token found in cookies");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/estimates/${id}/pdf`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
                Accept: "application/pdf",
            },
        });

        if (!res.ok) {
            console.error("Error: ", res.status, res.statusText);
            return NextResponse.json(
                { error: res.statusText },
                { status: res.status }
            );
        }

        // Get PDF as ArrayBuffer
        const pdfBuffer = await res.arrayBuffer();

        // Return PDF with proper headers
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="estimate-${id}.pdf"`,
                "Content-Length": pdfBuffer.byteLength.toString(),
            },
        });
    } catch (error) {
        console.error("Error fetching PDF:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}