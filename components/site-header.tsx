"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, LogIn } from "lucide-react"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const isAdminActive = pathname.startsWith("/admin")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/images/arathy-logo.jpg" alt="Arathy Camphor" className="h-10 w-10 rounded-lg" />
          <span className="text-xl font-bold text-maroon-900">Arathy Camphor & Agarbathy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-maroon-700 ${
                isActive(item.href) ? "text-maroon-700 border-b-2 border-maroon-700" : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button
            asChild
            variant="outline"
            size="sm"
            className={`border-maroon-600 text-maroon-700 hover:bg-maroon-700 hover:text-white ${
              isAdminActive ? "bg-maroon-700 text-white" : ""
            }`}
          >
            <Link href="/admin" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-maroon-900">Menu</span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                      isActive(item.href)
                        ? "bg-maroon-100 text-maroon-700"
                        : "text-gray-600 hover:text-maroon-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-md border transition-colors ${
                    isAdminActive
                      ? "bg-maroon-700 text-white border-maroon-700"
                      : "text-maroon-700 border-maroon-600 hover:bg-maroon-700 hover:text-white"
                  }`}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
