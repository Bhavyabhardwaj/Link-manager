import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "Link Manager - Powerful Link Management & Analytics",
  description:
    "Create beautiful bio pages, shorten URLs, and track analytics. Built for creators and professionals.",
  keywords: ["link manager", "bio links", "url shortener", "analytics", "creator tools"],
  authors: [{ name: "Link Manager Team" }],
  openGraph: {
    title: "Link Manager - Powerful Link Management & Analytics",
    description:
      "Create beautiful bio pages, shorten URLs, and track analytics. Built for creators and professionals.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "LinkCraft",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LinkCraft - Premium Link Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkCraft - The Link Manager That Sparks Conversations",
    description:
      "Beautiful bio pages. Powerful analytics. Lightning fast links. Built for creators who care about craft.",
    images: ["/og-image.png"],
    creator: "@linkcraft",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider defaultTheme="dark" storageKey="linkcraft-theme">
          <AuthProvider>
            <div className="min-h-screen bg-background text-foreground antialiased" suppressHydrationWarning>{children}</div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
