import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware((auth, req: NextRequest) => {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") || "";

  // Handle dashboard subdomain
  if (hostname === "dash.ggmedia.app" || hostname.startsWith("dash.")) {
    // If we're on the dashboard subdomain, rewrite to /dashboard routes
    if (url.pathname === "/") {
      url.pathname = "/dashboard";
      return NextResponse.rewrite(url);
    }

    // For other paths on dashboard subdomain, prefix with /dashboard
    if (
      !url.pathname.startsWith("/dashboard") &&
      !url.pathname.startsWith("/_next") &&
      !url.pathname.startsWith("/api")
    ) {
      url.pathname = `/dashboard${url.pathname}`;
      return NextResponse.rewrite(url);
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
