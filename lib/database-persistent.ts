export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  sku: string
  images: string[]
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

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  createdAt: Date
  updatedAt: Date
}

class Database {
  private readonly PRODUCTS_KEY = "arathy_products"
  private readonly CATEGORIES_KEY = "arathy_categories"
  private readonly AUTH_KEY = "arathy_admin_auth"

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    if (typeof window === "undefined") return

    // Initialize products with multiple images
    if (!localStorage.getItem(this.PRODUCTS_KEY)) {
      const sampleProducts: Product[] = [
        {
          id: "1",
          name: "Premium Camphor Tablets",
          description:
            "Pure, natural camphor tablets made from the finest camphor crystals. Perfect for daily prayers and spiritual ceremonies. Burns cleanly with divine fragrance.",
          price: 150,
          stock: 50,
          category: "Camphor",
          sku: "CAM001",
          images: ["/images/camphor-1.jpeg", "/images/camphor-2.jpeg"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          name: "Sacred Incense Sticks",
          description:
            "Handcrafted incense sticks with traditional fragrances. Made from natural ingredients for authentic spiritual experience.",
          price: 80,
          stock: 8,
          category: "Incense",
          sku: "INC001",
          images: ["/images/incense-sticks.jpeg", "/images/incense-burning.jpeg"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          name: "Divine Agarbathy Collection",
          description:
            "Premium agarbathy sticks with authentic Indian fragrances. Long-lasting and aromatic for meditation and worship.",
          price: 120,
          stock: 25,
          category: "Agarbathy",
          sku: "AGA001",
          images: ["/images/incense-burning.jpeg", "/images/incense-sticks-new.jpeg"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          name: "Temple Grade Camphor",
          description:
            "Highest quality camphor specially prepared for temple use. Burns cleanly with divine fragrance and long-lasting aroma.",
          price: 250,
          stock: 0,
          category: "Camphor",
          sku: "CAM002",
          images: ["/images/camphor-2.jpeg", "/images/camphor-3.jpeg"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5",
          name: "Dhoop Cone Collection",
          description:
            "Aromatic dhoop cones made from natural herbs and resins. Perfect for meditation and creating a peaceful atmosphere.",
          price: 90,
          stock: 15,
          category: "Dhoop",
          sku: "DHO001",
          images: ["/images/ritual-fire.jpeg", "/images/ceremony-flames.jpeg"],
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
  }

  // Authentication methods
  setAuthSession(authenticated: boolean) {
    if (typeof window === "undefined") return
    localStorage.setItem(this.AUTH_KEY, authenticated.toString())
  }

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem(this.AUTH_KEY) === "true"
  }

  clearAuthSession() {
    if (typeof window === "undefined") return
    localStorage.removeItem(this.AUTH_KEY)
  }

  // Product methods with robust error handling
  getAllProducts(): Product[] {
    if (typeof window === "undefined") return []
    try {
      const data = localStorage.getItem(this.PRODUCTS_KEY)
      if (!data) return []
      const products = JSON.parse(data)
      return products.map((p: any) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : p.image ? [p.image] : [],
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      }))
    } catch (error) {
      console.error("Error loading products:", error)
      return []
    }
  }

  getProductById(id: string): Product | null {
    const products = this.getAllProducts()
    return products.find((p) => p.id === id) || null
  }

  addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
    try {
      const products = this.getAllProducts()
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        images: Array.isArray(productData.images) ? productData.images : [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      products.push(newProduct)
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products))
      this.updateCategoryProductCount()
      return newProduct
    } catch (error) {
      console.error("Error adding product:", error)
      throw new Error("Failed to add product")
    }
  }

  updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
    try {
      const products = this.getAllProducts()
      const index = products.findIndex((p) => p.id === id)
      if (index === -1) return null

      products[index] = {
        ...products[index],
        ...updates,
        images: Array.isArray(updates.images) ? updates.images : products[index].images,
        updatedAt: new Date(),
      }
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products))
      this.updateCategoryProductCount()
      return products[index]
    } catch (error) {
      console.error("Error updating product:", error)
      return null
    }
  }

  deleteProduct(id: string): boolean {
    try {
      const products = this.getAllProducts()
      const filteredProducts = products.filter((p) => p.id !== id)
      if (filteredProducts.length === products.length) return false
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(filteredProducts))
      this.updateCategoryProductCount()
      return true
    } catch (error) {
      console.error("Error deleting product:", error)
      return false
    }
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
    try {
      const data = localStorage.getItem(this.CATEGORIES_KEY)
      if (!data) return []
      return JSON.parse(data).map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
      }))
    } catch (error) {
      console.error("Error loading categories:", error)
      return []
    }
  }

  addCategory(categoryData: Omit<Category, "id" | "createdAt" | "updatedAt" | "productCount">): Category {
    try {
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
    } catch (error) {
      console.error("Error adding category:", error)
      throw new Error("Failed to add category")
    }
  }

  updateCategory(id: string, updates: Partial<Omit<Category, "id" | "createdAt" | "productCount">>): Category | null {
    try {
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
    } catch (error) {
      console.error("Error updating category:", error)
      return null
    }
  }

  deleteCategory(id: string): boolean {
    try {
      const categories = this.getAllCategories()
      const category = categories.find((c) => c.id === id)
      if (!category || category.productCount > 0) return false

      const filteredCategories = categories.filter((c) => c.id !== id)
      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(filteredCategories))
      return true
    } catch (error) {
      console.error("Error deleting category:", error)
      return false
    }
  }

  private updateCategoryProductCount() {
    try {
      const categories = this.getAllCategories()
      const products = this.getAllProducts()

      categories.forEach((category) => {
        category.productCount = products.filter((p) => p.category === category.name).length
        category.updatedAt = new Date()
      })

      localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories))
    } catch (error) {
      console.error("Error updating category counts:", error)
    }
  }

  // Data backup and restore methods
  exportData(): string {
    try {
      const data = {
        products: this.getAllProducts(),
        categories: this.getAllCategories(),
        exportDate: new Date().toISOString(),
      }
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error("Error exporting data:", error)
      throw new Error("Failed to export data")
    }
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      if (data.products && Array.isArray(data.products)) {
        localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(data.products))
      }
      if (data.categories && Array.isArray(data.categories)) {
        localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(data.categories))
      }
      return true
    } catch (error) {
      console.error("Error importing data:", error)
      return false
    }
  }
}

export const database = new Database()
