"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6">
      <Alert className="border-red-200 bg-red-50">
        <AlertDescription className="text-red-700">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Admin Panel Error</h2>
            <p>Something went wrong in the admin panel.</p>
            <p className="text-sm">Error: {error.message}</p>
            <div className="flex space-x-2">
              <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/admin/login")}>
                Back to Login
              </Button>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
