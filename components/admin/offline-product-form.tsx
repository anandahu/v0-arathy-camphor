"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { addOfflineProductAction, updateOfflineProductAction } from "@/app/admin/actions"
import { Upload, X, Loader2, FolderOpen, ImageIcon, Plus, Trash2 } from "lucide-react"
import { validateImageFile, fileToBase64 } from "@/lib/image-upload"
import { COMMON_UNITS } from "@/lib/billing"
import type { OfflineProduct, ProductUnit } from "@/lib/billing"
import type { Category } from "@/lib/categories"
import Image from "next/image"

interface OfflineProductFormProps {
  product?: OfflineProduct
  isEdit?: boolean
  categories: Category[]
}

interface ImagePreview {
  id: string
  file?: File
  preview: string
  existing?: boolean
}

export default function OfflineProductForm({ product, isEdit = false, categories }: OfflineProductFormProps) {
  const [images, setImages] = useState<ImagePreview[]>(
    product?.images.map((img, index) => ({
      id: `existing-${index}`,
      preview: img,
      existing: true,
    })) || [],
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(product?.tags || [])
  const [units, setUnits] = useState<ProductUnit[]>(
    product?.units || [
      { id: "gram", name: "Gram", abbreviation: "g", baseQuantity: 1, priceMultiplier: 1, isDefault: true },
    ],
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const availableTags = [
    { id: "top-selling", label: "Top Selling", color: "bg-green-100 text-green-800" },
    { id: "best-selling", label: "Best Selling", color: "bg-blue-100 text-blue-800" },
    { id: "offer", label: "Offer", color: "bg-red-100 text-red-800" },
  ]

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true)
    const newImages: ImagePreview[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const validation = validateImageFile(file)

      if (!validation.valid) {
        setError(validation.error || "Invalid file")
        continue
      }

      try {
        const preview = await fileToBase64(file)
        newImages.push({
          id: `new-${Date.now()}-${i}`,
          file,
          preview,
          existing: false,
        })
      } catch (error) {
        console.error("Error processing image:", error)
      }
    }

    setImages((prev) => [...prev, ...newImages])
    setUploadingImages(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const addUnit = () => {
    const availableUnit = COMMON_UNITS.find((u) => !units.some((unit) => unit.id === u.id))
    if (availableUnit) {
      setUnits([...units, { ...availableUnit, isDefault: false }])
    }
  }

  const removeUnit = (index: number) => {
    if (units.length > 1) {
      setUnits(units.filter((_, i) => i !== index))
    }
  }

  const updateUnit = (index: number, field: keyof ProductUnit, value: any) => {
    const updatedUnits = [...units]
    updatedUnits[index] = { ...updatedUnits[index], [field]: value }

    // Ensure only one default unit
    if (field === "isDefault" && value) {
      updatedUnits.forEach((unit, i) => {
        if (i !== index) unit.isDefault = false
      })
    }

    setUnits(updatedUnits)
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      // Validate units
      if (units.length === 0) {
        setError("At least one unit is required")
        return
      }

      if (!units.some((u) => u.isDefault)) {
        setError("One unit must be marked as default")
        return
      }

      // Add image files to form data
      images.forEach((image, index) => {
        if (image.file) {
          formData.append(`imageFiles`, image.file)
        } else if (image.existing) {
          formData.append(`existingImages`, image.preview)
        }
      })

      // Add tags to form data
      selectedTags.forEach((tag) => {
        formData.append("tags", tag)
      })

      // Add units to form data
      formData.append("units", JSON.stringify(units))

      const result =
        isEdit && product
          ? await updateOfflineProductAction(product.id, formData)
          : await addOfflineProductAction(formData)

      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result?.redirectTo) {
        router.push(result.redirectTo)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {categories.length === 0 && (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-700 flex flex-col space-y-2">
            <p>No product categories found. You need to create at least one category before adding products.</p>
            <Button asChild className="bg-amber-600 hover:bg-amber-700 w-fit">
              <Link href="/admin/categories/add">
                <FolderOpen className="h-4 w-4 mr-2" />
                Create Category
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <form action={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  disabled={isLoading || categories.length === 0}
                  defaultValue={product?.name}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter product name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  name="sku"
                  disabled={isLoading || categories.length === 0}
                  defaultValue={product?.sku}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter product SKU"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                required
                disabled={isLoading || categories.length === 0}
                defaultValue={product?.description}
                className="border-amber-200 focus:border-amber-500"
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (₹) *</Label>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  step="0.01"
                  required
                  disabled={isLoading || categories.length === 0}
                  defaultValue={product?.basePrice}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter base price"
                />
                <p className="text-xs text-gray-500">Price per base unit (usually per gram)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  disabled={isLoading || categories.length === 0}
                  defaultValue={product?.stock}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter stock quantity"
                />
                <p className="text-xs text-gray-500">Stock in base units</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  disabled={isLoading || categories.length === 0}
                  defaultValue={product?.manufacturer}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter manufacturer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                name="category"
                defaultValue={product?.category}
                required
                disabled={isLoading || categories.length === 0}
              >
                <SelectTrigger className="border-amber-200 focus:border-amber-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500">Select a product category</p>
                <Button type="button" variant="link" size="sm" className="text-amber-600 p-0 h-auto" asChild>
                  <Link href="/admin/categories">Manage Categories</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Units Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Units & Pricing
              <Button
                type="button"
                onClick={addUnit}
                disabled={isLoading || categories.length === 0 || units.length >= COMMON_UNITS.length}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Configure different units and their pricing for this product:</p>

              {units.map((unit, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div className="space-y-2">
                      <Label>Unit Type</Label>
                      <Select
                        value={unit.id}
                        onValueChange={(value) => {
                          const commonUnit = COMMON_UNITS.find((u) => u.id === value)
                          if (commonUnit) {
                            updateUnit(index, "id", value)
                            updateUnit(index, "name", commonUnit.name)
                            updateUnit(index, "abbreviation", commonUnit.abbreviation)
                            updateUnit(index, "baseQuantity", commonUnit.baseQuantity)
                          }
                        }}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="border-amber-200 focus:border-amber-500">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COMMON_UNITS.filter((u) => !units.some((unit, i) => unit.id === u.id && i !== index)).map(
                            (commonUnit) => (
                              <SelectItem key={commonUnit.id} value={commonUnit.id}>
                                {commonUnit.name} ({commonUnit.abbreviation})
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Base Quantity</Label>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={unit.baseQuantity}
                        onChange={(e) => updateUnit(index, "baseQuantity", Number(e.target.value))}
                        disabled={isLoading}
                        className="border-amber-200 focus:border-amber-500"
                      />
                      <p className="text-xs text-gray-500">How many base units in this unit</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Price Multiplier</Label>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={unit.priceMultiplier}
                        onChange={(e) => updateUnit(index, "priceMultiplier", Number(e.target.value))}
                        disabled={isLoading}
                        className="border-amber-200 focus:border-amber-500"
                      />
                      <p className="text-xs text-gray-500">Price = Base Price × Multiplier</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Calculated Price</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        ₹{((product?.basePrice || 0) * unit.priceMultiplier).toFixed(2)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Default Unit</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={unit.isDefault}
                          onCheckedChange={(checked) => updateUnit(index, "isDefault", checked)}
                          disabled={isLoading}
                        />
                        <span className="text-sm">Default</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {units.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeUnit(index)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {units.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No units configured</p>
                  <p className="text-sm text-gray-400">Click "Add Unit" to configure pricing units</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Product Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || uploadingImages || categories.length === 0}
                  className="border-amber-300 hover:bg-amber-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingImages ? "Uploading..." : "Upload Images"}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                />
                <p className="text-sm text-gray-500">Upload multiple images (JPEG, PNG, WebP - Max 5MB each)</p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="relative h-32 w-full border border-amber-200 rounded-lg overflow-hidden">
                        <Image
                          src={image.preview || "/placeholder.svg"}
                          alt="Product image"
                          fill
                          className="object-cover"
                        />
                        {uploadingImages && !image.existing && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Loader2 className="h-6 w-6 text-white animate-spin" />
                          </div>
                        )}
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(image.id)}
                        disabled={isLoading || uploadingImages || categories.length === 0}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {image.existing && (
                        <Badge className="absolute bottom-1 left-1 text-xs bg-blue-100 text-blue-800">Existing</Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <div className="border-2 border-dashed border-amber-200 rounded-lg p-8 text-center">
                  <ImageIcon className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-gray-500">No images uploaded yet</p>
                  <p className="text-sm text-gray-400">Click "Upload Images" to add product photos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Product Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Product Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Select tags that apply to this product:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {availableTags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTags.includes(tag.id)
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                    onClick={() => !isLoading && categories.length > 0 && toggleTag(tag.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => toggleTag(tag.id)}
                        disabled={isLoading || categories.length === 0}
                      />
                      <div>
                        <Badge className={tag.color}>{tag.label}</Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {tag.id === "top-selling" && "Products with highest sales volume"}
                          {tag.id === "best-selling" && "Customer favorite products"}
                          {tag.id === "offer" && "Products with special discounts"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTags.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tagId) => {
                      const tag = availableTags.find((t) => t.id === tagId)
                      return tag ? (
                        <Badge key={tagId} className={tag.color}>
                          {tag.label}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" asChild disabled={isLoading}>
            <Link href="/admin/offline-products">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isLoading || uploadingImages || categories.length === 0}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>{isEdit ? "Update Product" : "Add Product"}</>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
