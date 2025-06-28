import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SiteHeader from "@/components/site-header"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"
import { Search, ArrowLeft } from "lucide-react"

export default function ProductsPage() {
  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="flex items-center text-amber-600 hover:text-amber-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Our Products</h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Discover our complete range of premium camphor and incense products
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-amber-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                  <Input placeholder="Search products..." className="pl-10 border-amber-200 focus:border-amber-400" />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select defaultValue="all">
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select defaultValue="featured">
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="border-amber-300 text-amber-700 cursor-pointer hover:bg-amber-50">
            All Products ({products.length})
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="border-amber-300 text-amber-700 cursor-pointer hover:bg-amber-50"
            >
              {category} ({products.filter((p) => p.category === category).length})
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
          >
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
