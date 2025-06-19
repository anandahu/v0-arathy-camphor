import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getAllCategories } from "@/lib/categories"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"
import DeleteCategoryButton from "@/components/admin/delete-category-button"

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

export default async function AdminCategoriesPage() {
  await checkAuth()

  const categories = getAllCategories()

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center text-amber-700 hover:text-amber-900 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
              <p className="text-gray-600">Manage product categories and their properties</p>
            </div>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/admin/categories/add">
                <Plus className="h-4 w-4 mr-2" />
                Add New Category
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Categories ({categories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {categories.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first category.</p>
                  <Button asChild className="bg-amber-600 hover:bg-amber-700">
                    <Link href="/admin/categories/add">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Category
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Slug</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Created</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <p className="font-medium">{category.name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{category.slug}</code>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-gray-600 max-w-xs truncate">{category.description}</p>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-500">{category.createdAt.toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/admin/categories/edit/${category.id}`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <DeleteCategoryButton categoryId={category.id} categoryName={category.name} />
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
      </main>
    </div>
  )
}
