"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Edit, Trash2, Search, Package } from "lucide-react"
import { database, type Product } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sku: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    const allProducts = database.getAllProducts()
    setProducts(allProducts)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      sku: "",
    })
    setIsAddingProduct(false)
    setEditingProduct(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.stock) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      category: formData.category || "General",
      sku: formData.sku || `SKU${Date.now()}`,
    }

    try {
      if (editingProduct) {
        database.updateProduct(editingProduct.id, productData)
        toast({
          title: "Success",
          description: "Product updated successfully",
        })
      } else {
        database.addProduct(productData)
        toast({
          title: "Success",
          description: "Product added successfully",
        })
      }

      loadProducts()
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      sku: product.sku,
    })
    setIsAddingProduct(true)
  }

  const handleDelete = (productId: string) => {
    try {
      database.deleteProduct(productId)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Button onClick={() => setIsAddingProduct(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search products by name, SKU, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Add/Edit Product Form */}
      {isAddingProduct && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="Enter SKU (auto-generated if empty)"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter category"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">{editingProduct ? "Update Product" : "Add Product"}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-gray-600">{product.sku}</p>
                </div>
                <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">₹{product.price}</span>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
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
                        <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
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
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first product"}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsAddingProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
