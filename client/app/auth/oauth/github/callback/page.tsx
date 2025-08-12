"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function GitHubCallbackPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { handleOAuthCallback } = useAuth()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we're on the callback page and need to extract data from the current page
        const currentUrl = window.location.href
        
        if (currentUrl.includes('links.bhavya.live:3000/api/oauth/github/callback')) {
          // This means we're on the server's callback page
          // We need to extract the JSON data from the page content
          const pageContent = document.body.innerText
          
          try {
            const data = JSON.parse(pageContent)
            
            if (data.token && data.user) {
              await handleOAuthCallback(data.token, data.user)
              
              toast({
                title: "Welcome!",
                description: `Welcome ${data.user.name || data.user.username}! You have been signed in successfully.`,
              })
              
              // Redirect to our frontend
              window.location.href = 'http://localhost:3001/dashboard'
              return
            }
          } catch (parseError) {
            console.error('Failed to parse OAuth response:', parseError)
          }
        }
        
        // If we reach here, something went wrong
        throw new Error('OAuth authentication failed')
        
      } catch (error: any) {
        console.error('OAuth callback error:', error)
        toast({
          title: "Authentication Failed",
          description: error.message || "Please try signing in again.",
          variant: "destructive",
        })
        
        // Redirect to sign in page
        window.location.href = 'http://localhost:3001/auth/signin'
      }
    }

    // Add a small delay to ensure the page content is loaded
    setTimeout(handleCallback, 1000)
  }, [router, toast, handleOAuthCallback])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Completing GitHub sign in...</h2>
        <p className="text-muted-foreground">Please wait while we process your authentication.</p>
      </div>
    </div>
  )
}
