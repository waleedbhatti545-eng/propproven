import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Check if the host is the dedicated B2B portal subdomain
  // Works for both production (propfirm.propproven.com) and local dev (propfirm.localhost:3000)
  const isPropFirmSubdomain = hostname.startsWith("propfirm.") || hostname === "propfirm.propproven.com";

  if (isPropFirmSubdomain) {
    // Prevent rewriting if already fetching the internal rewrite path (prevents loops)
    if (!url.pathname.startsWith('/propfirm-admin')) {
      return NextResponse.rewrite(new URL(`/propfirm-admin${url.pathname}`, req.url));
    }
  }

  // Prevent direct URL access to the internal /propfirm-admin path on the main domain wrapper
  if (!isPropFirmSubdomain && url.pathname.startsWith('/propfirm-admin')) {
      return NextResponse.redirect(new URL('/404', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Avoid running middleware on static files and API routes to save execution time
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
