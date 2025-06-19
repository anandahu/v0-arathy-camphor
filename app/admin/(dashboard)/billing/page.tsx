import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Users, CreditCard, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import { getAllInvoices, getAllCustomers, getAllPayments, getFinancialReport } from "@/lib/billing"
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

export default async function BillingDashboard() {
  await checkAuth()

  const invoices = getAllInvoices()
  const customers = getAllCustomers()
  const payments = getAllPayments()

  // Get financial report for current month
  const currentDate = new Date()
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const monthlyReport = getFinancialReport(startOfMonth, endOfMonth)

  const recentInvoices = invoices.slice(0, 5)
  const recentPayments = payments.slice(0, 5)

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
          <h1 className="text-3xl font-bold text-gray-900">Billing Dashboard</h1>
          <p className="text-gray-600">Manage invoices, customers, and payments</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/admin/billing/invoices/add">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/billing/customers/add">
              <Plus className="h-4 w-4 mr-2" />
              New Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
            <p className="text-xs text-muted-foreground">{monthlyReport.totalInvoices} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyReport.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">₹{monthlyReport.totalPaid.toFixed(2)} collected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyReport.pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{monthlyReport.pendingInvoices} pending invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/billing/invoices">
                  <FileText className="h-6 w-6 mb-2" />
                  Manage Invoices
                </Link>
              </Button>

              <Button asChild className="h-20 flex-col bg-purple-600 hover:bg-purple-700">
                <Link href="/admin/billing/customers">
                  <Users className="h-6 w-6 mb-2" />
                  Manage Customers
                </Link>
              </Button>

              <Button asChild className="h-20 flex-col bg-green-600 hover:bg-green-700">
                <Link href="/admin/billing/payments">
                  <CreditCard className="h-6 w-6 mb-2" />
                  View Payments
                </Link>
              </Button>

              <Button asChild className="h-20 flex-col bg-orange-600 hover:bg-orange-700">
                <Link href="/admin/billing/reports">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  Financial Reports
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Invoices
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/billing/invoices">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.length > 0 ? (
                recentInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-gray-600">{invoice.customerName}</p>
                      <p className="text-sm text-gray-500">{invoice.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{invoice.totalAmount.toFixed(2)}</p>
                      <Badge className={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No invoices yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Payments
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/billing/payments">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.length > 0 ? (
                recentPayments.map((payment) => {
                  const invoice = invoices.find((inv) => inv.id === payment.invoiceId)
                  return (
                    <div key={payment.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{invoice?.invoiceNumber || "Unknown Invoice"}</p>
                        <p className="text-sm text-gray-600">{invoice?.customerName}</p>
                        <p className="text-sm text-gray-500">{payment.date.toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{payment.amount.toFixed(2)}</p>
                        <Badge className="bg-blue-100 text-blue-800">{payment.method}</Badge>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-500 text-center py-4">No payments yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
