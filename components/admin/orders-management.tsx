"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { database, type Order } from "@/lib/database-persistent"
import { Search, Eye, Package, Clock, CheckCircle, XCircle } from "lucide-react"

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const allOrders = database.getAllOrders()
    setOrders(allOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrder = database.updateOrderStatus(orderId, newStatus)
    if (updatedOrder) {
      loadOrders()
      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}`,
      })
    }
  }

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      processing: { variant: "default" as const, icon: Package, color: "text-blue-600" },
      completed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      cancelled: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const openViewDialog = (order: Order) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Orders Management</h1>
          <p className="text-amber-700">Track and manage customer orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Total Orders</p>
                <p className="text-2xl font-bold text-amber-900">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter((o) => o.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Processing</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter((o) => o.status === "processing").length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter((o) => o.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-amber-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                <Input
                  placeholder="Search orders by customer name, email, or order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-amber-400"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-amber-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="border-amber-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold text-amber-900">Order #{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-amber-600">Customer</p>
                      <p className="font-medium text-amber-900">{order.customerName}</p>
                      <p className="text-amber-700">{order.customerEmail}</p>
                    </div>

                    <div>
                      <p className="text-amber-600">Order Details</p>
                      <p className="font-medium text-amber-900">₹{order.total.toLocaleString()}</p>
                      <p className="text-amber-700">{order.items.length} items</p>
                    </div>

                    <div>
                      <p className="text-amber-600">Date</p>
                      <p className="font-medium text-amber-900">{order.createdAt.toLocaleDateString()}</p>
                      <p className="text-amber-700">{order.createdAt.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openViewDialog(order)}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  <Select
                    value={order.status}
                    onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32 border-amber-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="border-amber-200">
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-900 mb-2">No orders found</h3>
            <p className="text-amber-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Orders will appear here once customers start placing them."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Name:</strong> {selectedOrder.customerName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.customerEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedOrder.customerPhone}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Order ID:</strong> #{selectedOrder.id}
                    </p>
                    <p>
                      <strong>Status:</strong> {getStatusBadge(selectedOrder.status)}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedOrder.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-amber-900 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                      <div>
                        <p className="font-medium text-amber-900">{item.productName}</p>
                        <p className="text-sm text-amber-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-amber-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-amber-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-amber-900">Total Amount:</span>
                  <span className="text-xl font-bold text-amber-900">₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
