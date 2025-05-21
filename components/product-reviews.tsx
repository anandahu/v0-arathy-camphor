import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Review {
  id: number
  name: string
  avatar: string
  date: string
  rating: number
  comment: string
}

const demoReviews: Review[] = [
  {
    id: 1,
    name: "Radha Krishnan",
    avatar: "",
    date: "May 15, 2023",
    rating: 5,
    comment:
      "The fragrance of these agarbathies is truly divine. I use them daily for my morning prayers. The scent lasts for a long time and creates a peaceful atmosphere in my prayer room.",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    avatar: "",
    date: "April 3, 2023",
    rating: 5,
    comment:
      "I've been using Arathy products for years. The quality is consistently excellent and the camphor burns perfectly for our aarti ceremonies. Highly recommended!",
  },
  {
    id: 3,
    name: "Venkat Rao",
    avatar: "",
    date: "March 22, 2023",
    rating: 4,
    comment:
      "Good quality products that are perfect for daily puja. The packaging is also very good and keeps the agarbathies fresh for a long time.",
  },
]

export default function ProductReviews({ productId }: { productId: number }) {
  // In a real app, you would fetch reviews based on the productId
  const reviews = demoReviews

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-amber-900">Customer Reviews</h3>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="ml-2 text-sm text-amber-700">Based on {reviews.length} reviews</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-amber-100 pb-6">
            <div className="flex items-start">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback className="bg-amber-200 text-amber-800">
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-amber-900">{review.name}</h4>
                  <span className="text-sm text-amber-600">{review.date}</span>
                </div>
                <div className="flex my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-amber-700 mt-2">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
