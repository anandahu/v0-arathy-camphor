export interface Category {
  id: string
  name: string
  description: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

// In-memory storage (in production, use a database)
const categories: Category[] = [
  {
    id: "agarbathi",
    name: "Agarbathi",
    description: "Premium quality incense sticks with various fragrances",
    slug: "agarbathi",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "camphor",
    name: "Camphor",
    description: "Pure camphor products for religious ceremonies",
    slug: "camphor",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

let nextId = 3

export function getAllCategories(): Category[] {
  return categories
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function addCategory(categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">): Category {
  const newCategory: Category = {
    ...categoryData,
    id: `category-${nextId++}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  categories.push(newCategory)
  return newCategory
}

export function updateCategory(id: string, categoryData: Partial<Omit<Category, "id" | "createdAt">>): Category | null {
  const index = categories.findIndex((category) => category.id === id)
  if (index === -1) return null

  categories[index] = {
    ...categories[index],
    ...categoryData,
    updatedAt: new Date(),
  }
  return categories[index]
}

export function deleteCategory(id: string): boolean {
  const index = categories.findIndex((category) => category.id === id)
  if (index === -1) return false

  categories.splice(index, 1)
  return true
}
