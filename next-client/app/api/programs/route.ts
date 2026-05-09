import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { categoryType } = body;

    // Validation
    if (
      !categoryType ||
      typeof categoryType !== "string" 
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid categoryType is required",
        },
        {
          status: 400,
        },
      );
    }

    const response = await fetch(`${process.env.BACKEND_API}/api/program`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

     // Backend response check
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Backend request failed",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
