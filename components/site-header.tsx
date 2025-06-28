"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const isCurrentPath = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-maroon-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img src="/images/arathy-logo.jpg" alt="Arathy Camphor Logo" className="h-10 w-auto rounded-md shadow-sm" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-maroon-900">Arathy Camphor</h1>
              <p className="text-xs text-maroon-600 -mt-1">& Agarbathy</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-maroon-600 ${
                  isCurrentPath(item.href) ? "text-maroon-600 border-b-2 border-maroon-600 pb-1" : "text-maroon-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src="/images/arathy-logo.jpg" alt="Arathy Logo" className="h-8 w-auto rounded" />
                  <span className="font-bold text-maroon-900">Arathy</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isCurrentPath(item.href)
                        ? "bg-maroon-100 text-maroon-900"
                        : "text-maroon-700 hover:bg-maroon-50 hover:text-maroon-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
