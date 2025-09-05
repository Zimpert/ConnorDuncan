import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono } from "next/font/google"
import "./globals.css"

const geist = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Connor Duncan - Full Stack Developer",
  description: "Futuristic developer portfolio showcasing skills, projects, and aspirations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
