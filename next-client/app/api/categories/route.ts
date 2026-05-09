import {NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.BACKEND_API}/api/categories`, {
      method: "GET",
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Route Error:", error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    },{
        status:500,
    });
  }
}
