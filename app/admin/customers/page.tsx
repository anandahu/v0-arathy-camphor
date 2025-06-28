"use client"

import { useState } from "react"
import AdminAuth from "@/components/admin/admin-auth"
import AdminLayout from "@/components/admin/admin-layout"
import CustomersManagement from "@/components/admin/customers-management"

export default function AdminCustomersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <CustomersManagement />
      </div>
    </AdminLayout>
  )
}
