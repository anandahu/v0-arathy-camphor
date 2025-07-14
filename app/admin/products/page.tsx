"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Package, Search, Trash2, Eye, Plus, ArrowLeft } from "lucide-react"
import { database, type Product } from "@/lib/database-persistent"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    const allProducts = database.getAllProducts()
    setProducts(allProducts)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (product: Product) => {
    try {
      database.deleteProduct(product.id)
      loadProducts()
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const openViewDialog = (product: Product) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock <= 10) {
      return (
        <Badge variant="secondary" className="bg-flame-100 text-flame-800">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      )
    }
  }

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-maroon-900">Manage Products</h1>
              <p className="text-maroon-600">View and manage your product inventory</p>
            </div>
          </div>
          <Link href="/admin/add-product">
            <Button className="bg-maroon-600 hover:bg-maroon-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card className="border-maroon-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                  <Input
                    placeholder="Search products by name, description, or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-maroon-200 focus:border-maroon-400"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-maroon-200">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-maroon-200 hover:shadow-lg transition-shadow card-hover">
              <CardContent className="p-4">
                <div className="aspect-square bg-maroon-50 rounded-lg mb-4 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => openViewDialog(product)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=200"
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                      onClick={() => openViewDialog(product)}
                    >
                      <Package className="h-16 w-16 text-maroon-300" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-maroon-900 line-clamp-2">{product.name}</h3>
                    {getStockBadge(product.stock)}
                  </div>

                  <p className="text-sm text-maroon-600">SKU: {product.sku}</p>
                  <p className="text-sm text-maroon-700 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-maroon-900">₹{product.price}</p>
                      <p className="text-sm text-maroon-600">Stock: {product.stock}</p>
                    </div>
                    <Badge variant="outline" className="border-maroon-300 text-maroon-700">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openViewDialog(product)}
                      className="flex-1 border-maroon-200 text-maroon-700 hover:bg-maroon-50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProduct(product)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card className="border-maroon-200">
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-maroon-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-maroon-900 mb-2">No products found</h3>
              <p className="text-maroon-600 mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first product"}
              </p>
              <Link href="/admin/add-product">
                <Button className="bg-maroon-600 hover:bg-maroon-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Images Section */}
                  <div className="space-y-4">
                    {selectedProduct.images && selectedProduct.images.length > 0 ? (
                      <div className="space-y-2">
                        <div className="aspect-square bg-maroon-50 rounded-lg overflow-hidden">
                          <img
                            src={selectedProduct.images[0] || "/placeholder.svg"}
                            alt={selectedProduct.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=400&width=400"
                            }}
                          />
                        </div>
                        {selectedProduct.images.length > 1 && (
                          <div className="grid grid-cols-4 gap-2">
                            {selectedProduct.images.slice(1).map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`${selectedProduct.name} ${index + 2}`}
                                className="w-full h-16 object-cover rounded border"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=64&width=64"
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square bg-maroon-50 rounded-lg flex items-center justify-center">
                        <Package className="h-24 w-24 text-maroon-300" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-maroon-900">{selectedProduct.name}</h3>
                      <p className="text-maroon-600">SKU: {selectedProduct.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-maroon-300 text-maroon-700">
                        {selectedProduct.category}
                      </Badge>
                      {getStockBadge(selectedProduct.stock)}
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-maroon-900">₹{selectedProduct.price}</p>
                      <p className="text-maroon-600">Stock: {selectedProduct.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-maroon-600">
                        Created: {selectedProduct.createdAt.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-maroon-600">
                        Updated: {selectedProduct.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-maroon-900 mb-2">Description</h4>
                  <p className="text-maroon-700">{selectedProduct.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
