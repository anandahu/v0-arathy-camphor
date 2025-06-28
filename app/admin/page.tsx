"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import AdminAuth from "@/components/admin/admin-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package, ShoppingCart, Users, AlertTriangle, Plus, Eye, FileText, DollarSign } from "lucide-react"
import { database } from "@/lib/database-persistent"
import Link from "next/link"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])

  useEffect(() => {
    if (database.isAuthenticated()) {
      setIsAuthenticated(true)
      loadDashboardData()
    }
  }, [])

  const loadDashboardData = () => {
    const products = database.getAllProducts()
    const orders = database.getAllOrders()
    const customers = database.getAllCustomers()
    const lowStock = database.getLowStockProducts()
    const outOfStock = database.getOutOfStockProducts()

    const totalRevenue = orders
      .filter((order) => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0)

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      totalRevenue,
      lowStockProducts: lowStock.length,
      outOfStockProducts: outOfStock.length,
    })

    setRecentOrders(orders.slice(0, 5))
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
            <h1 className="text-3xl font-bold text-maroon-900">Dashboard</h1>
            <p className="text-maroon-600">Welcome to your admin panel</p>
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
              <CardTitle className="text-sm font-medium text-maroon-600">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-maroon-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-maroon-900">{stats.totalOrders}</div>
              <p className="text-xs text-maroon-600">All time orders</p>
            </CardContent>
          </Card>

          <Card className="border-maroon-200 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-maroon-600">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-maroon-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-maroon-900">{stats.totalCustomers}</div>
              <p className="text-xs text-maroon-600">Registered customers</p>
            </CardContent>
          </Card>

          <Card className="border-maroon-200 card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-maroon-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-maroon-900">₹{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-maroon-600">From completed orders</p>
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
                  <strong>{stats.outOfStockProducts}</strong> products are out of stock and need restocking.
                  <Link href="/admin/products" className="ml-2 underline">
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
                  <Link href="/admin/products" className="ml-2 underline">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/products">
                <Button className="w-full h-16 flex flex-col items-center justify-center bg-maroon-600 hover:bg-maroon-700 text-white">
                  <Plus className="h-5 w-5 mb-1" />
                  Add Product
                </Button>
              </Link>
              <Link href="/admin/orders">
                <Button className="w-full h-16 flex flex-col items-center justify-center bg-burgundy-600 hover:bg-burgundy-700 text-white">
                  <Eye className="h-5 w-5 mb-1" />
                  View Orders
                </Button>
              </Link>
              <Link href="/admin/customers">
                <Button className="w-full h-16 flex flex-col items-center justify-center bg-flame-600 hover:bg-flame-700 text-white">
                  <Users className="h-5 w-5 mb-1" />
                  Manage Customers
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button className="w-full h-16 flex flex-col items-center justify-center bg-maroon-600 hover:bg-maroon-700 text-white">
                  <FileText className="h-5 w-5 mb-1" />
                  Generate Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-maroon-900">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-maroon-50 rounded-lg">
                      <div>
                        <p className="font-medium text-maroon-900">{order.customerName}</p>
                        <p className="text-sm text-maroon-600">₹{order.total}</p>
                      </div>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "default"
                            : order.status === "processing"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-maroon-600 text-center py-4">No recent orders</p>
                )}
                <Link href="/admin/orders">
                  <Button
                    variant="outline"
                    className="w-full border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                  >
                    View All Orders
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card className="border-maroon-200">
            <CardHeader>
              <CardTitle className="text-maroon-900">Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-flame-50 rounded-lg">
                      <div>
                        <p className="font-medium text-maroon-900">{product.name}</p>
                        <p className="text-sm text-maroon-600">SKU: {product.sku}</p>
                      </div>
                      <Badge variant="secondary" className="bg-flame-100 text-flame-800">
                        {product.stock} left
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-maroon-600 text-center py-4">No low stock items</p>
                )}
                <Link href="/admin/products">
                  <Button
                    variant="outline"
                    className="w-full border-maroon-200 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                  >
                    Manage Inventory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
