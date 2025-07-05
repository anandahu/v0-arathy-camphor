"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { Package, Plus, Search, Edit, Trash2, Eye, AlertTriangle, DollarSign, Archive } from "lucide-react"
import { database, type Product, type ProductStats } from "@/lib/database-persistent"
import { useToast } from "@/hooks/use-toast"

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [stats, setStats] = useState<ProductStats>({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categories: [],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    sku: "",
    image: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allProducts = database.getAllProducts()
    setProducts(allProducts)
    setStats(database.getProductStats())
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      sku: "",
      image: "",
    })
  }

  const handleAddProduct = () => {
    if (!formData.name || !formData.category || !formData.sku) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      database.addProduct(formData)
      loadData()
      resetForm()
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = () => {
    if (!selectedProduct || !formData.name || !formData.category || !formData.sku) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      database.updateProduct(selectedProduct.id, formData)
      loadData()
      resetForm()
      setIsEditDialogOpen(false)
      setSelectedProduct(null)
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = (product: Product) => {
    try {
      database.deleteProduct(product.id)
      loadData()
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

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      sku: product.sku,
      image: product.image || "",
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (product: Product) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock <= 10) {
      return <Badge variant="secondary">Low Stock</Badge>
    } else {
      return <Badge variant="default">In Stock</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Product Management</h1>
            <p className="text-amber-700">Manage your camphor and incense inventory</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Camphor">Camphor</SelectItem>
                      <SelectItem value="Incense">Incense</SelectItem>
                      <SelectItem value="Agarbathy">Agarbathy</SelectItem>
                      <SelectItem value="Dhoop">Dhoop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    placeholder="Enter stock quantity"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="bg-amber-600 hover:bg-amber-700">
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600">Total Products</p>
                  <p className="text-2xl font-bold text-amber-900">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600">Total Value</p>
                  <p className="text-2xl font-bold text-amber-900">₹{stats.totalValue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600">Low Stock</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.lowStockCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{stats.outOfStockCount}</p>
                </div>
                <Archive className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-amber-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-amber-200 focus:border-amber-400"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-amber-200">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {stats.categories.map((category) => (
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
            <Card key={product.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-amber-50 rounded-lg mb-4 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=200"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-16 w-16 text-amber-300" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-amber-900 line-clamp-2">{product.name}</h3>
                    {getStockBadge(product.stock)}
                  </div>

                  <p className="text-sm text-amber-600">SKU: {product.sku}</p>
                  <p className="text-sm text-amber-700 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-amber-900">₹{product.price}</p>
                      <p className="text-sm text-amber-600">Stock: {product.stock}</p>
                    </div>
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openViewDialog(product)}
                      className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(product)}
                      className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
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
          <Card className="border-amber-200">
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-amber-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">No products found</h3>
              <p className="text-amber-600">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="edit-sku">SKU *</Label>
                <Input
                  id="edit-sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Enter SKU"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Camphor">Camphor</SelectItem>
                    <SelectItem value="Incense">Incense</SelectItem>
                    <SelectItem value="Agarbathy">Agarbathy</SelectItem>
                    <SelectItem value="Dhoop">Dhoop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="edit-stock">Stock Quantity</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditProduct} className="bg-amber-600 hover:bg-amber-700">
                Update Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-amber-50 rounded-lg overflow-hidden">
                    {selectedProduct.image ? (
                      <img
                        src={selectedProduct.image || "/placeholder.svg"}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=300&width=300"
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-24 w-24 text-amber-300" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900">{selectedProduct.name}</h3>
                      <p className="text-amber-600">SKU: {selectedProduct.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-amber-300 text-amber-700">
                        {selectedProduct.category}
                      </Badge>
                      {getStockBadge(selectedProduct.stock)}
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-900">₹{selectedProduct.price}</p>
                      <p className="text-amber-600">Stock: {selectedProduct.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">
                        Created: {selectedProduct.createdAt.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-amber-600">
                        Updated: {selectedProduct.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Description</h4>
                  <p className="text-amber-700">{selectedProduct.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
