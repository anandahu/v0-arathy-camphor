import { cookies } from "next/headers"

// Simple admin credentials (in production, use a database)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "password123",
}

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set authentication cookie
      const cookieStore = await cookies()
      cookieStore.set("admin-session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })
      return { success: true }
    }
    return { success: false, error: "Invalid username or password" }
  } catch (error) {
    return { success: false, error: "Login failed. Please try again." }
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("admin-session")
  } catch (error) {
    console.error("Logout error:", error)
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin-session")
    return session?.value === "authenticated"
  } catch (error) {
    console.error("Auth check error:", error)
    return false
  }
}

// Remove the requireAuth function since it causes redirect issues
