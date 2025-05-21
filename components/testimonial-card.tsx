import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  quote: string
  location: string
}

export default function TestimonialCard({ name, quote, location }: TestimonialCardProps) {
  return (
    <Card className="bg-white overflow-hidden transition-all duration-300 hover:shadow-lg border-amber-200 h-full">
      <CardContent className="p-6 relative">
        <div className="absolute top-2 right-2 text-amber-200">
          <Quote className="h-16 w-16 opacity-20" />
        </div>
        <div className="relative z-10">
          <p className="text-amber-900/80 mb-6 italic">{quote}</p>
          <div className="pt-4 border-t border-amber-100">
            <p className="font-semibold text-amber-800">{name}</p>
            <p className="text-amber-900/60 text-sm">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
