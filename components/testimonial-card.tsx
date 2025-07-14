import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  testimonial: {
    name: string
    location: string
    rating: number
    comment: string
    avatar?: string
  }
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, location, rating, comment, avatar } = testimonial

  return (
    <Card className="border-maroon-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-maroon-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback className="bg-maroon-600 text-white">{name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-maroon-900">{name}</h4>
            <p className="text-sm text-maroon-600">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-flame-500 fill-current" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="text-maroon-700 text-sm leading-relaxed italic">"{comment}"</p>
      </CardContent>
    </Card>
  )
}
