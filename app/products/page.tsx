"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Search, Filter, ArrowLeft, Sparkles, Star, Mail } from "lucide-react"
import SiteHeader from "@/components/site-header"
import ProductCard from "@/components/product-card"
import { database, type Product } from "@/lib/database-persistent"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, selectedCategory, sortBy])

  const loadProducts = () => {
    try {
      const allProducts = database.getAllProducts()
      setProducts(allProducts)
    } catch (error) {
      console.error("Error loading products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }

  const categories = database.getAllCategories()
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-50 to-burgundy-50">
      <SiteHeader />

      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-maroon-600 hover:text-maroon-800">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-maroon-900 font-semibold">Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-4">Our Products</h1>
          <p className="text-lg text-maroon-700 max-w-2xl mx-auto">
            Discover our complete collection of premium spiritual products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="border-maroon-200">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="bg-gray-300 h-48 rounded mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Launching Soon Section for Products Page */
          <div className="text-center py-16">
            <Card className="border-maroon-200 bg-gradient-to-br from-white via-maroon-50 to-flame-50 shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-12">
                <div className="mb-8">
                  <div className="relative inline-block">
                    <Sparkles className="h-16 w-16 text-flame-500 mx-auto animate-pulse" />
                    <Star className="h-6 w-6 text-maroon-600 absolute -top-2 -right-2 animate-bounce" />
                  </div>
                </div>

                <Badge className="mb-6 bg-gradient-to-r from-maroon-600 to-flame-600 text-white px-4 py-2 text-sm font-semibold">
                  Coming Soon
                </Badge>

                <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">Products Launching Soon</h2>

                <p className="text-lg text-maroon-700 mb-8 leading-relaxed">
                  We're carefully curating our premium collection of camphor and incense products. Our spiritual
                  products will be available soon with the highest quality and authenticity you deserve.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white px-8">
                      <Mail className="mr-2 h-5 w-5" />
                      Get Notified
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-maroon-600 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm border border-maroon-200">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-maroon-200 focus:border-maroon-500"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 border-maroon-200">
                  <Filter className="h-4 w-4 mr-2 text-maroon-600" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 border-maroon-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            <div className="mb-6">
              <p className="text-maroon-700">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="border-maroon-200">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-maroon-900 mb-2">No products found</h3>
                  <p className="text-maroon-700 mb-4">Try adjusting your search or filter criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    className="bg-maroon-600 hover:bg-maroon-700 text-white"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
