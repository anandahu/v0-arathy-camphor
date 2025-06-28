"use client"

import { useState } from "react"
import AdminAuth from "@/components/admin/admin-auth"
import AdminLayout from "@/components/admin/admin-layout"
import CategoriesManagement from "@/components/admin/categories-management"

export default function AdminCategoriesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <CategoriesManagement />
      </div>
    </AdminLayout>
  )
}
