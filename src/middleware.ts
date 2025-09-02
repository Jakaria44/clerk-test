import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware((auth, req: NextRequest) => {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // Handle dashboard subdomain
  if (hostname === "dash.ggmedia.app" || hostname.startsWith("dash.")) {
    // Define dashboard-specific routes
    const dashboardRoutes = ["/", "/topup"];
    
    // If we're on a dashboard route, rewrite to /dashboard path
    if (dashboardRoutes.includes(url.pathname)) {
      if (url.pathname === "/") {
        url.pathname = "/dashboard";
        return NextResponse.rewrite(url);
      } else {
        url.pathname = `/dashboard${url.pathname}`;
        return NextResponse.rewrite(url);
      }
    }
    
    // For non-dashboard routes on dashboard subdomain, redirect to main domain
    if (
      !url.pathname.startsWith("/dashboard") &&
      !url.pathname.startsWith("/_next") &&
      !url.pathname.startsWith("/api") &&
      !dashboardRoutes.includes(url.pathname)
    ) {
      const mainDomainUrl = new URL(url);
      mainDomainUrl.hostname = "ggmedia.app";
      return NextResponse.redirect(mainDomainUrl);
    }
  }

  // Handle main domain - redirect dashboard routes to subdomain
  if (
    hostname === "ggmedia.app" ||
    (!hostname.includes("dash") && hostname.includes("ggmedia.app"))
  ) {
    if (url.pathname.startsWith("/dashboard")) {
      const dashboardUrl = new URL(url);
      dashboardUrl.hostname = "dash.ggmedia.app";
      dashboardUrl.pathname = url.pathname.replace("/dashboard", "") || "/";
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
