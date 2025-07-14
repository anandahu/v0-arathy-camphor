import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import EnquiryForm from "@/components/enquiry-form"
import DecorativePattern from "@/components/decorative-pattern"
import { ArrowLeft, Phone, Mail, MapPin, Clock, Globe, MessageCircle } from "lucide-react"

export default function ContactPage() {
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

        {/* Header */}
        <section className="text-center mb-16">
          <DecorativePattern className="mx-auto mb-6 w-16 h-16 text-amber-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">Contact Us</h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            We're here to help you with all your spiritual product needs. Get in touch with us today.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-amber-900">Call Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="text-lg font-semibold text-amber-900">+91 7907417217</p>
                <p className="text-amber-700">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-amber-700">Sunday: 10:00 AM - 5:00 PM</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-amber-900">Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="text-lg font-semibold text-amber-900">info@arathycamphor.com</p>
                <p className="text-amber-700">sales@arathycamphor.com</p>
                <p className="text-amber-700">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-amber-900">Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="text-lg font-semibold text-amber-900">Our Location</p>
                <p className="text-amber-700">
                  Holy Maries Convent Road
                  <br />
                  Kumbalam PO, Ernakulam
                  <br />
                  Kerala, India - 682506
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Form and Additional Info */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <EnquiryForm />
            </div>

            <div className="space-y-8">
              {/* Business Hours */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Monday - Friday</span>
                    <span className="font-semibold text-amber-900">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Saturday</span>
                    <span className="font-semibold text-amber-900">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Sunday</span>
                    <span className="font-semibold text-amber-900">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Festivals</span>
                    <span className="font-semibold text-amber-900">Special Hours</span>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Our Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-amber-700">Bulk Order Consultation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-amber-700">Custom Product Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-amber-700">Temple & Institution Supply</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-amber-700">Nationwide Shipping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-amber-700">Quality Assurance</span>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map Placeholder */}
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Find Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 h-48 rounded-lg flex items-center justify-center border border-amber-200">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                      <p className="text-amber-700">Interactive Map</p>
                      <p className="text-sm text-amber-600">
                        Holy Maries Convent Road
                        <br />
                        Kumbalam PO, Ernakulam
                        <br />
                        Kerala, India - 682506
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-amber-700">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-2">Do you offer bulk discounts?</h3>
                <p className="text-amber-700">
                  Yes, we offer attractive discounts for bulk orders. Contact us for custom pricing based on your
                  requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-2">What is your shipping policy?</h3>
                <p className="text-amber-700">
                  We ship nationwide with secure packaging. Delivery typically takes 3-7 business days depending on your
                  location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-2">Are your products 100% natural?</h3>
                <p className="text-amber-700">
                  Yes, all our products are made from pure, natural ingredients without any harmful chemicals or
                  artificial additives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-2">Can I visit your manufacturing facility?</h3>
                <p className="text-amber-700">
                  We welcome visitors! Please schedule an appointment in advance so we can provide you with a proper
                  tour.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
