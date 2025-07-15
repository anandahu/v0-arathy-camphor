import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import EnquiryForm from "@/components/enquiry-form"
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

export default function ContactPage() {
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
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <section className="text-center mb-16">
          <DecorativePattern className="mx-auto mb-6 text-maroon-300" />
          <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-6">Contact Us</h1>
          <p className="text-xl text-maroon-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or need assistance? We're here to help you with all your spiritual product
            needs.
          </p>
        </section>

        <DecorativeDivider />

        {/* Contact Content */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-maroon-900 mb-6">Get in Touch</h2>
                <p className="text-lg text-maroon-600 mb-8">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-maroon-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-maroon-600 to-burgundy-700 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-maroon-900 mb-2">Phone</h3>
                        <p className="text-maroon-600">+91 7907417217</p>
                        <p className="text-maroon-600">+91 9947362795</p>
                        <p className="text-sm text-maroon-500 mt-1">Available during business hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-maroon-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-flame-500 to-flame-600 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-maroon-900 mb-2">Email</h3>
                        <p className="text-maroon-600">infoarathicamphor@gmail.com</p>
                        <p className="text-sm text-maroon-500 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-maroon-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>

                <Card className="border-maroon-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-maroon-900 mb-2">Business Hours</h3>
                        <div className="text-maroon-600 space-y-1">
                          <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                          <p>Sunday: 10:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <EnquiryForm />
            </div>
          </div>
        </section>

        <DecorativeDivider />

        {/* Map Section */}
        <section className="py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-maroon-900 mb-4">Visit Our Store</h2>
            <p className="text-lg text-maroon-600">
              Come visit us at our location in Kumbalam, Ernakulam for a personal shopping experience.
            </p>
          </div>

          <Card className="border-maroon-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="w-full h-96 bg-maroon-100 flex items-center justify-center">
                <div className="text-center text-maroon-600">
                  <MapPin className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p className="text-sm">Holy Maries Convent Road, Kumbalam PO</p>
                  <p className="text-sm">Ernakulam, Kerala - 682506</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
