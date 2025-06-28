"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { database, type Customer } from "@/lib/database-persistent"
import { Search, Users, Eye, Mail, Phone, MapPin, Calendar, ShoppingBag } from "lucide-react"

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = () => {
    const allCustomers = database.getAllCustomers()
    setCustomers(allCustomers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))
  }

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const openViewDialog = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsViewDialogOpen(true)
  }

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 5000) return { tier: "Gold", color: "bg-yellow-100 text-yellow-800" }
    if (totalSpent >= 2000) return { tier: "Silver", color: "bg-gray-100 text-gray-800" }
    return { tier: "Bronze", color: "bg-amber-100 text-amber-800" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Customer Management</h1>
          <p className="text-amber-700">Manage and view customer information</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Total Customers</p>
                <p className="text-2xl font-bold text-amber-900">{customers.length}</p>
              </div>
              <Users className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Gold Customers</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {customers.filter((c) => c.totalSpent >= 5000).length}
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                </p>
              </div>
              <ShoppingBag className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹
                  {Math.round(
                    customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                      Math.max(
                        customers.reduce((sum, c) => sum + c.totalOrders, 0),
                        1,
                      ),
                  ).toLocaleString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-amber-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-amber-200 focus:border-amber-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const tierInfo = getCustomerTier(customer.totalSpent)
          return (
            <Card key={customer.id} className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900 text-lg">{customer.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={tierInfo.color}>{tierInfo.tier}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openViewDialog(customer)}
                      className="border-amber-200 text-amber-700 hover:bg-amber-50 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-amber-700">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-700">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-amber-700">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="text-xs line-clamp-2">{customer.address}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-amber-200">
                    <div className="text-center">
                      <p className="text-lg font-bold text-amber-900">{customer.totalOrders}</p>
                      <p className="text-xs text-amber-600">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-amber-900">₹{customer.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-amber-600">Total Spent</p>
                    </div>
                  </div>

                  <div className="text-xs text-amber-600 text-center">
                    Joined: {customer.createdAt.toLocaleDateString()}
                    {customer.lastOrderDate && (
                      <span className="block">Last Order: {customer.lastOrderDate.toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <Card className="border-amber-200">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-amber-900 mb-2">No customers found</h3>
            <p className="text-amber-600">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Customers will appear here once they start placing orders."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* View Customer Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-3">Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-amber-600">Full Name</p>
                      <p className="font-medium text-amber-900">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">Email Address</p>
                      <p className="font-medium text-amber-900">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">Phone Number</p>
                      <p className="font-medium text-amber-900">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">Address</p>
                      <p className="font-medium text-amber-900">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 mb-3">Customer Statistics</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-amber-600">Customer Tier</p>
                      <Badge className={getCustomerTier(selectedCustomer.totalSpent).color}>
                        {getCustomerTier(selectedCustomer.totalSpent).tier}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">Total Orders</p>
                      <p className="font-medium text-amber-900">{selectedCustomer.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">Total Spent</p>
                      <p className="font-medium text-amber-900">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-amber-600">Average Order Value</p>
                      <p className="font-medium text-amber-900">
                        ₹
                        {Math.round(
                          selectedCustomer.totalSpent / Math.max(selectedCustomer.totalOrders, 1),
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-amber-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-amber-600">Customer Since</p>
                    <p className="font-medium text-amber-900">{selectedCustomer.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-amber-600">Last Order</p>
                    <p className="font-medium text-amber-900">
                      {selectedCustomer.lastOrderDate
                        ? selectedCustomer.lastOrderDate.toLocaleDateString()
                        : "No orders yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
