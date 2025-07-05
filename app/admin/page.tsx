"use client"

import { useState, useEffect } from "react"
import AdminAuth from "@/components/admin/admin-auth"
import AdminLayout from "@/components/admin/admin-layout"
import ProductManagement from "@/components/admin/product-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, DollarSign, AlertTriangle, TrendingUp, Users, ShoppingCart, Eye, Plus } from "lucide-react"
import { database, type ProductStats } from "@/lib/database-persistent"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<ProductStats>({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categories: [],
  })
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])

  useEffect(() => {
    if (isAuthenticated) {
      loadStats()
    }
  }, [isAuthenticated])

  const loadStats = () => {
    const productStats = database.getProductStats()
    setStats(productStats)
    setLowStockProducts(database.getLowStockProducts())
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Dashboard</h1>
            <p className="text-amber-700">Welcome to Arathy Camphor & Agarbathy Admin Panel</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add Product
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Total Products</CardTitle>
              <Package className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">{stats.totalProducts}</div>
              <p className="text-xs text-amber-600">{stats.categories.length} categories</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Inventory Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-900">₹{stats.totalValue.toLocaleString()}</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.lowStockCount}</div>
              <p className="text-xs text-orange-600">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Out of Stock</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.outOfStockCount}</div>
              <p className="text-xs text-red-600">Needs restocking</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Categories
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900">Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.categories.map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-amber-700">{category}</span>
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      {database.getProductsByCategory(category).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-amber-600">Stock: {product.stock}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 bg-transparent">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {lowStockProducts.length === 0 && (
                  <p className="text-sm text-amber-600">All products are well stocked!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Management Section */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">Product Management</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ProductManagement />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
