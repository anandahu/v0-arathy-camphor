"use client"

import { useState } from "react"
import AdminAuth from "@/components/admin/admin-auth"
import AdminLayout from "@/components/admin/admin-layout"
import OrdersManagement from "@/components/admin/orders-management"

export default function AdminOrdersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <OrdersManagement />
      </div>
    </AdminLayout>
  )
}
