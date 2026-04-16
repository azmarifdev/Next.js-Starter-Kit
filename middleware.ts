import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "auth_token";

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Public routes remain accessible because matcher only targets private paths.
  matcher: ["/dashboard/:path*", "/projects/:path*", "/tasks/:path*", "/users/:path*"]
};
