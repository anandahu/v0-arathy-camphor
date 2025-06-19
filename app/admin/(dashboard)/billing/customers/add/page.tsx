import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import CustomerForm from "@/components/admin/customer-form"

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

export default async function AddCustomerPage() {
  await checkAuth()

  return (
    <div className="p-6">
      <div className="mb-8">
        <Link
          href="/admin/billing/customers"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Customer</h1>
        <p className="text-gray-600">Create a new customer profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm />
        </CardContent>
      </Card>
    </div>
  )
}
