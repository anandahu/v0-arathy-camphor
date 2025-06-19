import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Edit, Eye, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getAllOfflineProducts } from "@/lib/billing"
import { getAllCategories } from "@/lib/categories"
import DeleteOfflineProductButton from "@/components/admin/delete-offline-product-button"
import Image from "next/image"

export default function OfflineProductsPage() {
  const offlineProducts = getAllOfflineProducts()
  const categories = getAllCategories()

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "top-selling":
        return "bg-green-100 text-green-800"
      case "best-selling":
        return "bg-blue-100 text-blue-800"
      case "offer":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || "Unknown Category"
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offline Products</h1>
          <p className="text-gray-600">Manage products for offline sales and billing</p>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/admin/offline-products/add">
            <Plus className="h-4 w-4 mr-2" />
            Add Offline Product
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Products</label>
              <Input placeholder="Search by name or SKU..." className="border-amber-200 focus:border-amber-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select className="w-full p-2 border border-amber-200 rounded-md focus:border-amber-500">
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stock Status</label>
              <select className="w-full p-2 border border-amber-200 rounded-md focus:border-amber-500">
                <option value="">All Products</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{offlineProducts.length}</p>
              </div>
              <Package className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {offlineProducts.filter((p) => (p.stock || 0) > 0).length}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-orange-600">
                  {offlineProducts.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 10).length}
                </p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {offlineProducts.filter((p) => (p.stock || 0) === 0).length}
                </p>
              </div>
              <Package className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      {offlineProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No offline products found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first offline product for billing.</p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/admin/offline-products/add">
                <Plus className="h-4 w-4 mr-2" />
                Add First Offline Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offlineProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                  {product.tags?.map((tag) => (
                    <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
                      {tag.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Base Price</p>
                      <p className="font-bold text-lg">₹{product.basePrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Stock</p>
                      <p
                        className={`font-medium ${
                          (product.stock || 0) === 0
                            ? "text-red-600"
                            : (product.stock || 0) <= 10
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      >
                        {product.stock || 0} units
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Category: {getCategoryName(product.category)}</p>
                    {product.sku && <p className="text-sm text-gray-500">SKU: {product.sku}</p>}
                    <p className="text-sm text-gray-500">Units: {product.units.length} configured</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex space-x-2">
                      <Button asChild size="sm" variant="outline" className="border-blue-300 hover:bg-blue-50">
                        <Link href={`/admin/offline-products/view/${product.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="border-amber-300 hover:bg-amber-50">
                        <Link href={`/admin/offline-products/edit/${product.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <DeleteOfflineProductButton productId={product.id} productName={product.name} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
