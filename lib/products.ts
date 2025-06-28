export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  features: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Camphor Tablets",
    description:
      "Pure, high-quality camphor tablets perfect for daily prayers and religious ceremonies. Made from natural camphor with no artificial additives.",
    price: 150,
    originalPrice: 180,
    category: "Camphor",
    image: "/images/camphor-1.jpeg",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    features: ["100% Natural", "Long Burning", "Pure Fragrance", "Temple Grade"],
  },
  {
    id: "2",
    name: "Sandalwood Incense Sticks",
    description:
      "Aromatic sandalwood incense sticks that create a peaceful and meditative atmosphere. Hand-rolled with pure sandalwood powder.",
    price: 80,
    originalPrice: 100,
    category: "Incense",
    image: "/images/incense-sticks.jpeg",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    features: ["Hand-rolled", "Pure Sandalwood", "Long Lasting", "Meditation Grade"],
  },
  {
    id: "3",
    name: "Rose Agarbathy",
    description:
      "Delicate rose-scented agarbathy sticks that fill your space with the divine fragrance of fresh roses. Perfect for evening prayers.",
    price: 60,
    originalPrice: 75,
    category: "Agarbathy",
    image: "/images/incense-burning.jpeg",
    rating: 4.6,
    reviews: 67,
    inStock: true,
    features: ["Rose Fragrance", "Evening Prayers", "Natural Ingredients", "Soothing"],
  },
  {
    id: "4",
    name: "Jasmine Incense Cones",
    description:
      "Premium jasmine incense cones that burn slowly and release a beautiful floral fragrance. Ideal for meditation and relaxation.",
    price: 120,
    originalPrice: 140,
    category: "Incense",
    image: "/images/ritual-fire.jpeg",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    features: ["Jasmine Scent", "Slow Burning", "Meditation", "Premium Quality"],
  },
  {
    id: "5",
    name: "Traditional Dhoop Sticks",
    description:
      "Authentic dhoop sticks made with traditional herbs and natural ingredients. Creates thick, aromatic smoke perfect for pujas.",
    price: 90,
    originalPrice: 110,
    category: "Dhoop",
    image: "/images/incense-background.jpeg",
    rating: 4.5,
    reviews: 43,
    inStock: false,
    features: ["Traditional Recipe", "Herbal Blend", "Thick Smoke", "Puja Special"],
  },
  {
    id: "6",
    name: "Lavender Camphor Cubes",
    description:
      "Unique lavender-scented camphor cubes that combine the purifying properties of camphor with the calming essence of lavender.",
    price: 180,
    originalPrice: 200,
    category: "Camphor",
    image: "/images/ritual-ceremony.jpeg",
    rating: 4.4,
    reviews: 78,
    inStock: true,
    features: ["Lavender Scent", "Calming", "Purifying", "Unique Blend"],
  },
  {
    id: "7",
    name: "Sacred Temple Incense",
    description:
      "Special blend incense used in ancient temples. Made with rare herbs and blessed ingredients for spiritual ceremonies.",
    price: 200,
    originalPrice: 250,
    category: "Incense",
    image: "/images/incense-temple.png",
    rating: 5.0,
    reviews: 234,
    inStock: true,
    features: ["Temple Grade", "Blessed", "Rare Herbs", "Spiritual"],
  },
  {
    id: "8",
    name: "Divine Camphor Powder",
    description:
      "Fine camphor powder for special rituals and ceremonies. Pure and potent for creating sacred atmosphere.",
    price: 95,
    originalPrice: 120,
    category: "Camphor",
    image: "/images/camphor-2.jpeg",
    rating: 4.7,
    reviews: 91,
    inStock: true,
    features: ["Fine Powder", "Ritual Grade", "Pure", "Potent"],
  },
]

export const getAllProducts = () => products
export const getProductById = (id: string) => products.find((p) => p.id === id)
export const getProductsByCategory = (category: string) => products.filter((p) => p.category === category)
export const getFeaturedProducts = () => products.slice(0, 6)
