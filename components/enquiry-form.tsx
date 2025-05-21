"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface EnquiryFormProps {
  productName?: string
}

export default function EnquiryForm({ productName }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    toast({
      title: "Enquiry Submitted",
      description: "We've received your enquiry and will get back to you soon.",
    })

    // Reset form
    e.currentTarget.reset()
  }

  return (
    <Card className="bg-white border border-amber-200">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-amber-900">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                required
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-amber-900">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-amber-900">
                Phone Number
              </label>
              <Input id="phone" name="phone" className="border-amber-200 focus:border-amber-500 focus:ring-amber-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="product" className="text-sm font-medium text-amber-900">
                Product
              </label>
              <Input
                id="product"
                name="product"
                defaultValue={productName}
                readOnly={!!productName}
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 bg-amber-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-amber-900">
              Your Message <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              placeholder="Please let us know what you'd like to enquire about..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Enquiry"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
