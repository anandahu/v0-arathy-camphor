import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import InvoiceForm from "@/components/admin/invoice-form"

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

export default async function AddInvoicePage() {
  await checkAuth()

  return (
    <div className="p-6">
      <div className="mb-8">
        <Link
          href="/admin/billing/invoices"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Invoice</h1>
        <p className="text-gray-600">Generate an invoice for a customer</p>
      </div>

      <InvoiceForm />
    </div>
  )
}
