import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group border-maroon-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <div className="aspect-square overflow-hidden bg-gradient-to-br from-maroon-50 to-burgundy-50">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=300&width=300"
            }}
          />
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-flame-600 text-white">{discountPercentage}% OFF</Badge>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 backdrop-blur-sm border-maroon-200 hover:bg-maroon-50"
        >
          <Heart className="h-4 w-4 text-maroon-600" />
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Category */}
        <Badge variant="outline" className="border-maroon-300 text-maroon-700 text-xs">
          {product.category}
        </Badge>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-maroon-900 line-clamp-2 hover:text-maroon-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-maroon-600 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "text-flame-500 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-maroon-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-maroon-100 text-maroon-700">
              {feature}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-maroon-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
            >
              View Details
            </Button>
          </Link>
          <Button className="flex-1 bg-maroon-700 hover:bg-maroon-800 text-white" disabled={!product.inStock}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
