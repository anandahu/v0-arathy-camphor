import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Package, DollarSign, Archive, Tag } from "lucide-react"
import { getOfflineProductById, calculateUnitPrice } from "@/lib/billing"
import { getAllCategories } from "@/lib/categories"
import DeleteOfflineProductButton from "@/components/admin/delete-offline-product-button"
import Image from "next/image"

interface ViewOfflineProductPageProps {
  params: {
    id: string
  }
}

export default function ViewOfflineProductPage({ params }: ViewOfflineProductPageProps) {
  const productId = Number.parseInt(params.id)
  const product = getOfflineProductById(productId)
  const categories = getAllCategories()

  if (!product) {
    notFound()
  }

  const category = categories.find((c) => c.id === product.category)

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

  const getStockStatus = () => {
    const stock = product.stock || 0
    if (stock === 0) return { text: "Out of Stock", color: "text-red-600" }
    if (stock <= 10) return { text: "Low Stock", color: "text-orange-600" }
    return { text: "In Stock", color: "text-green-600" }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/offline-products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600">Offline Product Details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href={`/admin/offline-products/edit/${product.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Product
            </Link>
          </Button>
          <DeleteOfflineProductButton productId={product.id} productName={product.name} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Product Name</label>
                  <p className="text-lg font-semibold">{product.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">SKU</label>
                  <p className="text-lg">{product.sku || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-lg">{category?.name || "Unknown Category"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Manufacturer</label>
                  <p className="text-lg">{product.manufacturer || "Not specified"}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-700 mt-1">{product.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Units */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing & Units
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-500">Base Price</label>
                <p className="text-2xl font-bold text-green-600">₹{product.basePrice}</p>
                <p className="text-sm text-gray-500">Price per base unit (gram)</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Available Units</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.units.map((unit, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-3 ${unit.isDefault ? "border-amber-300 bg-amber-50" : "border-gray-200"}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {unit.name} ({unit.abbreviation})
                            {unit.isDefault && <Badge className="ml-2 bg-amber-100 text-amber-800">Default</Badge>}
                          </p>
                          <p className="text-sm text-gray-600">Base Quantity: {unit.baseQuantity}</p>
                          <p className="text-sm text-gray-600">Multiplier: {unit.priceMultiplier}x</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{calculateUnitPrice(product.basePrice, unit)}</p>
                          <p className="text-xs text-gray-500">per {unit.name.toLowerCase()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stock Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="h-5 w-5 mr-2" />
                Stock Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{product.stock || 0}</p>
                <p className="text-sm text-gray-500">Units in stock</p>
                <Badge
                  className={`mt-2 ${stockStatus.color.replace("text-", "bg-").replace("-600", "-100")} ${stockStatus.color}`}
                >
                  {stockStatus.text}
                </Badge>
              </div>

              {(product.stock || 0) <= 10 && (product.stock || 0) > 0 && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Low Stock Warning:</strong> Only {product.stock} units remaining
                  </p>
                </div>
              )}

              {(product.stock || 0) === 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Out of Stock:</strong> This product is currently unavailable
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  Product Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} className={getTagColor(tag)}>
                      {tag.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Product ID</label>
                <p className="text-sm">{product.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm">{product.createdAt?.toLocaleDateString() || "Unknown"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm">{product.updatedAt?.toLocaleDateString() || "Unknown"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Type</label>
                <Badge className="bg-purple-100 text-purple-800">Offline Product</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
