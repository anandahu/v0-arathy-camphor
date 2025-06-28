"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, Package, Users } from "lucide-react"
import { database } from "@/lib/database-persistent"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>("sales")
  const [salesReport, setSalesReport] = useState<any>(null)
  const [inventoryReport, setInventoryReport] = useState<any>(null)
  const [customerReport, setCustomerReport] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    generateReport(selectedReport)
  }, [selectedReport])

  const generateReport = async (reportType: string) => {
    setIsGenerating(true)

    // Simulate report generation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      switch (reportType) {
        case "sales":
          const salesData = database.generateSalesReport()
          setSalesReport(salesData)
          break
        case "inventory":
          const inventoryData = database.generateInventoryReport()
          setInventoryReport(inventoryData)
          break
        case "customer":
          const customerData = database.generateCustomerReport()
          setCustomerReport(customerData)
          break
      }
    } catch (error) {
      console.error("Error generating report:", error)
    }

    setIsGenerating(false)
  }

  const downloadReport = (reportType: string) => {
    let data: any = null
    let filename = ""

    switch (reportType) {
      case "sales":
        data = salesReport
        filename = "sales-report.json"
        break
      case "inventory":
        data = inventoryReport
        filename = "inventory-report.json"
        break
      case "customer":
        data = customerReport
        filename = "customer-report.json"
        break
    }

    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const renderSalesReport = () => {
    if (!salesReport) return null

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">₹{salesReport.data.totalSales.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">{salesReport.data.totalOrders}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">₹{Math.round(salesReport.data.averageOrderValue)}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-maroon-200">
          <CardHeader>
            <CardTitle className="text-maroon-900">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesReport.data.topProducts.map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-maroon-50 rounded-lg">
                  <div>
                    <p className="font-medium text-maroon-900">{product.name}</p>
                    <p className="text-sm text-maroon-600">Quantity sold: {product.quantity}</p>
                  </div>
                  <p className="font-bold text-maroon-900">₹{product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderInventoryReport = () => {
    if (!inventoryReport) return null

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">{inventoryReport.data.totalProducts}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">₹{inventoryReport.data.totalValue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-flame-600">{inventoryReport.data.lowStockItems.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-maroon-900">Low Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryReport.data.lowStockItems.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-flame-50 rounded">
                    <span className="text-maroon-900">{product.name}</span>
                    <Badge variant="secondary" className="bg-flame-100 text-flame-800">
                      {product.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-maroon-900">Out of Stock Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventoryReport.data.outOfStockItems.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="text-maroon-900">{product.name}</span>
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderCustomerReport = () => {
    if (!customerReport) return null

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">{customerReport.data.totalCustomers}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">₹{customerReport.data.totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">Average Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">₹{Math.round(customerReport.data.averageSpending)}</p>
            </CardContent>
          </Card>
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-sm text-maroon-600">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-maroon-900">{customerReport.data.newCustomersThisMonth}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-maroon-200">
          <CardHeader>
            <CardTitle className="text-maroon-900">Top Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerReport.data.topCustomers.slice(0, 5).map((customer: any, index: number) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-maroon-50 rounded-lg">
                  <div>
                    <p className="font-medium text-maroon-900">{customer.name}</p>
                    <p className="text-sm text-maroon-600">{customer.email}</p>
                    <p className="text-sm text-maroon-600">{customer.totalOrders} orders</p>
                  </div>
                  <p className="font-bold text-maroon-900">₹{customer.totalSpent.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-maroon-900">Reports</h1>
            <p className="text-maroon-600">Generate and view business reports</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-48 border-maroon-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="customer">Customer Report</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => downloadReport(selectedReport)}
              className="bg-maroon-600 hover:bg-maroon-700 text-white"
              disabled={isGenerating}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Report Content */}
        <Card className="border-maroon-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-maroon-900 flex items-center gap-2">
                {selectedReport === "sales" && <TrendingUp className="h-5 w-5" />}
                {selectedReport === "inventory" && <Package className="h-5 w-5" />}
                {selectedReport === "customer" && <Users className="h-5 w-5" />}
                {selectedReport === "sales" && "Sales Report"}
                {selectedReport === "inventory" && "Inventory Report"}
                {selectedReport === "customer" && "Customer Report"}
              </CardTitle>
              {isGenerating && (
                <div className="flex items-center gap-2 text-maroon-600">
                  <div className="loading-spinner"></div>
                  Generating...
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="loading-spinner mx-auto mb-4"></div>
                  <p className="text-maroon-600">Generating report...</p>
                </div>
              </div>
            ) : (
              <>
                {selectedReport === "sales" && renderSalesReport()}
                {selectedReport === "inventory" && renderInventoryReport()}
                {selectedReport === "customer" && renderCustomerReport()}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
