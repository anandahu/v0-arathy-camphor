export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  sku: string
  image?: string
  createdAt: Date
  updatedAt: Date
}

export interface ProductStats {
  totalProducts: number
  totalValue: number
  lowStockCount: number
  outOfStockCount: number
  categories: string[]
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
  createdAt: Date
  lastOrderDate?: Date
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Report {
  id: string
  title: string
  type: "sales" | "inventory" | "customer" | "financial"
  data: any
  generatedAt: Date
}

class Database {
  private readonly PRODUCTS_KEY = "arathy_products"
  private readonly ORDERS_KEY = "arathy_orders"
  private readonly CUSTOMERS_KEY = "arathy_customers"
  private readonly CATEGORIES_KEY = "arathy_categories"
  private readonly REPORTS_KEY = "arathy_reports"

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    if (typeof window === "undefined") return

    // Initialize products
    if (!localStorage.getItem(this.PRODUCTS_KEY)) {
      const sampleProducts: Product[] = [
        {
          id: "1",
          name: "Premium Camphor Tablets",
          description: "Pure, natural camphor tablets made from the finest camphor crystals.",
          price: 150,
          stock: 50,
          category: "Camphor",
          sku: "CAM001",
          image: "/images/camphor-1.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Sacred Incense Sticks",
          description: "Handcrafted incense sticks with traditional fragrances.",
          price: 80,
          stock: 8,
          category: "Incense",
          sku: "INC001",
          image: "/images/incense-sticks.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          name: "Divine Agarbathy Collection",
          description: "Premium agarbathy sticks with authentic Indian fragrances.",
          price: 120,
          stock: 25,
          category: "Agarbathy",
          sku: "AGA001",
          image: "/images/incense-burning.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          name: "Temple Grade Camphor",
          description: "Highest quality camphor specially prepared for temple use.",
          price: 250,
          stock: 0,
          category: "Camphor",
          sku: "CAM002",
          image: "/images/camphor-2.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5",
          name: "Dhoop Cone Collection",
          description: "Aromatic dhoop cones made from natural herbs and resins.",
          price: 90,
          stock: 15,
          category: "Dhoop",
          sku: "DHO001",
          image: "/images/ritual-fire.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(sampleProducts))
    }

    // Initialize categories
    if (!localStorage.getItem(this.CATEGORIES_KEY)) {
      const sampleCategories: Category[] = [
        {
          id: "1",
          name: "Camphor",
          description: "Pure camphor products for spiritual ceremonies and daily prayers",
          productCount: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Incense",
          description: "Traditional incense sticks with authentic fragrances",
          productCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          name: "Agarbathy",
          description: "Premium agarbathy collection for meditation and worship",
          productCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          name: "Dhoop",
          description: "Aromatic dhoop cones made from natural herbs and resins",
          productCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(sampleCategories))
    }

    // Initialize orders
    if (!localStorage.getItem(this.ORDERS_KEY)) {
      const sampleOrders: Order[] = [
        {
          id: "1",
          customerName: "Priya Sharma",
          customerEmail: "priya@example.com",
          customerPhone: "+91 98765 43210",
          items: [
            { productId: "1", productName: "Premium Camphor Tablets", quantity: 2, price: 150 },
            { productId: "2", productName: "Sacred Incense Sticks", quantity: 1, price: 80 },
          ],
          total: 380,
          status: "completed",
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 86400000),
        },
        {
          id: "2",
          customerName: "Rajesh Kumar",
          customerEmail: "rajesh@example.com",
          customerPhone: "+91 87654 32109",
          items: [{ productId: "3", productName: "Divine Agarbathy Collection", quantity: 3, price: 120 }],
          total: 360,
          status: "processing",
          createdAt: new Date(Date.now() - 43200000),
          updatedAt: new Date(Date.now() - 43200000),
        },
      ]
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(sampleOrders))
    }

    // Initialize customers
    if (!localStorage.getItem(this.CUSTOMERS_KEY)) {
      const sampleCustomers: Customer[] = [
        {
          id: "1",
          name: "Priya Sharma",
          email: "priya@example.com",
          phone: "+91 98765 43210",
          address: "123 Temple Street, Mumbai, Maharashtra 400001",
          totalOrders: 5,
          totalSpent: 1250,
          createdAt: new Date(Date.now() - 2592000000),
          lastOrderDate: new Date(Date.now() - 86400000),
        },
        {
          id: "2",
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          phone: "+91 87654 32109",
          address: "456 Sacred Lane, Delhi, Delhi 110001",
          totalOrders: 3,
          totalSpent: 890,
          createdAt: new Date(Date.now() - 1728000000),
          lastOrderDate: new Date(Date.now() - 43200000),
        },
      ]
      localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(sampleCustomers))
    }
  }

  // Product methods
  getAllProducts(): Product[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(this.PRODUCTS_KEY)
    if (!data) return []
    return JSON.parse(data).map((p: any) => ({
      ...p,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }))
  }

  getProductById(id: string): Product | null {
    const products = this.getAllProducts()
    return products.find((p) => p.id === id) || null
  }

  addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    const products = this.getAllProducts()
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    products.push(newProduct)
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products))

    // Update category count
    this.updateCategoryProductCount()

    return newProduct
  }

  updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
    const products = this.getAllProducts()
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return null

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date(),
    }
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products))

    // Update category count
    this.updateCategoryProductCount()

    return products[index]
  }

  deleteProduct(id: string): boolean {
    const products = this.getAllProducts()
    const filteredProducts = products.filter((p) => p.id !== id)
    if (filteredProducts.length === products.length) return false
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(filteredProducts))

    // Update category count
    this.updateCategoryProductCount()

    return true
  }

  getProductsByCategory(category: string): Product[] {
    return this.getAllProducts().filter((p) => p.category === category)
  }

  getLowStockProducts(threshold = 10): Product[] {
    return this.getAllProducts().filter((p) => p.stock <= threshold && p.stock > 0)
  }

  getOutOfStockProducts(): Product[] {
    return this.getAllProducts().filter((p) => p.stock === 0)
  }

  getProductStats(): ProductStats {
    const products = this.getAllProducts()
    const categories = [...new Set(products.map((p) => p.category))]

    return {
      totalProducts: products.length,
      totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
      lowStockCount: this.getLowStockProducts().length,
      outOfStockCount: this.getOutOfStockProducts().length,
      categories,
    }
  }

  // Category methods
  getAllCategories(): Category[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(this.CATEGORIES_KEY)
    if (!data) return []
    return JSON.parse(data).map((c: any) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
    }))
  }

  addCategory(categoryData: Omit<Category, "id" | "createdAt" | "updatedAt" | "productCount">): Category {
    const categories = this.getAllCategories()
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      productCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    categories.push(newCategory)
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories))
    return newCategory
  }

  updateCategory(id: string, updates: Partial<Omit<Category, "id" | "createdAt" | "productCount">>): Category | null {
    const categories = this.getAllCategories()
    const index = categories.findIndex((c) => c.id === id)
    if (index === -1) return null

    categories[index] = {
      ...categories[index],
      ...updates,
      updatedAt: new Date(),
    }
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories))
    return categories[index]
  }

  deleteCategory(id: string): boolean {
    const categories = this.getAllCategories()
    const category = categories.find((c) => c.id === id)
    if (!category || category.productCount > 0) return false

    const filteredCategories = categories.filter((c) => c.id !== id)
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(filteredCategories))
    return true
  }

  private updateCategoryProductCount() {
    const categories = this.getAllCategories()
    const products = this.getAllProducts()

    categories.forEach((category) => {
      category.productCount = products.filter((p) => p.category === category.name).length
      category.updatedAt = new Date()
    })

    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories))
  }

  // Order methods
  getAllOrders(): Order[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(this.ORDERS_KEY)
    if (!data) return []
    return JSON.parse(data).map((o: any) => ({
      ...o,
      createdAt: new Date(o.createdAt),
      updatedAt: new Date(o.updatedAt),
    }))
  }

  getOrderById(id: string): Order | null {
    const orders = this.getAllOrders()
    return orders.find((o) => o.id === id) || null
  }

  addOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
    const orders = this.getAllOrders()
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    orders.push(newOrder)
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders))
    return newOrder
  }

  updateOrderStatus(id: string, status: Order["status"]): Order | null {
    const orders = this.getAllOrders()
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return null

    orders[index] = {
      ...orders[index],
      status,
      updatedAt: new Date(),
    }
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders))
    return orders[index]
  }

  // Customer methods
  getAllCustomers(): Customer[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(this.CUSTOMERS_KEY)
    if (!data) return []
    return JSON.parse(data).map((c: any) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      lastOrderDate: c.lastOrderDate ? new Date(c.lastOrderDate) : undefined,
    }))
  }

  getCustomerById(id: string): Customer | null {
    const customers = this.getAllCustomers()
    return customers.find((c) => c.id === id) || null
  }

  addCustomer(customerData: Omit<Customer, "id" | "createdAt" | "totalOrders" | "totalSpent">): Customer {
    const customers = this.getAllCustomers()
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date(),
    }
    customers.push(newCustomer)
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers))
    return newCustomer
  }

  updateCustomer(id: string, updates: Partial<Omit<Customer, "id" | "createdAt">>): Customer | null {
    const customers = this.getAllCustomers()
    const index = customers.findIndex((c) => c.id === id)
    if (index === -1) return null

    customers[index] = {
      ...customers[index],
      ...updates,
    }
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers))
    return customers[index]
  }

  deleteCustomer(id: string): boolean {
    const customers = this.getAllCustomers()
    const filteredCustomers = customers.filter((c) => c.id !== id)
    if (filteredCustomers.length === customers.length) return false
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(filteredCustomers))
    return true
  }

  // Report methods
  generateSalesReport(): Report {
    const orders = this.getAllOrders()
    const completedOrders = orders.filter((o) => o.status === "completed")

    const report: Report = {
      id: Date.now().toString(),
      title: "Sales Report",
      type: "sales",
      data: {
        totalSales: completedOrders.reduce((sum, o) => sum + o.total, 0),
        totalOrders: completedOrders.length,
        averageOrderValue:
          completedOrders.length > 0
            ? completedOrders.reduce((sum, o) => sum + o.total, 0) / completedOrders.length
            : 0,
        salesByMonth: this.getSalesByMonth(completedOrders),
        topProducts: this.getTopSellingProducts(completedOrders),
      },
      generatedAt: new Date(),
    }

    return report
  }

  generateInventoryReport(): Report {
    const products = this.getAllProducts()

    const report: Report = {
      id: Date.now().toString(),
      title: "Inventory Report",
      type: "inventory",
      data: {
        totalProducts: products.length,
        totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
        lowStockItems: this.getLowStockProducts(),
        outOfStockItems: this.getOutOfStockProducts(),
        categoryBreakdown: this.getCategoryBreakdown(products),
      },
      generatedAt: new Date(),
    }

    return report
  }

  generateCustomerReport(): Report {
    const customers = this.getAllCustomers()

    const report: Report = {
      id: Date.now().toString(),
      title: "Customer Report",
      type: "customer",
      data: {
        totalCustomers: customers.length,
        totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
        averageSpending:
          customers.length > 0 ? customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length : 0,
        topCustomers: customers.sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 10),
        newCustomersThisMonth: customers.filter((c) => c.createdAt.getMonth() === new Date().getMonth()).length,
      },
      generatedAt: new Date(),
    }

    return report
  }

  private getSalesByMonth(orders: Order[]) {
    const salesByMonth: { [key: string]: number } = {}
    orders.forEach((order) => {
      const month = order.createdAt.toISOString().slice(0, 7) // YYYY-MM
      salesByMonth[month] = (salesByMonth[month] || 0) + order.total
    })
    return salesByMonth
  }

  private getTopSellingProducts(orders: Order[]) {
    const productSales: { [key: string]: { name: string; quantity: number; revenue: number } } = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            quantity: 0,
            revenue: 0,
          }
        }
        productSales[item.productId].quantity += item.quantity
        productSales[item.productId].revenue += item.price * item.quantity
      })
    })

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)
  }

  private getCategoryBreakdown(products: Product[]) {
    const breakdown: { [key: string]: { count: number; value: number } } = {}

    products.forEach((product) => {
      if (!breakdown[product.category]) {
        breakdown[product.category] = { count: 0, value: 0 }
      }
      breakdown[product.category].count++
      breakdown[product.category].value += product.price * product.stock
    })

    return breakdown
  }
}

export const database = new Database()
