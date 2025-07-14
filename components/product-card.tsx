"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye } from "lucide-react"
import type { Product } from "@/lib/database-persistent"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const primaryImage =
    product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg?height=300&width=300"

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-maroon-200 bg-gradient-to-br from-white to-maroon-50 overflow-hidden">
      <div className="relative overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        <img
          src={imageError ? "/placeholder.svg?height=300&width=300" : primaryImage}
          alt={product.name}
          className={`w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />

        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white">Low Stock</Badge>
        )}

        {product.stock === 0 && <Badge className="absolute top-2 left-2 bg-red-500 text-white">Out of Stock</Badge>}

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/products/${product.id}`}>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs border-maroon-300 text-maroon-700">
            {product.category}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg text-maroon-900 mb-2 line-clamp-2 group-hover:text-maroon-700 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-maroon-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating || 4.5) ? "text-flame-500 fill-current" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-maroon-600 ml-1">({product.rating || 4.5})</span>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold text-maroon-900">₹{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-1">₹{product.originalPrice}</span>
            )}
          </div>
        </div>

        {product.stock > 0 && <p className="text-xs text-maroon-600">{product.stock} in stock</p>}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-maroon-300 text-maroon-700 hover:bg-maroon-50 bg-transparent"
            >
              View Details
            </Button>
          </Link>
          <Button className="bg-maroon-600 hover:bg-maroon-700 text-white" disabled={product.stock === 0}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
