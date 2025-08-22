"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const token = searchParams.get('token')
      const userParam = searchParams.get('user')
      const error = searchParams.get('error')

      if (error) {
        toast({
          title: "Authentication Failed",
          description: error,
          variant: "destructive",
        })
        router.push('/auth/signin')
        return
      }

      if (token && userParam) {
        try {
          // Store token in localStorage
          localStorage.setItem('auth_token', token)
          
          // Parse user data
          const user = JSON.parse(decodeURIComponent(userParam))
          
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully.",
          })
          
          // Redirect to dashboard
          router.push('/dashboard')
        } catch (error) {
          console.error('OAuth callback error:', error)
          toast({
            title: "Authentication Error",
            description: "Failed to complete authentication. Please try again.",
            variant: "destructive",
          })
          router.push('/auth/signin')
        }
      } else {
        toast({
          title: "Authentication Error",
          description: "Missing authentication data. Please try again.",
          variant: "destructive",
        })
        router.push('/auth/signin')
      }
    }

    handleOAuthCallback()
  }, [searchParams, router, toast])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Completing Sign In</CardTitle>
          <CardDescription>Please wait while we complete your authentication...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    </div>
  )
}

