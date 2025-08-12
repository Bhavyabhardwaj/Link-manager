"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import dynamic from "next/dynamic"

function OAuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { handleOAuthCallback } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!searchParams) {
          throw new Error('No search parameters found')
        }
        
        // Get token and user data from URL parameters
        const token = searchParams.get('token')
        const userStr = searchParams.get('user')
        
        if (token && userStr) {
          // Parse user data
          const user = JSON.parse(decodeURIComponent(userStr))
          
          // Use the auth hook's OAuth handler
          await handleOAuthCallback(token, user)
          
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully via OAuth.",
          })
          
          // Redirect to dashboard
          router.push('/dashboard')
        } else {
          // Handle error case
          const error = searchParams.get('error')
          throw new Error(error || 'OAuth authentication failed')
        }
      } catch (error: any) {
        console.error('OAuth callback error:', error)
        toast({
          title: "Authentication Failed",
          description: error.message || "Please try signing in again.",
          variant: "destructive",
        })
        router.push('/auth/signin')
      }
    }

    handleCallback()
  }, [searchParams, router, toast])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we verify your credentials.</p>
      </div>
    </div>
  )
}

// Create the dynamic component
const DynamicOAuthCallback = dynamic(() => Promise.resolve(OAuthCallbackContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Loading...</h2>
      </div>
    </div>
  )
})

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        </div>
      </div>
    }>
      <DynamicOAuthCallback />
    </Suspense>
  )
}
