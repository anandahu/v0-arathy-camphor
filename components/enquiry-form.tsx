"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, User, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message Sent!",
      description: "Thank you for your enquiry. We'll get back to you soon.",
    })

    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Card className="border-maroon-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-maroon-700 to-burgundy-800 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Send us a Message
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-maroon-900">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="pl-10 border-maroon-200 focus:border-maroon-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-maroon-900">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="pl-10 border-maroon-200 focus:border-maroon-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-maroon-900">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="pl-10 border-maroon-200 focus:border-maroon-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-maroon-900">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements or ask any questions..."
              rows={4}
              className="border-maroon-200 focus:border-maroon-400"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-maroon-600 hover:bg-maroon-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-maroon-50 rounded-lg border border-maroon-200">
          <h3 className="text-sm font-semibold text-maroon-900 mb-2">Contact Information:</h3>
          <div className="text-sm text-maroon-700 space-y-1">
            <p>
              <strong>Phone:</strong> <span>+91 7907417217</span>
            </p>
            <p>
              <strong>Email:</strong> <span>infoarathicamphor@gmail.com</span>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              <span>Holy maries convent road kumbalam po Ernakulam kerala india pin 682506</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
