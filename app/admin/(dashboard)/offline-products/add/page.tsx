import { getAllCategories } from "@/lib/categories"
import OfflineProductForm from "@/components/admin/offline-product-form"

export default function AddOfflineProductPage() {
  const categories = getAllCategories()

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add Offline Product</h1>
        <p className="text-gray-600">Create a new product for offline sales and billing</p>
      </div>

      <OfflineProductForm categories={categories} />
    </div>
  )
}
