"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import TestimonialCard from "@/components/testimonial-card"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail, MapPin, Sparkles, Lock } from "lucide-react"
import Link from "next/link"
import { getProductsByCategory } from "@/lib/products"
import DecorativePattern from "@/components/decorative-pattern"
import DecorativeDivider from "@/components/decorative-divider"

export default function Home() {
  const agarbathiProducts = getProductsByCategory("agarbathi")
  const camphorProducts = getProductsByCategory("camphor")

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/incense-background.jpeg"
            alt="Incense and brass vessels"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Arathy Camphor & Arathy Agarbathy
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Premium quality agarbathies and camphor for your devotional needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="#products">
                  Explore Products <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="#about">
                  About Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Welcome to Jyothys Enterprises</h2>
              <p className="text-lg text-amber-900/80 mb-8">
                For over two decades, we have been crafting the finest quality agarbathies and camphor products,
                bringing divine fragrances to homes and temples across the country. Our products are made with
                traditional methods and the purest ingredients to enhance your spiritual experience.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/images/ritual-fire.jpeg"
                  alt="Traditional ritual with fire"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agarbathi Products Section */}
      <section id="products" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-amber-800 mb-4">Our Premium Agarbathies</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {agarbathiProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Camphor Products Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-amber-800 mb-4">Pure Camphor Products</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {camphorProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Devotional Use Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Enhancing Your Devotional Experience</h2>
              <p className="text-lg text-amber-900/80 mb-6">
                Our products are crafted to enhance your spiritual rituals and create a serene atmosphere for prayer and
                meditation. The fragrances are carefully selected to invoke a sense of peace and devotion.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Perfect for daily puja and special occasions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Long-lasting fragrances that fill your space with divine aroma</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Made with natural ingredients following traditional methods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Available in various sizes to suit your needs</span>
                </li>
              </ul>
              <Button
                className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="#products">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/ritual-ceremony.jpeg"
                alt="Traditional ritual ceremony"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-amber-100 relative">
        <DecorativePattern className="absolute inset-0 text-amber-800" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center text-amber-800 mb-4">What Our Customers Say</h2>
            <DecorativeDivider />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name="Radha Krishnan"
                  quote="The fragrance of these agarbathies is truly divine. I use them daily for my morning prayers."
                  location="Kerala"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name="Lakshmi Devi"
                  quote="The camphor tablets burn perfectly for our aarti ceremonies. Highly recommended!"
                  location="Tamil Nadu"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  name="Venkat Rao"
                  quote="I've been using Arathy products for years. The quality is consistently excellent."
                  location="Karnataka"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Modified to display plain text */}
      <section id="contact" className="py-16 bg-amber-800 text-white relative">
        <DecorativePattern className="absolute inset-0 text-white" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
              <DecorativeDivider className="mb-12" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p>+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p>info@arathyproducts.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p>123 Temple Street, Devotional District</p>
                        <p>Kerala, India - 682001</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Wholesale Inquiries</h3>
                    <p className="mb-4">
                      Interested in bulk orders for your store or temple? Contact our wholesale department for special
                      pricing.
                    </p>
                    <p className="font-medium">Wholesale Contact:</p>
                    <p>wholesale@arathyproducts.com</p>
                    <p>+91 98765 43211</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admin Login Button Section */}
      <section className="py-8 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700" asChild>
              <Link href="/admin/login">
                <Lock className="h-5 w-5 mr-2" /> Admin Login
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Arathy Camphor & Arathy Agarbathy</h3>
              <p className="text-white/70">A product of Jyothys Enterprises</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white/70">© {new Date().getFullYear()} Jyothys Enterprises. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
