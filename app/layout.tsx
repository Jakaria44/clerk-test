import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import Navbar from "@/components/Navbar"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Golden Gate Media - Bridge Your Brand to the World",
  description:
    "Digital media buying agency connecting brands with audiences through powerful campaigns. From precision targeting to global scale.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            {children}
          </Suspense>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
