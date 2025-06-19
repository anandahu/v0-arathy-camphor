import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from "@/components/admin/login-form"

export default async function AdminLoginPage() {
  // Check if already authenticated
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")

    if (session?.value === "authenticated") {
      redirect("/admin/dashboard")
    }
  } catch (error) {
    // If there's an error checking auth, just continue to show login
    console.log("Auth check error:", error)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-amber-800">Admin Login</CardTitle>
          <p className="text-amber-600">Arathy Camphor & Arathy Agarbathy</p>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-6 p-4 bg-amber-100 rounded-lg">
            <p className="text-sm text-amber-800 font-medium">Demo Credentials:</p>
            <p className="text-sm text-amber-700">Username: admin</p>
            <p className="text-sm text-amber-700">Password: password123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
