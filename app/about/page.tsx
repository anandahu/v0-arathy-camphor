import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Leaf, Heart, Award, ArrowRight, Users, Clock, Shield } from "lucide-react"
import DecorativePattern from "@/components/decorative-pattern"
import DecorativeDivider from "@/components/decorative-divider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-50 via-burgundy-50 to-flame-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <DecorativePattern className="mx-auto mb-6 text-maroon-300" />
          <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-6">About Arathy Camphor</h1>
          <p className="text-xl text-maroon-600 max-w-3xl mx-auto leading-relaxed">
            Preserving sacred traditions through premium quality spiritual products, crafted with devotion and care for
            your divine moments.
          </p>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-maroon-100 text-maroon-800 border-maroon-200">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-6">A Journey of Devotion</h2>
              <p className="text-lg text-maroon-700 mb-6 leading-relaxed">
                Arathy Camphor & Agarbathy began with a simple yet profound mission: to provide devotees with the
                purest, most authentic spiritual products that enhance their connection with the divine.
              </p>
              <p className="text-lg text-maroon-700 mb-6 leading-relaxed">
                Our journey is rooted in tradition, guided by devotion, and committed to excellence. Every product we
                create carries the essence of our dedication to preserving the sacred rituals that have been passed down
                through generations.
              </p>
              <p className="text-lg text-maroon-700 mb-8 leading-relaxed">
                From our location in Kerala, we serve families across India, bringing them the finest camphor and
                incense products that transform ordinary moments into sacred experiences.
              </p>
              <Button asChild size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white">
                <Link href="/products">
                  Explore Our Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/images/ritual-ceremony-new.png"
                alt="Traditional ritual ceremony"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-maroon-600 rounded-full flex items-center justify-center">
                <Flame className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </section>

        <DecorativeDivider />

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">Our Values</h2>
            <p className="text-lg text-maroon-600 max-w-2xl mx-auto">
              The principles that guide us in creating exceptional spiritual products for your sacred moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-burgundy-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">Purity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  We use only the finest natural ingredients, ensuring every product is pure and authentic.
                </p>
              </CardContent>
            </Card>

            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-flame-500 to-flame-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">Devotion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  Every product is crafted with love and spiritual devotion, honoring sacred traditions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-burgundy-600 to-maroon-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  We maintain the highest standards of quality in every aspect of our production process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-maroon-900">Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-maroon-600 text-center">
                  Building lasting relationships with our customers through reliability and authenticity.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <DecorativeDivider />

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-r from-maroon-900 via-burgundy-800 to-maroon-900 text-white rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="/images/temple-ritual.png" alt="Temple Ritual" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              To preserve and promote the sacred traditions of spiritual worship by providing devotees with the purest,
              most authentic camphor and incense products that enhance their divine connection and bring peace to their
              spiritual journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Users className="h-12 w-12 text-flame-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-300">Serving families across India with dedication</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-flame-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tradition</h3>
                <p className="text-gray-300">Preserving ancient spiritual practices</p>
              </div>
              <div className="text-center">
                <Flame className="h-12 w-12 text-flame-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-300">Uncompromising standards in every product</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-6">Connect With Us</h2>
          <p className="text-lg text-maroon-600 max-w-2xl mx-auto mb-8">
            Have questions about our products or want to learn more about our story? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-maroon-600 hover:bg-maroon-700 text-white">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-maroon-600 text-maroon-700 hover:bg-maroon-50 bg-transparent"
            >
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
