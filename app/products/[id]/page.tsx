"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import SiteHeader from "@/components/site-header"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import { database, type Product } from "@/lib/database-persistent"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Package, Truck, Shield, Award } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id as string)
    }
  }, [params.id])

  const loadProduct = (id: string) => {
    setLoading(true)
    const foundProduct = database.getProductById(id)
    setProduct(foundProduct)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="animate-pulse">
            <div className="h-8 bg-amber-200 rounded w-1/4 mb-8"></div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-amber-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-amber-200 rounded w-3/4"></div>
                <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                <div className="h-6 bg-amber-200 rounded w-1/4"></div>
                <div className="h-20 bg-amber-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-3xl font-bold text-amber-900 mb-4">Product Not Found</h1>
            <p className="text-amber-700 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const inStock = product.stock > 0
  const rating = 4.5 // Default rating
  const reviews = Math.floor(Math.random() * 50) + 10 // Random review count

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-amber-600 hover:text-amber-800">
            Home
          </Link>
          <span className="text-amber-400">/</span>
          <Link href="/products" className="text-amber-600 hover:text-amber-800">
            Products
          </Link>
          <span className="text-amber-400">/</span>
          <span className="text-amber-800 font-medium">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border-2 border-amber-200 overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=600&width=600"
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-amber-50">
                  <Package className="h-24 w-24 text-amber-300" />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded border-2 overflow-hidden ${
                      selectedImageIndex === index ? "border-amber-600" : "border-amber-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=100&width=100"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="border-amber-300 text-amber-700 mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">{product.name}</h1>
              <p className="text-amber-600">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? "text-flame-500 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-amber-700">
                {rating} ({reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-amber-900">₹{product.price}</div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
                  {inStock ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Description</h3>
              <p className="text-amber-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white" disabled={!inStock}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card className="border-amber-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-amber-600" />
                    <span className="text-sm text-amber-700">Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-600" />
                    <span className="text-sm text-amber-700">Quality Assured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    <span className="text-sm text-amber-700">Premium Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-amber-600" />
                    <span className="text-sm text-amber-700">Secure Packaging</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-16 bg-amber-200" />

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />

        <Separator className="my-16 bg-amber-200" />

        {/* Related Products */}
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </div>
  )
}
