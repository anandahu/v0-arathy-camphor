"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { useToast } from "@/hooks/use-toast"
import { database } from "@/lib/database-persistent"
import { Plus, Edit, Trash2, Package, Tag } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  productCount: number
  createdAt: Date
}

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    const stats = database.getProductStats()
    const categoryData: Category[] = stats.categories.map((categoryName) => ({
      id: categoryName.toLowerCase().replace(/\s+/g, "-"),
      name: categoryName,
      description: getCategoryDescription(categoryName),
      productCount: database.getProductsByCategory(categoryName).length,
      createdAt: new Date(),
    }))
    setCategories(categoryData)
  }

  const getCategoryDescription = (categoryName: string): string => {
    const descriptions: Record<string, string> = {
      Camphor: "Pure camphor products for spiritual ceremonies and daily prayers",
      Incense: "Traditional incense sticks with authentic fragrances",
      Agarbathy: "Premium agarbathy collection for meditation and worship",
      Dhoop: "Aromatic dhoop cones made from natural herbs and resins",
    }
    return descriptions[categoryName] || "Premium spiritual products"
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    })
  }

  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would add this to the database
    toast({
      title: "Category Added",
      description: `${formData.name} category has been created successfully.`,
    })

    resetForm()
    setIsAddDialogOpen(false)
    loadCategories()
  }

  const handleEditCategory = () => {
    if (!selectedCategory || !formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Category Updated",
      description: `${formData.name} category has been updated successfully.`,
    })

    resetForm()
    setIsEditDialogOpen(false)
    setSelectedCategory(null)
    loadCategories()
  }

  const handleDeleteCategory = (category: Category) => {
    if (category.productCount > 0) {
      toast({
        title: "Cannot Delete Category",
        description: "This category contains products. Please move or delete the products first.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Category Deleted",
      description: `${category.name} category has been deleted successfully.`,
    })
    loadCategories()
  }

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Categories Management</h1>
          <p className="text-amber-700">Organize your products into categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  rows={3}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} className="bg-amber-600 hover:bg-amber-700">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Total Categories</p>
                <p className="text-2xl font-bold text-amber-900">{categories.length}</p>
              </div>
              <Tag className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Total Products</p>
                <p className="text-2xl font-bold text-amber-900">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Avg Products/Category</p>
                <p className="text-2xl font-bold text-amber-900">
                  {Math.round(
                    categories.reduce((sum, cat) => sum + cat.productCount, 0) / Math.max(categories.length, 1),
                  )}
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Avg</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="border-amber-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  {category.name}
                </CardTitle>
                <Badge variant="outline" className="border-amber-300 text-amber-700">
                  {category.productCount} products
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-amber-600 line-clamp-3">{category.description}</p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(category)}
                  className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                      disabled={category.productCount > 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Category</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete the "{category.name}" category? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteCategory(category)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <Card className="border-amber-200">
          <CardContent className="p-12 text-center">
            <Tag className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-900 mb-2">No categories found</h3>
            <p className="text-amber-600">Create your first category to organize your products.</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Category Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter category description"
                rows={3}
                className="border-amber-200 focus:border-amber-400"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory} className="bg-amber-600 hover:bg-amber-700">
              Update Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
