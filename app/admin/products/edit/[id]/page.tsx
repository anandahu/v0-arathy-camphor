import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getProductById } from "@/lib/products"
import { getAllCategories } from "@/lib/categories"
import { notFound } from "next/navigation"
import ProductForm from "@/components/admin/product-form"
import { Button } from "@/components/ui/button"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(Number.parseInt(params.id))
  const categories = getAllCategories()

  if (!product) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link href="/admin/products" className="inline-flex items-center text-amber-700 hover:text-amber-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">Dashboard</Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-600">Update product information, images, and categories</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} isEdit={true} categories={categories} />
        </CardContent>
      </Card>
    </div>
  )
}
