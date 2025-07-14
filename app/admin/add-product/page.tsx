"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, Eye } from "lucide-react"
import { database } from "@/lib/database-persistent"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AddProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sku: "",
    images: [] as string[],
  })

  const [imageInput, setImageInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = database.getAllCategories()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.stock || Number.parseInt(formData.stock) < 0) newErrors.stock = "Valid stock quantity is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.sku.trim()) newErrors.sku = "SKU is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          if (result) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, result],
            }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const addImageFromUrl = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }))
      setImageInput("")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const generateSKU = () => {
    const prefix = formData.category.substring(0, 3).toUpperCase()
    const timestamp = Date.now().toString().slice(-6)
    const sku = `${prefix}${timestamp}`
    handleInputChange("sku", sku)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category: formData.category,
        sku: formData.sku.trim(),
        images: formData.images,
      }

      database.addProduct(productData)

      toast({
        title: "Success!",
        description: "Product added successfully",
      })

      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const ProductPreview = () => (
    <Card className="border-maroon-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square bg-maroon-50 rounded-lg mb-4 overflow-hidden">
          {formData.images.length > 0 ? (
            <img
              src={formData.images[0] || "/placeholder.svg"}
              alt={formData.name || "Product preview"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=200&width=200"
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-maroon-300 text-4xl">📦</div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Badge variant="outline" className="border-maroon-300 text-maroon-700 text-xs">
            {formData.category || "Category"}
          </Badge>
          <h3 className="font-semibold text-maroon-900 line-clamp-2">{formData.name || "Product Name"}</h3>
          <p className="text-sm text-maroon-600 line-clamp-2">
            {formData.description || "Product description will appear here..."}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-maroon-600">Stock: {formData.stock || "0"}</span>
            <span className="text-maroon-600">SKU: {formData.sku || "SKU"}</span>
          </div>
          <div className="text-lg font-bold text-maroon-900">₹{formData.price || "0"}</div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/admin/products">
              <Button
                variant="outline"
                size="sm"
                className="border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-maroon-900">Add New Product</h1>
              <p className="text-maroon-600">Create a new product listing</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="border-maroon-200 text-maroon-700 hover:bg-maroon-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "Hide" : "Show"} Preview
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-maroon-900">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-maroon-900">
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`border-maroon-200 focus:border-maroon-400 ${errors.name ? "border-red-500" : ""}`}
                      placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-maroon-900">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={`border-maroon-200 focus:border-maroon-400 min-h-[100px] ${
                        errors.description ? "border-red-500" : ""
                      }`}
                      placeholder="Enter product description"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-maroon-900">
                        Price (₹) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className={`border-maroon-200 focus:border-maroon-400 ${errors.price ? "border-red-500" : ""}`}
                        placeholder="0.00"
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <Label htmlFor="stock" className="text-maroon-900">
                        Stock Quantity *
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                        className={`border-maroon-200 focus:border-maroon-400 ${errors.stock ? "border-red-500" : ""}`}
                        placeholder="0"
                      />
                      {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-maroon-900">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger
                        className={`border-maroon-200 focus:border-maroon-400 ${
                          errors.category ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="sku" className="text-maroon-900">
                      SKU *
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => handleInputChange("sku", e.target.value)}
                        className={`border-maroon-200 focus:border-maroon-400 ${errors.sku ? "border-red-500" : ""}`}
                        placeholder="Enter SKU"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateSKU}
                        className="border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                      >
                        Generate
                      </Button>
                    </div>
                    {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                  </div>
                </div>

                {/* Images Section */}
                <div className="space-y-4">
                  <Label className="text-maroon-900">Product Images</Label>

                  {/* File Upload */}
                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-maroon-300 rounded-lg p-6 text-center hover:border-maroon-400 transition-colors">
                        <Upload className="h-8 w-8 text-maroon-400 mx-auto mb-2" />
                        <p className="text-maroon-600">Click to upload images or drag and drop</p>
                        <p className="text-sm text-maroon-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* URL Input */}
                  <div className="flex gap-2">
                    <Input
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      placeholder="Or enter image URL"
                      className="border-maroon-200 focus:border-maroon-400"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addImageFromUrl}
                      className="border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=80&width=80"
                            }}
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-maroon-600 hover:bg-maroon-700 text-white"
                >
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Preview */}
          {showPreview && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-maroon-900">Preview</h3>
              <p className="text-sm text-maroon-600">This is how your product will appear on the main site:</p>
              <ProductPreview />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
