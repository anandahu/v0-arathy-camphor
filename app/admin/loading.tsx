import { Loader2 } from "lucide-react"

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-amber-600" />
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    </div>
  )
}
