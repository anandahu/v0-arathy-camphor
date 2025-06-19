import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminDebugPage() {
  let debugInfo: any = {}

  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    debugInfo = {
      hasSession: !!session,
      sessionValue: session?.value,
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
    }
  } catch (error) {
    debugInfo = {
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Debug Information</h1>

      <Card>
        <CardHeader>
          <CardTitle>Debug Info</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
