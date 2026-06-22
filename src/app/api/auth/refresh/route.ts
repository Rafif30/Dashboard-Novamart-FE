import { cookies } from "next/headers";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken =
      cookieStore.get("refresh_token")?.value;

    const allCookies = cookieStore.toString()

    
    if (!refreshToken) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      undefined,
      {
        withCredentials: true,
        headers: {
            Cookie: allCookies
        }
      }
    );

    console.log(response)

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

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
      access_token: data.data.access_token
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Refresh failed" },
      { status: 401 }
    );
  }
}