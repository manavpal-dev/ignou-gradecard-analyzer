import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { categoryType, program, enrollment } = body;

    // Validation
    if (!categoryType || !program || !enrollment) {
      return NextResponse.json(
        {
          success: false,
          message: "Select all the fields",
        },
        {
          status: 400,
        },
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_API}/api/test-browser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_SECRET_KEY!,
        },
        body: JSON.stringify(body),
      },
    );

    // Backend response check
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Backend request failed",
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server Error",
      },
      {
        status: 500,
      },
    );
  }
}
