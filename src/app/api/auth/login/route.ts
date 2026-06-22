import { cookies } from "next/headers";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
      {
        code
      }
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Login failed" },
        { status: response.status }
      );
    }

    const cookieStore = await cookies();

    const data = response.data

    cookieStore.set("access_token", data.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    cookieStore.set("refresh_token", data.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
      path: "/",
    });

    return NextResponse.json({
       success: true,
       token: data.data.access_token
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}