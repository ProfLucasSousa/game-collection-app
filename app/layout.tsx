import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "GameVault | My Game Library",
  description:
    "A unified game library to browse and manage your entire PC game collection across Steam, Epic, Xbox, GOG, Ubisoft, EA and Amazon.",
  keywords: [
    "game library",
    "steam",
    "epic games",
    "xbox",
    "gog",
    "ubisoft",
    "ea",
    "amazon games",
    "pc gaming",
    "game collection",
  ],
  authors: [{ name: "Lucas Sousa" }],
  creator: "Lucas Sousa",
  publisher: "Lucas Sousa",
  metadataBase: new URL("https://game-collection-app.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://game-collection-app.vercel.app",
    title: "GameVault | My Game Library",
    description:
      "Biblioteca unificada de jogos com mais de 600 títulos. Gerencie sua coleção completa de jogos PC em um só lugar.",
    siteName: "GameVault",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GameVault - My Game Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GameVault | My Game Library",
    description:
      "Biblioteca unificada de jogos com mais de 600 títulos. Gerencie sua coleção completa de jogos PC em um só lugar.",
    images: ["/opengraph-image"],
    creator: "@ProfLucasSousa",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0e14",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
