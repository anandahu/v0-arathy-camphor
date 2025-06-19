import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"

async function checkAuth() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    if (!session || session.value !== "authenticated") {
      redirect("/admin/login")
    }
  } catch (error) {
    redirect("/admin/login")
  }
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await checkAuth()

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
