"use client"

import { useState, useEffect } from "react"
import ProductCard from "./product-card"
import { database, type Product } from "@/lib/database-persistent"

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    loadRelatedProducts()
  }, [currentProductId, category])

  const loadRelatedProducts = () => {
    const categoryProducts = database.getProductsByCategory(category)
    const filtered = categoryProducts.filter((product) => product.id !== currentProductId).slice(0, 4)
    setRelatedProducts(filtered)
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-8">Related Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
