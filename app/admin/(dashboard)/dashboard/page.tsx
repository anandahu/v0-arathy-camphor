import ProductManagementRedirect from "@/components/admin/product-management-redirect"

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Admin Dashboard</h1>
        {/* Product Management Redirect */}
        <ProductManagementRedirect />
      </div>
    </main>
  )
}
