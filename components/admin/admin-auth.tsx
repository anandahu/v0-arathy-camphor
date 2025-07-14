"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lock, Eye, EyeOff, Shield } from "lucide-react"
import { database } from "@/lib/database-persistent"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export default function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const validPasswords = ["arathy2024", "admin123", "camphor@admin"]

  // Check if already authenticated on component mount
  useEffect(() => {
    if (database.isAuthenticated()) {
      onAuthenticated()
    }
  }, [onAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (validPasswords.includes(password)) {
      database.setAuthSession(true)
      toast({
        title: "Authentication Successful",
        description: "Welcome to Arathy Admin Panel",
      })
      onAuthenticated()
    } else {
      toast({
        title: "Authentication Failed",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-900 via-burgundy-800 to-maroon-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/images/arathy-logo.jpg"
            alt="Arathy Camphor Logo"
            className="h-16 mx-auto mb-4 rounded-lg shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-maroon-200">Enter password to continue</p>
        </div>

        <Card className="border-maroon-600 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-maroon-600 to-burgundy-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-maroon-900">Secure Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-maroon-900">
                  Admin Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="border-maroon-200 focus:border-maroon-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-maroon-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-maroon-600" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-maroon-700 hover:bg-maroon-800 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="loading-spinner mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Access Admin Panel
                  </>
                )}
              </Button>
            </form>
