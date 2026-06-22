import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();

  const response = NextResponse.redirect(
    new URL('/login', request.url)
  );

  cookieStore.getAll().forEach((cook) => {
      cookieStore.delete(cook.name);
  });

  return response;
}