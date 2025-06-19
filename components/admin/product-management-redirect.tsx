"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package } from "lucide-react"

export default function ProductManagementRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timeout = setTimeout(() => {
      router.push("/admin/products")
    }, 3000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <Package className="h-12 w-12 text-amber-600 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Product Management</h2>
      <p className="text-gray-600 mb-6 text-center">
        You are being redirected to the product management page. If you are not redirected automatically, please click
        the button below.
      </p>
      <Button onClick={() => router.push("/admin/products")} className="bg-amber-600 hover:bg-amber-700">
        Go to Product Management
      </Button>
    </div>
  )
}
