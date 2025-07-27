import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default auth(async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/"];
  const isPublicRoute = publicRoutes.includes(pathname);

  const isAuthenticated = !!request.auth;

  if (!isPublicRoute && !isAuthenticated) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
