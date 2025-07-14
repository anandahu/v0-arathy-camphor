"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Package, BarChart3, Home, Menu, Bell, Search, LogOut, Plus, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { database } from "@/lib/database-persistent"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Add Product", href: "/admin/add-product", icon: Plus },
    { name: "Manage Products", href: "/admin/products", icon: List },
    { name: "Categories", href: "/admin/categories", icon: Package },
  ]

  const isCurrentPath = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname?.startsWith(href)
  }

  const handleLogout = () => {
    database.clearAuthSession()
    router.push("/admin")
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-maroon-50 to-burgundy-50 border-r border-maroon-200">
      {/* Logo */}
      <div className="p-6 border-b border-maroon-200">
        <Link href="/" className="flex items-center space-x-3">
          <img src="/images/arathy-logo.jpg" alt="Arathy Logo" className="h-8 w-auto rounded-md" />
          <div>
            <h2 className="text-lg font-bold text-maroon-900">Arathy Admin</h2>
            <p className="text-xs text-maroon-600">Product Management</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isCurrent = isCurrentPath(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                isCurrent
                  ? "bg-maroon-100 text-maroon-900 border-l-4 border-maroon-600 shadow-sm"
                  : "text-maroon-700 hover:bg-maroon-100 hover:text-maroon-900"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-maroon-200">
        <Card className="border-maroon-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-maroon-900">{database.getAllProducts().length}</p>
              <p className="text-sm text-maroon-600">Total Products</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back to Website & Logout */}
      <div className="p-4 border-t border-maroon-200 space-y-2">
        <Link href="/">
          <Button
            variant="outline"
            className="w-full border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Website
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-50 via-burgundy-50 to-flame-50">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-maroon-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </Sheet>

                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-64 border-maroon-200 focus:border-maroon-400"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-maroon-600" />
                  {database.getLowStockProducts().length > 0 && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                  )}
                </Button>

                <div className="w-8 h-8 bg-gradient-to-br from-maroon-400 to-burgundy-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
