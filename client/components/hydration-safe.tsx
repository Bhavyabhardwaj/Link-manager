"use client"

import { useEffect, useState } from "react"

interface HydrationSafeProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

/**
 * Component that prevents hydration mismatches by only rendering children after hydration
 * Optimized for performance and handles browser extension conflicts
 */
export function HydrationSafe({ children, fallback = null, className }: HydrationSafeProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Use a micro-task to ensure this runs after hydration
    queueMicrotask(() => setIsHydrated(true))
  }, [])

  if (!isHydrated) {
    return fallback ? <>{fallback}</> : <div className={className} suppressHydrationWarning />
  }

  return (
    <div 
      suppressHydrationWarning 
      className={className}
      // Additional attributes to prevent browser extension modifications
      data-hydration-safe="true"
    >
      {children}
    </div>
  )
}
