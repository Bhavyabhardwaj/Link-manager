"use client"

import { useState, useEffect } from 'react'

/**
 * Custom hook for safely managing client-side state
 * Prevents hydration mismatches by ensuring state is only set after component mounts
 */
export function useClientState<T>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialValue)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const safeSetState = (value: T) => {
    if (isClient) {
      setState(value)
    }
  }

  return [state, safeSetState]
}

/**
 * Hook for safely accessing browser APIs
 * Returns null during SSR and the actual value after hydration
 */
export function useBrowserAPI<T>(getValue: () => T): T | null {
  const [value, setValue] = useState<T | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      setValue(getValue())
    } catch (error) {
      console.warn('Browser API not available:', error)
    }
  }, [getValue])

  return isClient ? value : null
}
