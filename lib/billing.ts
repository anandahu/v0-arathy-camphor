export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    pincode?: string
    country?: string
  }
  gstNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface OfflineProduct {
  id: number
  name: string
  description: string
  basePrice: number
  category: string
  sku?: string
  manufacturer?: string
  units: ProductUnit[]
  tags: ("top-selling" | "best-selling" | "offer")[]
  stock?: number
  images: string[]
  isOfflineOnly: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductUnit {
  id: string
  name: string
  abbreviation: string
  baseQuantity: number
  priceMultiplier: number
  isDefault: boolean
}

export interface InvoiceItem {
  productId: number
  productName: string
  sku: string
  quantity: number
  unitId: string
  unitName: string
  unitPrice: number
  discount: number
  taxRate: number
  total: number
  isOfflineProduct: boolean
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId: string
  customerName: string
  customerAddress: string
  customerGST?: string
  items: InvoiceItem[]
  subtotal: number
  discount: number
  taxAmount: number
  totalAmount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  paymentMethod?: "cash" | "card" | "upi" | "bank_transfer" | "cheque"
  paymentDate?: Date
  dueDate: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  invoiceId: string
  amount: number
  method: "cash" | "card" | "upi" | "bank_transfer" | "cheque"
  reference?: string
  date: Date
  notes?: string
  createdAt: Date
}

export interface TaxSettings {
  cgst: number
  sgst: number
  igst: number
  defaultTaxRate: number
}

// Common units for products
export const COMMON_UNITS: ProductUnit[] = [
  { id: "gram", name: "Gram", abbreviation: "g", baseQuantity: 1, priceMultiplier: 1, isDefault: true },
  { id: "kilogram", name: "Kilogram", abbreviation: "kg", baseQuantity: 1000, priceMultiplier: 1000, isDefault: false },
  { id: "piece", name: "Piece", abbreviation: "pc", baseQuantity: 1, priceMultiplier: 1, isDefault: false },
  { id: "box", name: "Box", abbreviation: "box", baseQuantity: 1, priceMultiplier: 1, isDefault: false },
  { id: "bottle", name: "Bottle", abbreviation: "btl", baseQuantity: 1, priceMultiplier: 1, isDefault: false },
  { id: "packet", name: "Packet", abbreviation: "pkt", baseQuantity: 1, priceMultiplier: 1, isDefault: false },
  { id: "dozen", name: "Dozen", abbreviation: "dz", baseQuantity: 12, priceMultiplier: 12, isDefault: false },
]

// In-memory storage
const customers: Customer[] = [
  {
    id: "cust-001",
    name: "Radha Krishnan",
    email: "radha@example.com",
    phone: "+91 98765 43210",
    address: {
      street: "123 Temple Street",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
      country: "India",
    },
    gstNumber: "32ABCDE1234F1Z5",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "cust-002",
    name: "Lakshmi Devi",
    phone: "+91 98765 43211",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: "cust-003",
    name: "Venkat Rao",
    phone: "+91 98765 43212",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
]

const offlineProducts: OfflineProduct[] = [
  {
    id: 1001,
    name: "Bulk Sandal Agarbathi",
    description: "Premium sandalwood agarbathi for wholesale",
    basePrice: 40, // Price per gram
    category: "agarbathi",
    sku: "BSA001",
    manufacturer: "Jyothys Enterprises",
    units: [
      { id: "gram", name: "Gram", abbreviation: "g", baseQuantity: 1, priceMultiplier: 1, isDefault: true },
      {
        id: "kilogram",
        name: "Kilogram",
        abbreviation: "kg",
        baseQuantity: 1000,
        priceMultiplier: 950,
        isDefault: false,
      },
      { id: "box", name: "Box (500g)", abbreviation: "box", baseQuantity: 500, priceMultiplier: 480, isDefault: false },
    ],
    tags: ["top-selling"],
    stock: 5000,
    images: ["/images/incense-sticks.jpeg"],
    isOfflineOnly: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: 1002,
    name: "Camphor Tablets Bulk",
    description: "Pure camphor tablets for bulk sales",
    basePrice: 25, // Price per gram
    category: "camphor",
    sku: "CTB001",
    manufacturer: "Jyothys Enterprises",
    units: [
      { id: "gram", name: "Gram", abbreviation: "g", baseQuantity: 1, priceMultiplier: 1, isDefault: true },
      {
        id: "kilogram",
        name: "Kilogram",
        abbreviation: "kg",
        baseQuantity: 1000,
        priceMultiplier: 900,
        isDefault: false,
      },
      {
        id: "bottle",
        name: "Bottle (250g)",
        abbreviation: "btl",
        baseQuantity: 250,
        priceMultiplier: 230,
        isDefault: false,
      },
    ],
    tags: ["best-selling"],
    stock: 3000,
    images: ["/images/camphor-1.jpeg"],
    isOfflineOnly: true,
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: 1003,
    name: "Mixed Agarbathi Pack",
    description: "Assorted agarbathi varieties for retail",
    basePrice: 50, // Price per piece
    category: "agarbathi",
    sku: "MAP001",
    manufacturer: "Jyothys Enterprises",
    units: [
      { id: "piece", name: "Piece", abbreviation: "pc", baseQuantity: 1, priceMultiplier: 1, isDefault: true },
      { id: "dozen", name: "Dozen", abbreviation: "dz", baseQuantity: 12, priceMultiplier: 11, isDefault: false },
      { id: "box", name: "Box (24 pcs)", abbreviation: "box", baseQuantity: 24, priceMultiplier: 20, isDefault: false },
    ],
    tags: ["offer"],
    stock: 200,
    images: ["/images/incense-burning.jpeg"],
    isOfflineOnly: true,
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
]

const invoices: Invoice[] = []

const payments: Payment[] = []

const taxSettings: TaxSettings = {
  cgst: 9,
  sgst: 9,
  igst: 18,
  defaultTaxRate: 18,
}

let nextCustomerId = 4
let nextOfflineProductId = 1004
let nextInvoiceNumber = 1
let nextPaymentId = 1

// ===== CUSTOMER FUNCTIONS =====
export function getAllCustomers(): Customer[] {
  return customers
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id)
}

export function addCustomer(customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">): Customer {
  const newCustomer: Customer = {
    ...customerData,
    id: `cust-${String(nextCustomerId++).padStart(3, "0")}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  customers.push(newCustomer)
  return newCustomer
}

export function updateCustomer(id: string, customerData: Partial<Omit<Customer, "id" | "createdAt">>): Customer | null {
  const index = customers.findIndex((customer) => customer.id === id)
  if (index === -1) return null

  customers[index] = {
    ...customers[index],
    ...customerData,
    updatedAt: new Date(),
  }
  return customers[index]
}

export function deleteCustomer(id: string): boolean {
  const index = customers.findIndex((customer) => customer.id === id)
  if (index === -1) return false

  customers.splice(index, 1)
  return true
}

// ===== OFFLINE PRODUCT FUNCTIONS =====
export function getAllOfflineProducts(): OfflineProduct[] {
  return offlineProducts
}

export function getOfflineProductById(id: number): OfflineProduct | undefined {
  return offlineProducts.find((product) => product.id === id)
}

export function getOfflineProductsByCategory(category: string): OfflineProduct[] {
  return offlineProducts.filter((product) => product.category === category)
}

export function addOfflineProduct(productData: Omit<OfflineProduct, "id" | "createdAt" | "updatedAt">): OfflineProduct {
  const newProduct: OfflineProduct = {
    ...productData,
    id: nextOfflineProductId++,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  offlineProducts.push(newProduct)
  return newProduct
}

export function updateOfflineProduct(
  id: number,
  productData: Partial<Omit<OfflineProduct, "id" | "createdAt">>,
): OfflineProduct | null {
  const index = offlineProducts.findIndex((product) => product.id === id)
  if (index === -1) return null

  offlineProducts[index] = {
    ...offlineProducts[index],
    ...productData,
    updatedAt: new Date(),
  }
  return offlineProducts[index]
}

export function deleteOfflineProduct(id: number): boolean {
  const index = offlineProducts.findIndex((product) => product.id === id)
  if (index === -1) return false

  offlineProducts.splice(index, 1)
  return true
}

// ===== INVOICE FUNCTIONS =====
export function getAllInvoices(): Invoice[] {
  return invoices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getInvoiceById(id: string): Invoice | undefined {
  return invoices.find((invoice) => invoice.id === id)
}

export function addInvoice(invoiceData: Omit<Invoice, "id" | "invoiceNumber" | "createdAt" | "updatedAt">): Invoice {
  const newInvoice: Invoice = {
    ...invoiceData,
    id: `inv-${String(nextInvoiceNumber).padStart(3, "0")}`,
    invoiceNumber: `INV-2024-${String(nextInvoiceNumber++).padStart(3, "0")}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  invoices.push(newInvoice)

  // Update stock for offline products
  newInvoice.items.forEach((item) => {
    if (item.isOfflineProduct) {
      const product = getOfflineProductById(item.productId)
      if (product && product.stock !== undefined) {
        const unit = product.units.find((u) => u.id === item.unitId)
        if (unit) {
          const stockReduction = item.quantity * unit.baseQuantity
          updateOfflineProduct(item.productId, {
            stock: Math.max(0, product.stock - stockReduction),
          })
        }
      }
    }
  })

  return newInvoice
}

export function updateInvoice(id: string, invoiceData: Partial<Omit<Invoice, "id" | "createdAt">>): Invoice | null {
  const index = invoices.findIndex((invoice) => invoice.id === id)
  if (index === -1) return null

  invoices[index] = {
    ...invoices[index],
    ...invoiceData,
    updatedAt: new Date(),
  }
  return invoices[index]
}

export function deleteInvoice(id: string): boolean {
  const index = invoices.findIndex((invoice) => invoice.id === id)
  if (index === -1) return false

  invoices.splice(index, 1)
  return true
}

// ===== PAYMENT FUNCTIONS =====
export function getAllPayments(): Payment[] {
  return payments.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function getPaymentsByInvoiceId(invoiceId: string): Payment[] {
  return payments.filter((payment) => payment.invoiceId === invoiceId)
}

export function addPayment(paymentData: Omit<Payment, "id" | "createdAt">): Payment {
  const newPayment: Payment = {
    ...paymentData,
    id: `pay-${String(nextPaymentId++).padStart(3, "0")}`,
    createdAt: new Date(),
  }
  payments.push(newPayment)

  // Update invoice status if fully paid
  const invoice = getInvoiceById(paymentData.invoiceId)
  if (invoice) {
    const totalPaid = getPaymentsByInvoiceId(paymentData.invoiceId).reduce((sum, p) => sum + p.amount, 0)
    if (totalPaid >= invoice.totalAmount) {
      updateInvoice(paymentData.invoiceId, { status: "paid", paymentDate: paymentData.date })
    }
  }

  return newPayment
}

// ===== TAX FUNCTIONS =====
export function getTaxSettings(): TaxSettings {
  return taxSettings
}

export function updateTaxSettings(newSettings: Partial<TaxSettings>): TaxSettings {
  Object.assign(taxSettings, newSettings)
  return taxSettings
}

// ===== CALCULATION FUNCTIONS =====
export function calculateItemTotal(item: Omit<InvoiceItem, "total">): number {
  const subtotal = item.quantity * item.unitPrice - item.discount
  const taxAmount = (subtotal * item.taxRate) / 100
  return subtotal + taxAmount
}

export function calculateInvoiceTotals(items: InvoiceItem[], discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const totalDiscount = discount + items.reduce((sum, item) => sum + item.discount, 0)
  const taxableAmount = subtotal - totalDiscount
  const taxAmount = items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice - item.discount
    return sum + (itemSubtotal * item.taxRate) / 100
  }, 0)
  const totalAmount = taxableAmount + taxAmount

  return {
    subtotal,
    discount: totalDiscount,
    taxAmount,
    totalAmount,
  }
}

// ===== UNIT CALCULATION FUNCTIONS =====
export function calculateUnitPrice(basePrice: number, unit: ProductUnit): number {
  return basePrice * unit.priceMultiplier
}

export function getAvailableUnits(): ProductUnit[] {
  return COMMON_UNITS
}

// ===== REPORT FUNCTIONS =====
export function getFinancialReport(startDate: Date, endDate: Date) {
  const filteredInvoices = invoices.filter((invoice) => invoice.createdAt >= startDate && invoice.createdAt <= endDate)

  const totalSales = filteredInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
  const totalTax = filteredInvoices.reduce((sum, invoice) => sum + invoice.taxAmount, 0)
  const paidInvoices = filteredInvoices.filter((invoice) => invoice.status === "paid")
  const totalPaid = paidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
  const pendingAmount = totalSales - totalPaid

  return {
    totalInvoices: filteredInvoices.length,
    totalSales,
    totalTax,
    totalPaid,
    pendingAmount,
    paidInvoices: paidInvoices.length,
    pendingInvoices: filteredInvoices.length - paidInvoices.length,
  }
}

export function getTopSellingProducts(startDate: Date, endDate: Date) {
  const filteredInvoices = invoices.filter((invoice) => invoice.createdAt >= startDate && invoice.createdAt <= endDate)

  const productSales: Record<string, { name: string; quantity: number; revenue: number; isOffline: boolean }> = {}

  filteredInvoices.forEach((invoice) => {
    invoice.items.forEach((item) => {
      const key = `${item.productId}-${item.isOfflineProduct ? "offline" : "online"}`
      if (!productSales[key]) {
        productSales[key] = {
          name: item.productName,
          quantity: 0,
          revenue: 0,
          isOffline: item.isOfflineProduct,
        }
      }
      productSales[key].quantity += item.quantity
      productSales[key].revenue += item.total
    })
  })

  return Object.entries(productSales)
    .map(([key, data]) => ({ productKey: key, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
}

// ===== SEARCH FUNCTIONS =====
export function searchOfflineProducts(query: string): OfflineProduct[] {
  const lowercaseQuery = query.toLowerCase()
  return offlineProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.sku?.toLowerCase().includes(lowercaseQuery),
  )
}

export function searchCustomers(query: string): Customer[] {
  const lowercaseQuery = query.toLowerCase()
  return customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(lowercaseQuery) ||
      customer.email?.toLowerCase().includes(lowercaseQuery) ||
      customer.phone?.includes(query) ||
      customer.gstNumber?.toLowerCase().includes(lowercaseQuery),
  )
}

// ===== VALIDATION FUNCTIONS =====
export function validateCustomerData(data: Partial<Customer>): string[] {
  const errors: string[] = []

  if (!data.name || data.name.trim().length === 0) {
    errors.push("Customer name is required")
  }

  if (!data.phone || data.phone.trim().length === 0) {
    errors.push("Phone number is required")
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format")
  }

  if (data.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(data.gstNumber)) {
    errors.push("Invalid GST number format")
  }

  return errors
}

export function validateOfflineProductData(data: Partial<OfflineProduct>): string[] {
  const errors: string[] = []

  if (!data.name || data.name.trim().length === 0) {
    errors.push("Product name is required")
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push("Product description is required")
  }

  if (!data.basePrice || data.basePrice <= 0) {
    errors.push("Base price must be greater than 0")
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push("Product category is required")
  }

  if (!data.units || data.units.length === 0) {
    errors.push("At least one unit must be defined")
  }

  if (data.units && !data.units.some((unit) => unit.isDefault)) {
    errors.push("At least one unit must be marked as default")
  }

  return errors
}

// ===== UTILITY FUNCTIONS =====
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function generateInvoiceNumber(): string {
  return `INV-2024-${String(nextInvoiceNumber).padStart(3, "0")}`
}

export function generateCustomerId(): string {
  return `cust-${String(nextCustomerId).padStart(3, "0")}`
}
