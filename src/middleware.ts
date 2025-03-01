import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/feed"];

  const isProtectedPath = protectedPaths.includes(request.nextUrl.pathname);

  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
