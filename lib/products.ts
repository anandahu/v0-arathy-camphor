export interface Product {
  id: number
  name: string
  description: string
  price: number
  images: string[] // Now stores local file paths instead of URLs
  weights: string[]
  category: string
  tags: ("top-selling" | "best-selling" | "offer")[]
  sku?: string
  stock?: number
  manufacturer?: string
  createdAt: Date
  updatedAt: Date
}

// In-memory storage (in production, use a database)
const products: Product[] = [
  {
    id: 1,
    name: "Sandal Agarbathi",
    description: "Premium sandalwood fragrance for peaceful meditation",
    price: 45,
    images: ["/images/incense-sticks.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
    tags: ["top-selling", "best-selling"],
    sku: "SA001",
    stock: 100,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: 2,
    name: "Rose Agarbathi",
    description: "Delicate rose fragrance for a soothing atmosphere",
    price: 40,
    images: ["/images/incense-burning.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
    tags: ["best-selling"],
    sku: "RA001",
    stock: 150,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
  {
    id: 3,
    name: "Jasmine Agarbathi",
    description: "Sweet jasmine aroma for divine worship",
    price: 40,
    images: ["/images/incense-sticks.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
    tags: ["offer"],
    sku: "JA001",
    stock: 80,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-03"),
    updatedAt: new Date("2023-01-03"),
  },
  {
    id: 4,
    name: "Ooth Agarbathi",
    description: "Traditional ooth fragrance for temple rituals",
    price: 50,
    images: ["/images/incense-burning.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
    tags: [],
    sku: "OA001",
    stock: 60,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-04"),
    updatedAt: new Date("2023-01-04"),
  },
  {
    id: 5,
    name: "Kesarchandan Agarbathi",
    description: "Luxurious blend of saffron and sandalwood",
    price: 55,
    images: ["/images/incense-sticks.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
    tags: ["top-selling"],
    sku: "KA001",
    stock: 120,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-05"),
    updatedAt: new Date("2023-01-05"),
  },
  {
    id: 6,
    name: "Pure Camphor Tablets",
    description: "High-quality camphor for aarti and rituals",
    price: 30,
    images: ["/images/camphor-1.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "camphor",
    tags: ["best-selling"],
    sku: "PCT001",
    stock: 200,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-06"),
    updatedAt: new Date("2023-01-06"),
  },
  {
    id: 7,
    name: "Camphor Cubes",
    description: "Long-lasting camphor cubes for puja ceremonies",
    price: 35,
    images: ["/images/camphor-2.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "camphor",
    tags: ["offer"],
    sku: "CC001",
    stock: 90,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-07"),
    updatedAt: new Date("2023-01-07"),
  },
  {
    id: 8,
    name: "Premium Camphor",
    description: "Extra pure camphor for special occasions",
    price: 40,
    images: ["/images/camphor-3.jpeg"],
    weights: ["5g", "15g", "50g"],
    category: "camphor",
    tags: ["top-selling"],
    sku: "PC001",
    stock: 75,
    manufacturer: "Jyothys Enterprises",
    createdAt: new Date("2023-01-08"),
    updatedAt: new Date("2023-01-08"),
  },
]

let nextId = 9

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getProductsByTag(tag: "top-selling" | "best-selling" | "offer"): Product[] {
  return products.filter((product) => product.tags.includes(tag))
}

export function addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const newProduct: Product = {
    ...productData,
    id: nextId++,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  products.push(newProduct)
  return newProduct
}

export function updateProduct(id: number, productData: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return null

  products[index] = {
    ...products[index],
    ...productData,
    updatedAt: new Date(),
  }
  return products[index]
}

export function deleteProduct(id: number): boolean {
  const index = products.findIndex((product) => product.id === id)
  if (index === -1) return false

  products.splice(index, 1)
  return true
}

export function updateProductStock(id: number, quantity: number): Product | null {
  const product = getProductById(id)
  if (!product) return null

  const updatedStock = Math.max(0, (product.stock || 0) - quantity)
  return updateProduct(id, { stock: updatedStock })
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.sku?.toLowerCase().includes(lowercaseQuery),
  )
}
