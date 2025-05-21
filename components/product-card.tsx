"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  weights: string[]
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0])

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-amber-800 mb-2">{product.name}</h3>
        <p className="text-amber-900/70 mb-4">{product.description}</p>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Select Weight:</p>
          <div className="flex gap-2">
            {product.weights.map((weight) => (
              <Button
                key={weight}
                variant={selectedWeight === weight ? "default" : "outline"}
                size="sm"
                className={selectedWeight === weight ? "bg-amber-600 hover:bg-amber-700" : ""}
                onClick={() => setSelectedWeight(weight)}
              >
                {weight}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-amber-800">₹{product.price}.00</p>
          <Button
            size="sm"
            className="bg-amber-600 hover:bg-amber-700"
            onClick={() => (window.location.href = `/products/${product.id}`)}
          >
            <MessageCircle className="h-4 w-4 mr-2" /> View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
