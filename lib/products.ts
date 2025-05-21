export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  weights: string[]
  category: "agarbathi" | "camphor"
}

const products: Product[] = [
  {
    id: 1,
    name: "Sandal Agarbathi",
    description: "Premium sandalwood fragrance for peaceful meditation",
    price: 45,
    image: "/images/incense-sticks.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
  },
  {
    id: 2,
    name: "Rose Agarbathi",
    description: "Delicate rose fragrance for a soothing atmosphere",
    price: 40,
    image: "/images/incense-burning.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
  },
  {
    id: 3,
    name: "Jasmine Agarbathi",
    description: "Sweet jasmine aroma for divine worship",
    price: 40,
    image: "/images/incense-sticks.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
  },
  {
    id: 4,
    name: "Ooth Agarbathi",
    description: "Traditional ooth fragrance for temple rituals",
    price: 50,
    image: "/images/incense-burning.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
  },
  {
    id: 5,
    name: "Kesarchandan Agarbathi",
    description: "Luxurious blend of saffron and sandalwood",
    price: 55,
    image: "/images/incense-sticks.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "agarbathi",
  },
  {
    id: 6,
    name: "Pure Camphor Tablets",
    description: "High-quality camphor for aarti and rituals",
    price: 30,
    image: "/images/camphor-1.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "camphor",
  },
  {
    id: 7,
    name: "Camphor Cubes",
    description: "Long-lasting camphor cubes for puja ceremonies",
    price: 35,
    image: "/images/camphor-2.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "camphor",
  },
  {
    id: 8,
    name: "Premium Camphor",
    description: "Extra pure camphor for special occasions",
    price: 40,
    image: "/images/camphor-3.jpeg",
    weights: ["5g", "15g", "50g"],
    category: "camphor",
  },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: "agarbathi" | "camphor"): Product[] {
  return products.filter((product) => product.category === category)
}
