"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { database } from "@/lib/database-persistent"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple demo authentication
    if (username === "admin" && password === "admin123") {
      database.setAuthSession(true)
      onAuthenticated()
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Video */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vid1-2dmU0qFQO1COGTYyHBbdEdxgvOKJhy.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/70 via-burgundy-800/70 to-maroon-900/70 z-10"></div>

      <div className="relative z-20 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/arathy-logo.jpg"
            alt="Arathy Logo"
            className="h-16 w-auto mx-auto rounded-lg shadow-lg mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-maroon-200">Access your product management dashboard</p>
        </div>

        {/* Login Form */}
        <Card className="border-maroon-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-maroon-700 to-burgundy-800 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Secure Login
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-maroon-900">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 border-maroon-200 focus:border-maroon-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-maroon-900">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-maroon-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-maroon-200 focus:border-maroon-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-maroon-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-maroon-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-maroon-600 hover:bg-maroon-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            className="text-maroon-200 hover:text-white hover:bg-maroon-800"
            onClick={() => (window.location.href = "/")}
          >
            ← Back to Website
          </Button>
        </div>
      </div>
    </div>
  )
}
