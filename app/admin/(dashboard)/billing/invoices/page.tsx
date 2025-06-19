import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Download, FileText } from "lucide-react"
import Link from "next/link"
import { getAllInvoices } from "@/lib/billing"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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

export default async function InvoicesPage() {
  await checkAuth()

  const invoices = getAllInvoices()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-600">Create and manage customer invoices</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link href="/admin/billing">Back to Billing</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/admin/billing/invoices/add">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {invoices.filter((inv) => inv.status === "paid").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {invoices.filter((inv) => inv.status === "sent").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {invoices.filter((inv) => inv.status === "overdue").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices ({invoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first invoice.</p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/admin/billing/invoices/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Invoice #</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Due Date</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium">{invoice.invoiceNumber}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{invoice.customerName}</p>
                          {invoice.customerGST && <p className="text-sm text-gray-500">GST: {invoice.customerGST}</p>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{invoice.createdAt.toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{invoice.dueDate.toLocaleDateString()}</td>
                      <td className="py-3 px-4 font-medium">₹{invoice.totalAmount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/billing/invoices/${invoice.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/billing/invoices/edit/${invoice.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
