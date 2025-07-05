import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import DecorativePattern from "@/components/decorative-pattern"
import DecorativeDivider from "@/components/decorative-divider"
import { ArrowLeft, Award, Users, Globe, Heart, Leaf, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="flex items-center text-amber-600 hover:text-amber-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <DecorativePattern className="mx-auto mb-6 w-16 h-16 text-amber-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">About Arathy</h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            For over three decades, Arathy Camphor & Agarbathy has been dedicated to creating premium spiritual products
            that enhance your connection with the divine.
          </p>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-amber-700">
                <p>
                  Founded in 1985 by a family passionate about preserving traditional spiritual practices, Arathy began
                  as a small workshop dedicated to creating authentic camphor and incense products.
                </p>
                <p>
                  What started as a humble endeavor has grown into one of India's most trusted names in spiritual
                  products, serving thousands of families, temples, and spiritual centers across the nation.
                </p>
                <p>
                  Our commitment to quality, tradition, and spiritual authenticity has remained unchanged throughout our
                  journey, ensuring that every product carries the essence of devotion and purity.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/incense-background-new.jpeg"
                alt="Our Heritage"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </section>

        <DecorativeDivider />

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Values</h2>
            <p className="text-lg text-amber-700">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Purity</h3>
                <p className="text-amber-700">
                  We use only the finest natural ingredients, ensuring our products are pure and free from harmful
                  chemicals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Devotion</h3>
                <p className="text-amber-700">
                  Every product is crafted with devotion and blessed with traditional rituals to enhance your spiritual
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Excellence</h3>
                <p className="text-amber-700">
                  We maintain the highest standards of quality in every aspect of our production and service.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <DecorativeDivider />

        {/* Achievements Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-amber-700">Milestones that mark our journey</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">39+</h3>
              <p className="text-amber-700">Years of Excellence</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">10,000+</h3>
              <p className="text-amber-700">Happy Customers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">500+</h3>
              <p className="text-amber-700">Cities Served</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">4.9/5</h3>
              <p className="text-amber-700">Customer Rating</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Process</h2>
            <p className="text-lg text-amber-700">How we create products that touch your soul</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/prayer-ceremony.png"
                alt="Traditional Process"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Sacred Sourcing</h3>
                  <p className="text-amber-700">
                    We carefully source the finest natural ingredients from trusted suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Traditional Crafting</h3>
                  <p className="text-amber-700">
                    Our skilled artisans use time-honored techniques passed down through generations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Quality Assurance</h3>
                  <p className="text-amber-700">
                    Every product undergoes rigorous quality checks to ensure perfection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Blessed Packaging</h3>
                  <p className="text-amber-700">
                    Products are blessed and packaged with care to preserve their spiritual essence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Join Our Spiritual Journey</h2>
          <p className="text-lg text-amber-700 mb-8 max-w-2xl mx-auto">
            Experience the divine fragrance and spiritual connection that our products bring to your daily rituals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                Explore Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 bg-transparent"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
