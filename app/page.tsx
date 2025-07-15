"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Leaf, ArrowRight, Phone, Mail, MapPin, Award, Shield, Clock, Sparkles, Star } from "lucide-react"
import ProductCard from "@/components/product-card"
import TestimonialCard from "@/components/testimonial-card"
import EnquiryForm from "@/components/enquiry-form"
import DecorativePattern from "@/components/decorative-pattern"
import DecorativeDivider from "@/components/decorative-divider"
import { database, type Product } from "@/lib/database-persistent"

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()

    // Set up interval to refresh products every 5 seconds to show new admin additions
    const interval = setInterval(loadFeaturedProducts, 5000)

    return () => clearInterval(interval)
  }, [])

  const loadFeaturedProducts = () => {
    try {
      const allProducts = database.getAllProducts()
      setFeaturedProducts(allProducts.slice(0, 6))
    } catch (error) {
      console.error("Error loading products:", error)
      setFeaturedProducts([])
    } finally {
      setLoading(false)
    }
  }

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      comment:
        "The camphor quality is exceptional! It burns cleanly and the fragrance is divine. I've been using Arathy products for years and they never disappoint.",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      comment:
        "Best incense sticks I've ever used. The sandalwood fragrance is authentic and long-lasting. Perfect for daily prayers and meditation.",
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Meera Patel",
      location: "Ahmedabad",
      rating: 4,
      comment:
        "Excellent quality agarbathy. The packaging is good and the products arrive fresh. Highly recommended for all spiritual needs.",
      avatar: "/placeholder-user.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-50 via-burgundy-50 to-flame-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vid1-2dmU0qFQO1COGTYyHBbdEdxgvOKJhy.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/40 via-burgundy-800/40 to-maroon-800/40"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <DecorativePattern className="absolute -top-10 -left-10 w-20 h-20 text-flame-300/30" />
          <DecorativePattern className="absolute -bottom-10 -right-10 w-20 h-20 text-flame-300/30" />

          <Badge className="mb-6 bg-maroon-600/90 text-white border-maroon-500">
            Premium Quality Spiritual Products
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Divine Fragrance
            <span className="block text-flame-200">Sacred Moments</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-flame-100 max-w-2xl mx-auto leading-relaxed">
            Experience the divine fragrance of our premium camphor and incense products, crafted with devotion for your
            spiritual journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white shadow-xl">
                <Flame className="mr-2 h-5 w-5" />
                Explore Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white hover:text-maroon-900 backdrop-blur-sm"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">Why Choose Arathy?</h2>
            <p className="text-lg text-maroon-600 max-w-2xl mx-auto">
              Discover what makes our products special and trusted by thousands of devotees worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-burgundy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">100% Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  Made from pure, natural ingredients without any artificial additives or chemicals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-flame-500 to-flame-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  Crafted with traditional methods to ensure the highest quality and authentic fragrance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-burgundy-600 to-maroon-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">Trusted Brand</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  Years of experience serving devotees with authentic spiritual products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <DecorativeDivider />

      {/* Featured Products or Launching Soon */}
      <section className="py-16 px-4 bg-gradient-to-b from-maroon-50 to-burgundy-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">Featured Products</h2>
            <p className="text-lg text-maroon-600 max-w-2xl mx-auto">
              Discover our most popular and highly-rated spiritual products, loved by devotees everywhere.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-maroon-200">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="bg-gray-300 h-48 rounded mb-4"></div>
                      <div className="bg-gray-300 h-4 rounded mb-2"></div>
                      <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/products">
                  <Button size="lg" className="bg-maroon-700 hover:bg-maroon-800 text-white">
                    View All Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            /* Launching Soon Section for Public Users */
            <div className="text-center py-16">
              <Card className="border-maroon-200 bg-gradient-to-br from-white via-maroon-50 to-flame-50 shadow-xl max-w-2xl mx-auto">
                <CardContent className="p-12">
                  <div className="mb-8">
                    <div className="relative inline-block">
                      <Sparkles className="h-16 w-16 text-flame-500 mx-auto animate-pulse" />
                      <Star className="h-6 w-6 text-maroon-600 absolute -top-2 -right-2 animate-bounce" />
                    </div>
                  </div>

                  <Badge className="mb-6 bg-gradient-to-r from-maroon-600 to-flame-600 text-white px-4 py-2 text-sm font-semibold">
                    Coming Soon
                  </Badge>

                  <h3 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">Launching Soon</h3>

                  <p className="text-lg text-maroon-700 mb-6 leading-relaxed">
                    We're preparing something special for you! Our premium collection of camphor and incense products
                    will be available soon. Get ready to experience divine fragrance like never before.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center gap-2 text-maroon-600">
                      <Shield className="h-5 w-5" />
                      <span>Premium Quality Products</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-maroon-600">
                      <Leaf className="h-5 w-5" />
                      <span>100% Natural Ingredients</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-maroon-600">
                      <Award className="h-5 w-5" />
                      <span>Traditional Craftsmanship</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white px-8">
                        <Mail className="mr-2 h-5 w-5" />
                        Get Notified
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-maroon-600 text-maroon-700 hover:bg-maroon-50 bg-transparent"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      <DecorativeDivider />

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-maroon-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers who have experienced the divine quality of our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <DecorativeDivider />

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-maroon-50 to-burgundy-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-maroon-600 max-w-2xl mx-auto">
              Have questions about our products or need bulk orders? We're here to help you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-burgundy-700 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-maroon-900 mb-2">Phone</h3>
                  <p className="text-maroon-600">+91 7907417217</p>
                  <p className="text-maroon-600">+91 9947362795</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-flame-500 to-flame-600 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-maroon-900 mb-2">Email</h3>
                  <p className="text-maroon-600">infoarathicamphor@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-burgundy-600 to-maroon-700 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-maroon-900 mb-2">Address</h3>
                  <p className="text-maroon-600">
                    Holy Maries Convent Road
                    <br />
                    Kumbalam PO, Ernakulam
                    <br />
                    Kerala, India - 682506
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-burgundy-700 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-maroon-900 mb-2">Business Hours</h3>
                  <p className="text-maroon-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p className="text-maroon-600">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-maroon-900 via-burgundy-900 to-maroon-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/images/arathy-logo.jpg" alt="Arathy Logo" className="h-10 w-auto rounded-md" />
                <div>
                  <h3 className="font-bold text-lg">Arathy Camphor</h3>
                  <p className="text-sm text-flame-200">& Agarbathy</p>
                </div>
              </div>
              <p className="text-maroon-200 text-sm">Bringing divine fragrance to your spiritual journey.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-maroon-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-maroon-200 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-maroon-200 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-maroon-200 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-maroon-200">Camphor</span>
                </li>
                <li>
                  <span className="text-maroon-200">Incense Sticks</span>
                </li>
                <li>
                  <span className="text-maroon-200">Agarbathy</span>
                </li>
                <li>
                  <span className="text-maroon-200">Dhoop</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm">
                <p className="text-maroon-200">+91 7907417217</p>
                <p className="text-maroon-200">+91 9947362795</p>
                <p className="text-maroon-200">infoarathicamphor@gmail.com</p>
                <p className="text-maroon-200">Holy Maries Convent Road</p>
                <p className="text-maroon-200">Kumbalam PO, Ernakulam</p>
                <p className="text-maroon-200">Kerala, India - 682506</p>
              </div>
            </div>
          </div>

          <DecorativeDivider className="py-8" />

          <div className="text-center text-sm text-maroon-200">
            <p>&copy; 2024 Arathy Camphor & Agarbathy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
