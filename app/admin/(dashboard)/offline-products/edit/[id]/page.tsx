import { notFound } from "next/navigation"
import { getAllCategories } from "@/lib/categories"
import { getOfflineProductById } from "@/lib/billing"
import OfflineProductForm from "@/components/admin/offline-product-form"

interface EditOfflineProductPageProps {
  params: {
    id: string
  }
}

export default function EditOfflineProductPage({ params }: EditOfflineProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = getOfflineProductById(productId)
  const categories = getAllCategories()

  if (!product) {
    notFound()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Offline Product</h1>
        <p className="text-gray-600">Update product information for offline sales and billing</p>
      </div>

      <OfflineProductForm product={product} isEdit={true} categories={categories} />
    </div>
  )
}
