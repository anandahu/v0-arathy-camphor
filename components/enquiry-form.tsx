"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Send, Phone, Mail, MessageCircle } from "lucide-react"

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    enquiryType: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Enquiry Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      enquiryType: "",
    })
    setIsSubmitting(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="border-maroon-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-maroon-700 to-burgundy-800 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Send us an Enquiry
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-maroon-900">
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="border-maroon-200 focus:border-maroon-400"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-maroon-900">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter your email"
                required
                className="border-maroon-200 focus:border-maroon-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-maroon-900">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="border-maroon-200 focus:border-maroon-400"
              />
            </div>
            <div>
              <Label htmlFor="enquiryType" className="text-maroon-900">
                Enquiry Type
              </Label>
              <Select value={formData.enquiryType} onValueChange={(value) => handleChange("enquiryType", value)}>
                <SelectTrigger className="border-maroon-200 focus:border-maroon-400">
                  <SelectValue placeholder="Select enquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product Information</SelectItem>
                  <SelectItem value="bulk">Bulk Orders</SelectItem>
                  <SelectItem value="wholesale">Wholesale Enquiry</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="subject" className="text-maroon-900">
              Subject *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Brief subject of your enquiry"
              required
              className="border-maroon-200 focus:border-maroon-400"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-maroon-900">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Please describe your enquiry in detail..."
              rows={4}
              required
              className="border-maroon-200 focus:border-maroon-400"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-maroon-700 hover:bg-maroon-800 text-white">
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Enquiry
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-maroon-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-maroon-700">
              <Phone className="h-4 w-4" />
              <span>+91 7907417217   </div>
            <div className="flex items-center gap-2 text-maroon-700">
              <Mail className="h-4 w-4" />
              <span>info@arathycamphor.com</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
