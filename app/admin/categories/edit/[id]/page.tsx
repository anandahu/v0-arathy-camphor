import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getCategoryById } from "@/lib/categories"
import { notFound } from "next/navigation"
import CategoryForm from "@/components/admin/category-form"
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

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  await checkAuth()

  const category = getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-8">
            <Link
              href="/admin/categories"
              className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Categories
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
            <p className="text-gray-600">Update category information</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Information</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryForm category={category} isEdit={true} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
