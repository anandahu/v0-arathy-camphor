import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  location: string
  rating: number
  comment: string
  avatar?: string
}

export default function TestimonialCard({ name, location, rating, comment, avatar }: TestimonialCardProps) {
  return (
    <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-maroon-400 to-burgundy-600 rounded-full flex items-center justify-center">
              {avatar ? (
                <img
                  src={avatar || "/placeholder.svg"}
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-lg">{name.charAt(0)}</span>
              )}
            </div>
            <Quote className="absolute -top-1 -right-1 h-5 w-5 text-flame-500 bg-white rounded-full p-1" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-maroon-900">{name}</h4>
              <span className="text-sm text-maroon-600">• {location}</span>
            </div>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < rating ? "text-flame-500 fill-current" : "text-gray-300"}`} />
              ))}
            </div>

            <p className="text-maroon-700 text-sm leading-relaxed italic">"{comment}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
