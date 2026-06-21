import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/login",
  "/auth/callback",
];

export function proxy(
  request: NextRequest
) {
  const sessionCookie =
    request.cookies.get("access_token");
  const isAuthenticated = !!sessionCookie;

  const pathname =
    request.nextUrl.pathname;

  const isPublicRoute =
    publicRoutes.some((route) =>
      pathname.startsWith(route)
   );

  if (
    !isAuthenticated &&
    !isPublicRoute
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(
      new URL("/overview", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};