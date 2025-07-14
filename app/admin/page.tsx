"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminAuth from "@/components/admin/admin-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package, AlertTriangle, Plus, List, DollarSign, Archive } from "lucide-react"
import { database } from "@/lib/database-persistent"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
  })
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])

  useEffect(() => {
    if (database.isAuthenticated()) {
      setIsAuthenticated(true)
      loadDashboardData()
    }
  }, [])

  const loadDashboardData = () => {
    const products = database.getAllProducts()
    const lowStock = database.getLowStockProducts()
    const outOfStock = database.getOutOfStockProducts()

    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)

    setStats({
      totalProducts: products.length,
      totalValue,
      lowStockProducts: lowStock.length,
      outOfStockProducts: outOfStock.length,
    })

    setLowStockProducts(lowStock.slice(0, 5))
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
    loadDashboardData()
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-maroon-900">Product Dashboard</h1>
            <p className="text-maroon-600">Manage your camphor and incense inventory</p>
          </div>
          <div className="text-sm text-maroon-600">Last updated: {new Date().toLocaleString()}</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-maroon-200 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-maroon-600">Total Products</CardTitle>
              <Package className="h-4 w-4 text-maroon-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-maroon-900">{stats.totalProducts}</div>
              <p className="text-xs text-maroon-600">Active inventory items</p>
            </CardContent>
          </Card>

          <Card className="border-maroon-200 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-maroon-600">Inventory Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-maroon-900">₹{stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-maroon-600">Total stock value</p>
            </CardContent>
          </Card>

          <Card className="border-maroon-200 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-maroon-600">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-flame-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-flame-600">{stats.lowStockProducts}</div>
              <p className="text-xs text-flame-600">Items need restocking</p>
            </CardContent>
          </Card>

          <Card className="border-maroon-200 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-maroon-600">Out of Stock</CardTitle>
              <Archive className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.outOfStockProducts}</div>
              <p className="text-xs text-red-600">Items unavailable</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {(stats.lowStockProducts > 0 || stats.outOfStockProducts > 0) && (
          <div className="space-y-4">
            {stats.outOfStockProducts > 0 && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>{stats.outOfStockProducts}</strong> products are out of stock and need immediate restocking.
                  <Link href="/admin/products" className="ml-2 underline font-medium">
                    View Products
                  </Link>
                </AlertDescription>
              </Alert>
            )}
            {stats.lowStockProducts > 0 && (
              <Alert className="border-flame-200 bg-flame-50">
                <AlertTriangle className="h-4 w-4 text-flame-600" />
                <AlertDescription className="text-flame-800">
                  <strong>{stats.lowStockProducts}</strong> products are running low on stock.
                  <Link href="/admin/products" className="ml-2 underline font-medium">
                    View Products
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="border-maroon-200">
          <CardHeader>
            <CardTitle className="text-maroon-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/add-product">
                <Button className="w-full h-20 flex flex-col items-center justify-center bg-maroon-600 hover:bg-maroon-700 text-white shadow-lg">
                  <Plus className="h-6 w-6 mb-2" />
                  <span className="font-medium">Add New Product</span>
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button className="w-full h-20 flex flex-col items-center justify-center bg-burgundy-600 hover:bg-burgundy-700 text-white shadow-lg">
                  <List className="h-6 w-6 mb-2" />
                  <span className="font-medium">Manage Products</span>
                </Button>
              </Link>
              <Link href="/admin/categories">
                <Button className="w-full h-20 flex flex-col items-center justify-center bg-flame-600 hover:bg-flame-700 text-white shadow-lg">
                  <Package className="h-6 w-6 mb-2" />
                  <span className="font-medium">Manage Categories</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-maroon-200">
          <CardHeader>
            <CardTitle className="text-maroon-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-flame-600" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-flame-50 rounded-lg border border-flame-200"
                  >
                    <div className="flex items-center space-x-4">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=48&width=48"
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-maroon-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-maroon-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-maroon-900">{product.name}</p>
                        <p className="text-sm text-maroon-600">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-flame-100 text-flame-800 border-flame-300">
                      {product.stock} left
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-maroon-300 mx-auto mb-4" />
                  <p className="text-maroon-600">All products are well stocked!</p>
                </div>
              )}
              <Link href="/admin/products">
                <Button
                  variant="outline"
                  className="w-full border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
