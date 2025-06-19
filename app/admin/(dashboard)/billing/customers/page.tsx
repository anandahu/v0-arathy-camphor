import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Eye, Users } from "lucide-react"
import Link from "next/link"
import { getAllCustomers } from "@/lib/billing"
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

export default async function CustomersPage() {
  await checkAuth()

  const customers = getAllCustomers()

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage customer information and details</p>
        </div>
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link href="/admin/billing">Back to Billing</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/admin/billing/customers/add">
              <Plus className="h-4 w-4 mr-2" />
              New Customer
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">With GST</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((customer) => customer.gstNumber).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">With Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((customer) => customer.email).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Customers ({customers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {customers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first customer.</p>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/admin/billing/customers/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-left py-3 px-4">GST Number</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <p className="font-medium">{customer.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          {customer.phone && <p className="text-sm">{customer.phone}</p>}
                          {customer.email && <p className="text-sm text-gray-600">{customer.email}</p>}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm">
                            {customer.address.city}, {customer.address.state}
                          </p>
                          <p className="text-sm text-gray-600">{customer.address.pincode}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {customer.gstNumber ? (
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">{customer.gstNumber}</code>
                        ) : (
                          <span className="text-gray-400 text-sm">Not provided</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{customer.createdAt.toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/billing/customers/${customer.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/admin/billing/customers/edit/${customer.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
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
