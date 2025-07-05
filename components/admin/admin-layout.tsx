"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Package,
  BarChart3,
  Settings,
  Users,
  FileText,
  Home,
  Menu,
  Flame,
  Bell,
  Search,
  ShoppingCart,
  Tag,
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: Tag },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const isCurrentPath = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname?.startsWith(href)
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50 to-orange-50 border-r border-amber-200">
      {/* Logo */}
      <div className="p-6 border-b border-amber-200">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-amber-900">Arathy Admin</h2>
            <p className="text-xs text-amber-600">Management Panel</p>
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
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isCurrent
                  ? "bg-amber-100 text-amber-900 border-l-4 border-amber-600"
                  : "text-amber-700 hover:bg-amber-100 hover:text-amber-900"
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
      <div className="p-4 border-t border-amber-200">
        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-900">156</p>
              <p className="text-sm text-amber-600">Total Products</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Back to Website */}
      <div className="p-4 border-t border-amber-200">
        <Link href="/">
          <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent">
            <Home className="h-4 w-4 mr-2" />
            Back to Website
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
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
          {/* Top Header - Only show this, remove duplicate */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 px-4 py-3">
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
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                  <Input placeholder="Search..." className="pl-10 w-64 border-amber-200 focus:border-amber-400" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-amber-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                </Button>

                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
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
