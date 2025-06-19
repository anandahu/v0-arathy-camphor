import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only check auth for specific admin routes, not login
  const protectedPaths = ["/admin/dashboard", "/admin/products", "/admin/enquiries", "/admin/users", "/admin/settings"]

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    const session = request.cookies.get("admin-session")

    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
