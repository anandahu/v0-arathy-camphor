"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Lock } from "lucide-react"

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className={`text-xl font-bold ${isScrolled ? "text-amber-800" : "text-white"}`}>Arathy Products</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium hover:text-amber-500 transition-colors ${
                isScrolled ? "text-amber-900" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#products"
              className={`font-medium hover:text-amber-500 transition-colors ${
                isScrolled ? "text-amber-900" : "text-white"
              }`}
            >
              Products
            </Link>
            <Link
              href="/#about"
              className={`font-medium hover:text-amber-500 transition-colors ${
                isScrolled ? "text-amber-900" : "text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/#testimonials"
              className={`font-medium hover:text-amber-500 transition-colors ${
                isScrolled ? "text-amber-900" : "text-white"
              }`}
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className={`font-medium hover:text-amber-500 transition-colors ${
                isScrolled ? "text-amber-900" : "text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <Button
              variant={isScrolled ? "default" : "outline"}
              size="sm"
              className={isScrolled ? "bg-amber-600 hover:bg-amber-700" : "text-white border-white hover:bg-white/10"}
              asChild
            >
              <Link href="/admin/login">
                <Lock className="h-4 w-4 mr-2" /> Admin Login
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? (
              <X className={isScrolled ? "text-amber-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-amber-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-medium text-amber-900 hover:text-amber-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#products"
                className="font-medium text-amber-900 hover:text-amber-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/#about"
                className="font-medium text-amber-900 hover:text-amber-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#testimonials"
                className="font-medium text-amber-900 hover:text-amber-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/#contact"
                className="font-medium text-amber-900 hover:text-amber-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                className="bg-amber-600 hover:bg-amber-700 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
                asChild
              >
                <Link href="/admin/login">
                  <Lock className="h-4 w-4 mr-2" /> Admin Login
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
