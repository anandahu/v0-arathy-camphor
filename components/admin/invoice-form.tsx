"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { addInvoiceAction, updateInvoiceAction } from "@/app/admin/actions"
import { Loader2, Plus, Trash2, Search } from "lucide-react"
import {
  getAllCustomers,
  getAllOfflineProducts,
  calculateItemTotal,
  calculateInvoiceTotals,
  getTaxSettings,
  calculateUnitPrice,
  searchOfflineProducts,
} from "@/lib/billing"
import type { Invoice, InvoiceItem, Customer, OfflineProduct } from "@/lib/billing"

interface InvoiceFormProps {
  invoice?: Invoice
  isEdit?: boolean
}

export default function InvoiceForm({ invoice, isEdit = false }: InvoiceFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [offlineProducts, setOfflineProducts] = useState<OfflineProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<OfflineProduct[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [items, setItems] = useState<InvoiceItem[]>(
    invoice?.items || [
      {
        productId: 0,
        productName: "",
        sku: "",
        quantity: 1,
        unitId: "gram",
        unitName: "Gram",
        unitPrice: 0,
        discount: 0,
        taxRate: 18,
        total: 0,
        isOfflineProduct: true,
      },
    ],
  )
  const [discount, setDiscount] = useState(invoice?.discount || 0)
  const [dueDate, setDueDate] = useState(
    invoice?.dueDate
      ? invoice.dueDate.toISOString().split("T")[0]
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  )
  const [notes, setNotes] = useState(invoice?.notes || "")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [productSearch, setProductSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    setCustomers(getAllCustomers())
    const products = getAllOfflineProducts()
    setOfflineProducts(products)
    setFilteredProducts(products)

    if (invoice?.customerId) {
      const customer = getAllCustomers().find((c) => c.id === invoice.customerId)
      setSelectedCustomer(customer || null)
    }
  }, [invoice])

  // Update filtered products when search changes
  useEffect(() => {
    if (productSearch.trim() === "") {
      setFilteredProducts(offlineProducts)
    } else {
      const filtered = searchOfflineProducts(productSearch)
      setFilteredProducts(filtered)
    }
  }, [productSearch, offlineProducts])

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: 0,
        productName: "",
        sku: "",
        quantity: 1,
        unitId: "gram",
        unitName: "Gram",
        unitPrice: 0,
        discount: 0,
        taxRate: getTaxSettings().defaultTaxRate,
        total: 0,
        isOfflineProduct: true,
      },
    ])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    // Auto-fill product details when product is selected
    if (field === "productId") {
      const product = offlineProducts.find((p) => p.id === Number(value))
      if (product) {
        updatedItems[index].productName = product.name
        updatedItems[index].sku = product.sku || ""
        const defaultUnit = product.units.find((u) => u.isDefault) || product.units[0]
        if (defaultUnit) {
          updatedItems[index].unitId = defaultUnit.id
          updatedItems[index].unitName = defaultUnit.name
          updatedItems[index].unitPrice = calculateUnitPrice(product.basePrice, defaultUnit)
        }
      }
    }

    // Update unit price when unit changes
    if (field === "unitId") {
      const product = offlineProducts.find((p) => p.id === updatedItems[index].productId)
      if (product) {
        const unit = product.units.find((u) => u.id === value)
        if (unit) {
          updatedItems[index].unitName = unit.name
          updatedItems[index].unitPrice = calculateUnitPrice(product.basePrice, unit)
        }
      }
    }

    // Recalculate total for this item
    updatedItems[index].total = calculateItemTotal(updatedItems[index])

    setItems(updatedItems)
  }

  const totals = calculateInvoiceTotals(items, discount)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    try {
      if (!selectedCustomer) {
        setError("Please select a customer")
        return
      }

      if (items.length === 0 || items.some((item) => item.productId === 0)) {
        setError("Please add at least one valid product")
        return
      }

      // Add invoice data to form
      formData.append("customerId", selectedCustomer.id)
      formData.append("customerName", selectedCustomer.name)

      // Build customer address string only if address exists
      let customerAddress = ""
      if (selectedCustomer.address) {
        const addressParts = [
          selectedCustomer.address.street,
          selectedCustomer.address.city,
          selectedCustomer.address.state && selectedCustomer.address.pincode
            ? `${selectedCustomer.address.state} - ${selectedCustomer.address.pincode}`
            : selectedCustomer.address.state || selectedCustomer.address.pincode,
        ].filter(Boolean)
        customerAddress = addressParts.join(", ")
      }

      formData.append("customerAddress", customerAddress)

      if (selectedCustomer.gstNumber) {
        formData.append("customerGST", selectedCustomer.gstNumber)
      }
      formData.append("items", JSON.stringify(items))
      formData.append("subtotal", totals.subtotal.toString())
      formData.append("discount", totals.discount.toString())
      formData.append("taxAmount", totals.taxAmount.toString())
      formData.append("totalAmount", totals.totalAmount.toString())
      formData.append("dueDate", dueDate)
      formData.append("notes", notes)

      const result =
        isEdit && invoice ? await updateInvoiceAction(invoice.id, formData) : await addInvoiceAction(formData)

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
        {/* Customer Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Select Customer *</Label>
                <Select
                  value={selectedCustomer?.id || ""}
                  onValueChange={(value) => {
                    const customer = customers.find((c) => c.id === value)
                    setSelectedCustomer(customer || null)
                  }}
                  disabled={isLoading}
                >
                  <SelectTrigger className="border-amber-200 focus:border-amber-500">
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} - {customer.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  disabled={isLoading}
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
            </div>

            {selectedCustomer && (
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">Customer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Name:</strong> {selectedCustomer.name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedCustomer.phone}
                    </p>
                    {selectedCustomer.email && (
                      <p>
                        <strong>Email:</strong> {selectedCustomer.email}
                      </p>
                    )}
                  </div>
                  {selectedCustomer.address && (
                    <div>
                      <p>
                        <strong>Address:</strong>
                      </p>
                      {selectedCustomer.address.street && <p>{selectedCustomer.address.street}</p>}
                      {(selectedCustomer.address.city ||
                        selectedCustomer.address.state ||
                        selectedCustomer.address.pincode) && (
                        <p>
                          {[
                            selectedCustomer.address.city,
                            selectedCustomer.address.state,
                            selectedCustomer.address.pincode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      )}
                      {selectedCustomer.gstNumber && (
                        <p>
                          <strong>GST:</strong> {selectedCustomer.gstNumber}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Product Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products by name, description, or SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="pl-10 border-amber-200 focus:border-amber-500"
              />
            </div>
            {productSearch && (
              <div className="mt-2 text-sm text-gray-600">
                Found {filteredProducts.length} product(s) matching "{productSearch}"
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invoice Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Invoice Items
              <Button type="button" onClick={addItem} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                    <div className="md:col-span-2 space-y-2">
                      <Label>
                        Product *
                        <Badge variant="secondary" className="ml-2">
                          Offline
                        </Badge>
                      </Label>
                      <Select
                        value={item.productId.toString()}
                        onValueChange={(value) => updateItem(index, "productId", Number(value))}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="border-amber-200 focus:border-amber-500">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name} - ₹{product.basePrice}
                              {product.sku && ` (${product.sku})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Unit</Label>
                      <Select
                        value={item.unitId}
                        onValueChange={(value) => updateItem(index, "unitId", value)}
                        disabled={isLoading || !item.productId}
                      >
                        <SelectTrigger className="border-amber-200 focus:border-amber-500">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {item.productId > 0 &&
                            offlineProducts
                              .find((p) => p.id === item.productId)
                              ?.units.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id}>
                                  {unit.name} ({unit.abbreviation})
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                        disabled={isLoading}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Unit Price (₹)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, "unitPrice", Number(e.target.value))}
                        disabled={isLoading}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Discount (₹)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.discount}
                        onChange={(e) => updateItem(index, "discount", Number(e.target.value))}
                        disabled={isLoading}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Label>Total: ₹{item.total.toFixed(2)}</Label>
                      </div>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(index)}
                          disabled={isLoading}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Tax Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={item.taxRate}
                        onChange={(e) => updateItem(index, "taxRate", Number(e.target.value))}
                        disabled={isLoading}
                        className="border-amber-200 focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <Input value={item.sku} disabled className="bg-gray-50 border-gray-200" />
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.productId > 0 &&
                    (() => {
                      const product = offlineProducts.find((p) => p.id === item.productId)
                      const unit = product?.units.find((u) => u.id === item.unitId)
                      const requiredStock = item.quantity * (unit?.baseQuantity || 1)
                      const availableStock = product?.stock || 0

                      if (requiredStock > availableStock) {
                        return (
                          <Alert className="mt-2 border-orange-200 bg-orange-50">
                            <AlertDescription className="text-orange-700">
                              Warning: Insufficient stock. Required: {requiredStock}, Available: {availableStock}
                            </AlertDescription>
                          </Alert>
                        )
                      }
                      return null
                    })()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoice Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Additional Discount (₹)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    disabled={isLoading}
                    className="border-amber-200 focus:border-amber-500"
                    placeholder="Additional discount amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isLoading}
                    className="border-amber-200 focus:border-amber-500"
                    placeholder="Invoice notes (optional)"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2 text-right">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>₹{totals.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Amount:</span>
                    <span>₹{totals.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total Amount:</span>
                    <span>₹{totals.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
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
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEdit ? "Update Invoice" : "Create Invoice"}</>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
