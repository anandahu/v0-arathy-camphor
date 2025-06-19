"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  FolderOpen,
  Receipt,
  ShoppingCart,
} from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderOpen },
  { name: "Offline Products", href: "/admin/offline-products", icon: ShoppingCart },
  { name: "Billing", href: "/admin/billing", icon: Receipt },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Clear the cookie by setting it to expire
      document.cookie = "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      // Redirect to login
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="w-64 bg-amber-800 text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-amber-200 text-sm">Arathy Products</p>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-amber-700 text-white" : "text-amber-100 hover:bg-amber-700 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4">
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="outline"
          className="w-full border-amber-600 text-amber-100 hover:bg-amber-700 hover:text-white disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  )
}
