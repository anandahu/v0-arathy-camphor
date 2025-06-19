"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { addCategoryAction, updateCategoryAction } from "@/app/admin/actions"
import { Loader2 } from "lucide-react"
import type { Category } from "@/lib/categories"

interface CategoryFormProps {
  category?: Category
  isEdit?: boolean
}

export default function CategoryForm({ category, isEdit = false }: CategoryFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result =
        isEdit && category ? await updateCategoryAction(category.id, formData) : await addCategoryAction(formData)

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

      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            name="name"
            required
            disabled={isLoading}
            defaultValue={category?.name}
            className="border-amber-200 focus:border-amber-500"
            placeholder="Enter category name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Category Slug *</Label>
          <Input
            id="slug"
            name="slug"
            required
            disabled={isLoading}
            defaultValue={category?.slug}
            className="border-amber-200 focus:border-amber-500"
            placeholder="Enter category slug (e.g., agarbathi)"
          />
          <p className="text-sm text-gray-500">Used in URLs. Use lowercase letters and hyphens only.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            required
            disabled={isLoading}
            defaultValue={category?.description}
            className="border-amber-200 focus:border-amber-500"
            placeholder="Enter category description"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-amber-600 hover:bg-amber-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEdit ? "Update Category" : "Create Category"}</>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
