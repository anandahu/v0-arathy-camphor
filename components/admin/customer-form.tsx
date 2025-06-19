"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { addCustomerAction, updateCustomerAction } from "@/app/admin/actions"
import { Loader2 } from "lucide-react"
import type { Customer } from "@/lib/billing"

interface CustomerFormProps {
  customer?: Customer
  isEdit?: boolean
}

export default function CustomerForm({ customer, isEdit = false }: CustomerFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      const result =
        isEdit && customer ? await updateCustomerAction(customer.id, formData) : await addCustomerAction(formData)

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
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={customer?.name}
                  required
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={customer?.phone}
                  required
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={customer?.email}
                disabled={isLoading}
                className="border-amber-200 focus:border-amber-500"
                placeholder="Enter email address (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                name="gstNumber"
                defaultValue={customer?.gstNumber}
                disabled={isLoading}
                className="border-amber-200 focus:border-amber-500"
                placeholder="Enter GST number (optional)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>Address Information (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                defaultValue={customer?.address?.street}
                disabled={isLoading}
                className="border-amber-200 focus:border-amber-500"
                placeholder="Enter street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={customer?.address?.city}
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={customer?.address?.state}
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  defaultValue={customer?.address?.pincode}
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter pincode"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={customer?.address?.country || "India"}
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                  placeholder="Enter country"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-amber-600 hover:bg-amber-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>{isEdit ? "Update Customer" : "Add Customer"}</>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
