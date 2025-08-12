"use client"

import { useEffect, useState } from "react"
import { LucideIcon } from "lucide-react"

interface SafeIconProps {
  icon: LucideIcon
  className?: string
  size?: number
  [key: string]: any
}

/**
 * A wrapper component for Lucide icons that prevents hydration mismatches
 * caused by browser extensions like Dark Reader
 */
export function SafeIcon({ icon: Icon, className, ...props }: SafeIconProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Return a placeholder during SSR that matches the icon dimensions
    return (
      <span 
        className={className} 
        style={{ 
          display: 'inline-block', 
          width: props.size || 24, 
          height: props.size || 24 
        }} 
      />
    )
  }

  return (
    <span suppressHydrationWarning>
      <Icon className={className} {...props} />
    </span>
  )
}
