import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import SiteHeader from "@/components/site-header"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Arathy Camphor & Arathy Agarbathy | Jyothys Enterprises",
  description:
    "Premium quality agarbathies and camphor for your devotional needs. Explore our range of fragranced agarbathies and pure camphor products for all your spiritual rituals.",
  keywords: "agarbathi, camphor, incense sticks, puja, devotional, spiritual, ritual, prayer, sandal, rose, jasmine",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  )
}
