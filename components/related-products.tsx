import { getAllProducts } from "@/lib/products"
import ProductCard from "./product-card"

export default function RelatedProducts({ currentProductId }: { currentProductId: number }) {
  const allProducts = getAllProducts()

  // Filter out current product and get up to 3 related products
  const relatedProducts = allProducts.filter((product) => product.id !== currentProductId).slice(0, 3)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {relatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
