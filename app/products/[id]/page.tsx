import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import EnquiryForm from "@/components/enquiry-form"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import { getAllProducts, getProductById } from "@/lib/products"

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(Number.parseInt(params.id))

  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">Product not found</div>
  }

  return (
    <main className="min-h-screen bg-amber-50/50">
      {/* Breadcrumb */}
      <div className="bg-amber-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-amber-800">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/#products" className="hover:underline">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-amber-700 hover:text-amber-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to all products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="relative h-[400px] overflow-hidden rounded-lg border border-amber-200 bg-white shadow-md">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="relative h-24 cursor-pointer overflow-hidden rounded-md border border-amber-200 bg-white"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-amber-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-amber-700">24 reviews</span>
                </div>
                <p className="text-xl font-semibold text-amber-800 mb-4">₹{product.price}.00</p>
                <p className="text-amber-700 leading-relaxed">{product.description}</p>
                <p className="mt-4 text-amber-700 leading-relaxed">
                  Our premium {product.name.toLowerCase()} is crafted using traditional methods passed down through
                  generations. Each product is made with the finest ingredients to ensure a pure and authentic
                  experience for your devotional needs.
                </p>
              </div>

              <div className="border-t border-amber-200 pt-6">
                <h3 className="font-medium text-amber-900 mb-3">Select Weight:</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {product.weights.map((weight) => (
                    <Button
                      key={weight}
                      variant="outline"
                      className="border-amber-300 hover:border-amber-500 hover:bg-amber-100"
                    >
                      {weight}
                    </Button>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-5 w-5 mr-2" /> Enquire Now
                </Button>
              </div>

              <div className="bg-white rounded-lg border border-amber-200 p-4">
                <h3 className="font-medium text-amber-900 mb-2">Product Highlights:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>100% pure and natural ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Long-lasting fragrance for extended rituals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Handcrafted using traditional methods</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>Ideal for daily puja and special occasions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-amber-100">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6 border border-amber-100 rounded-b-lg">
              <div className="prose max-w-none text-amber-800">
                <h3 className="text-xl font-semibold text-amber-900 mb-4">About {product.name}</h3>
                <p>
                  {product.name} is one of our premium offerings, carefully crafted to enhance your spiritual
                  experience. The fragrance is designed to create a serene and peaceful atmosphere, perfect for
                  meditation and prayer.
                </p>
                <p className="mt-4">
                  Our products are made using traditional methods that have been passed down through generations. We
                  source only the finest ingredients to ensure that our products meet the highest standards of quality
                  and purity.
                </p>
                <p className="mt-4">
                  Whether you're performing daily rituals or celebrating special occasions, our{" "}
                  {product.name.toLowerCase()}
                  will help create the perfect ambiance for your devotional needs.
                </p>

                <h3 className="text-xl font-semibold text-amber-900 mt-8 mb-4">How to Use</h3>
                <p>For Agarbathies (Incense Sticks):</p>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li>Place the incense stick in a suitable holder.</li>
                  <li>Light the tip of the stick until it catches fire.</li>
                  <li>Blow out the flame gently, allowing the stick to smolder and release its fragrance.</li>
                  <li>Place the holder in a safe location away from flammable materials.</li>
                </ol>

                <p className="mt-4">For Camphor:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li>Place the camphor tablet in a fire-safe container or aarti plate.</li>
                  <li>Light the camphor using a match or lighter.</li>
                  <li>Use for aarti ceremonies or rituals as required.</li>
                  <li>Always handle with care and keep away from flammable materials.</li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="p-6 border border-amber-100 rounded-b-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-amber-200">
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Product Name</th>
                      <td className="py-3 text-amber-700">{product.name}</td>
                    </tr>
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Available Weights</th>
                      <td className="py-3 text-amber-700">{product.weights.join(", ")}</td>
                    </tr>
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Ingredients</th>
                      <td className="py-3 text-amber-700">100% Natural, Premium Quality</td>
                    </tr>
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Fragrance Duration</th>
                      <td className="py-3 text-amber-700">30-45 minutes (for agarbathies)</td>
                    </tr>
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Packaging</th>
                      <td className="py-3 text-amber-700">Eco-friendly packaging</td>
                    </tr>
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Shelf Life</th>
                      <td className="py-3 text-amber-700">12 months from date of manufacture</td>
                    </tr>
                    <tr className="border-b border-amber-200">
                      <th className="py-3 text-amber-900 font-medium">Storage</th>
                      <td className="py-3 text-amber-700">Store in a cool, dry place away from direct sunlight</td>
                    </tr>
                    <tr>
                      <th className="py-3 text-amber-900 font-medium">Country of Origin</th>
                      <td className="py-3 text-amber-700">India</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 border border-amber-100 rounded-b-lg">
              <ProductReviews productId={product.id} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-amber-900 mb-8">Enquire About This Product</h2>
            <EnquiryForm productName={product.name} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-amber-900 mb-8">You May Also Like</h2>
          <RelatedProducts currentProductId={product.id} />
        </div>
      </section>
    </main>
  )
}
