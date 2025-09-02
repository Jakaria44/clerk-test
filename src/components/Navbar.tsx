"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Helper function to get the correct dashboard URL
  const getDashboardUrl = (path = "") => {
    if (typeof window !== "undefined") {
      const currentHost = window.location.hostname;
      // If we're already on dashboard subdomain, use relative paths
      if (
        currentHost.includes("dash.ggmedia.app") ||
        currentHost.startsWith("dash.")
      ) {
        return path || "/";
      }
      // If we're on main domain or localhost, redirect to dashboard subdomain
      if (currentHost.includes("ggmedia.app")) {
        return `https://dash.ggmedia.app${path}`;
      }
      // For local development, use relative paths
      return `/dashboard${path}`;
    }
    // Server-side fallback
    return `/dashboard${path}`;
  };

  // Helper function to get the correct main domain URL
  const getMainDomainUrl = (path = "") => {
    if (typeof window !== "undefined") {
      const currentHost = window.location.hostname;
      // If we're on dashboard subdomain, redirect to main domain
      if (
        currentHost.includes("dash.ggmedia.app") ||
        currentHost.startsWith("dash.")
      ) {
        return `https://ggmedia.app${path}`;
      }
      // If we're already on main domain, use relative paths
      return path;
    }
    // Server-side fallback
    return path;
  };

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: getMainDomainUrl("/#services"), label: "Services" },
    { href: getMainDomainUrl("/#case-studies"), label: "Case Studies" },
    { href: getDashboardUrl(), label: "Dashboard", authOnly: true },
    { href: getMainDomainUrl("/contact"), label: "Contact" },
  ];

  return (
    <header
      className="p-4 border-neutral-200/60 border-b bg-white backdrop-blur-sm supports-[backdrop-filter]:bg-white/90 fixed top-0 z-50 w-full transition-all duration-300 ease-in-out"
      role="banner"
    >
      {/* Desktop navbar */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-slate-700 transition-colors"
        >
          Golden Gate Media
        </Link>
        <div className="flex gap-6 items-center">
          <nav className="flex gap-6" aria-label="Main navigation">
            {navItems.map(({ href, label, authOnly }) =>
              authOnly ? (
                <SignedIn key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 hover:text-slate-700 transition-colors"
                  >
                    {label}
                  </Link>
                </SignedIn>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-slate-700 transition-colors"
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Auth Buttons */}
          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal" forceRedirectUrl={getDashboardUrl()}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal" forceRedirectUrl={getDashboardUrl()}>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold text-gray-800">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.fullName || "User"}
                </div>
                <div className="text-xs text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 rounded-full",
                    userButtonPopoverCard: "shadow-lg border border-gray-200",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="flex md:hidden items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-slate-700 transition-colors"
        >
          GG Media
        </Link>
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link
              href={getDashboardUrl()}
              className="text-gray-600 hover:text-slate-700 transition-colors"
            >
              Dashboard
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl={getDashboardUrl()}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200/60 bg-white">
          <nav className="px-4 py-6 space-y-4" aria-label="Mobile navigation">
            {navItems.map(({ href, label, authOnly }) =>
              authOnly ? (
                <SignedIn key={href}>
                  <Link
                    href={href}
                    className="block text-lg font-medium transition-opacity hover:opacity-70 border-b border-neutral-200/60 pb-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </SignedIn>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="block text-lg font-medium transition-opacity hover:opacity-70 border-b border-neutral-200/60 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            )}

            {/* Auth section */}
            <div className="pt-6 space-y-3">
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl={getDashboardUrl()}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" forceRedirectUrl={getDashboardUrl()}>
                  <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center gap-4 border-t border-neutral-200/60 pt-4">
                  <div className="flex items-center gap-3">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-full",
                          userButtonPopoverCard:
                            "shadow-lg border border-gray-200",
                        },
                      }}
                    />
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.fullName || "User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user?.primaryEmailAddress?.emailAddress}
                      </div>
                    </div>
                  </div>
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
