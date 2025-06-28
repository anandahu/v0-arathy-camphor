// Database utilities for POS system
export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  sku: string
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  createdAt: Date
}

export interface BillItem {
  productId: string
  productName: string
  quantity: number
  price: number
  subtotal: number
}

export interface Bill {
  id: string
  billNumber: string
  customerId?: string
  customerName?: string
  customerPhone?: string
  items: BillItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  paymentMethod: "cash" | "card" | "upi"
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface SalesReport {
  date: string
  totalSales: number
  totalTransactions: number
  topProducts: Array<{
    productId: string
    productName: string
    quantitySold: number
    revenue: number
  }>
}

// In-memory database simulation (replace with actual database in production)
class POSDatabase {
  private products: Map<string, Product> = new Map()
  private customers: Map<string, Customer> = new Map()
  private bills: Map<string, Bill> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // Add sample products
    const sampleProducts: Product[] = [
      {
        id: "1",
        name: "Premium Camphor",
        description: "High-quality camphor for religious ceremonies",
        price: 50,
        stock: 100,
        category: "Religious Items",
        sku: "CAM001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "Incense Sticks",
        description: "Aromatic incense sticks - Pack of 20",
        price: 25,
        stock: 200,
        category: "Religious Items",
        sku: "INC001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    sampleProducts.forEach((product) => {
      this.products.set(product.id, product)
    })
  }

  // Product operations
  getAllProducts(): Product[] {
    return Array.from(this.products.values())
  }

  getProductById(id: string): Product | undefined {
    return this.products.get(id)
  }

  addProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.products.set(newProduct.id, newProduct)
    return newProduct
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const product = this.products.get(id)
    if (!product) return null

    const updatedProduct = {
      ...product,
      ...updates,
      updatedAt: new Date(),
    }
    this.products.set(id, updatedProduct)
    return updatedProduct
  }

  deleteProduct(id: string): boolean {
    return this.products.delete(id)
  }

  // Customer operations
  getAllCustomers(): Customer[] {
    return Array.from(this.customers.values())
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers.get(id)
  }

  addCustomer(customer: Omit<Customer, "id" | "createdAt">): Customer {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    this.customers.set(newCustomer.id, newCustomer)
    return newCustomer
  }

  updateCustomer(id: string, updates: Partial<Customer>): Customer | null {
    const customer = this.customers.get(id)
    if (!customer) return null

    const updatedCustomer = { ...customer, ...updates }
    this.customers.set(id, updatedCustomer)
    return updatedCustomer
  }

  // Bill operations
  getAllBills(): Bill[] {
    return Array.from(this.bills.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }

  getBillById(id: string): Bill | undefined {
    return this.bills.get(id)
  }

  addBill(bill: Omit<Bill, "id" | "billNumber" | "createdAt" | "updatedAt">): Bill {
    const billNumber = `BILL${Date.now()}`
    const newBill: Bill = {
      ...bill,
      id: Date.now().toString(),
      billNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.bills.set(newBill.id, newBill)

    // Update product stock
    newBill.items.forEach((item) => {
      const product = this.products.get(item.productId)
      if (product) {
        product.stock -= item.quantity
        this.products.set(product.id, product)
      }
    })

    return newBill
  }

  // Sales reports
  getSalesReport(startDate: Date, endDate: Date): SalesReport {
    const bills = this.getAllBills().filter((bill) => {
      const billDate = new Date(bill.createdAt)
      return billDate >= startDate && billDate <= endDate && bill.status === "completed"
    })

    const totalSales = bills.reduce((sum, bill) => sum + bill.total, 0)
    const totalTransactions = bills.length

    // Calculate top products
    const productSales = new Map<string, { name: string; quantity: number; revenue: number }>()

    bills.forEach((bill) => {
      bill.items.forEach((item) => {
        const existing = productSales.get(item.productId) || {
          name: item.productName,
          quantity: 0,
          revenue: 0,
        }
        existing.quantity += item.quantity
        existing.revenue += item.subtotal
        productSales.set(item.productId, existing)
      })
    })

    const topProducts = Array.from(productSales.entries())
      .map(([productId, data]) => ({
        productId,
        productName: data.name,
        quantitySold: data.quantity,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    return {
      date: new Date().toISOString().split("T")[0],
      totalSales,
      totalTransactions,
      topProducts,
    }
  }
}

export const database = new POSDatabase()
