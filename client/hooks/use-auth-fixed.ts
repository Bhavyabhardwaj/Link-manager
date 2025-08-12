"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import apiClient from "@/lib/api-client"

interface User {
  id: string
  email: string
  name: string
  username?: string
  avatar?: string
  plan: "free" | "creator" | "team"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (username: string, password: string) => Promise<void>
  signUp: (email: string, password: string, username: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
  initialize: () => Promise<void>
  handleOAuthCallback: (token: string, userData: any) => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      signIn: async (username: string, password: string) => {
        try {
          set({ isLoading: true })
          
          const response = await apiClient.signIn({ username, password })
          
          if (response.token && response.user) {
            // Store token in localStorage
            localStorage.setItem('auth_token', response.token)
            
            // Update state
            set({
              user: {
                id: response.user.id,
                email: response.user.email,
                name: response.user.name || response.user.username,
                username: response.user.username,
                avatar: response.user.image,
                plan: "free" // Default plan from backend
              },
              isAuthenticated: true,
              isLoading: false,
            })
          }
        } catch (error) {
          console.error('Sign in failed:', error)
          set({ isLoading: false })
          throw error
        }
      },

      signUp: async (email: string, password: string, username: string) => {
        try {
          set({ isLoading: true })
          
          await apiClient.signUp({ email, password, username })
          
          // After successful signup, automatically sign in
          await get().signIn(username, password)
        } catch (error) {
          console.error('Sign up failed:', error)
          set({ isLoading: false })
          throw error
        }
      },

      signOut: async () => {
        try {
          // Clear token from localStorage
          localStorage.removeItem('auth_token')
          
          // Clear API client cache
          apiClient.clearCache()
          
          // Update state
          set({
            user: null,
            isAuthenticated: false,
          })
        } catch (error) {
          console.error('Sign out failed:', error)
        }
      },

      refreshUser: async () => {
        try {
          const token = localStorage.getItem('auth_token')
          if (!token) {
            set({ user: null, isAuthenticated: false })
            return
          }

          // For now, just validate that we have a token
          // In a real app, you'd call a /me endpoint to refresh user data
          const currentUser = get().user
          if (currentUser) {
            set({ isAuthenticated: true })
          }
        } catch (error) {
          console.error('Failed to refresh user:', error)
          set({ user: null, isAuthenticated: false })
          localStorage.removeItem('auth_token')
        }
      },

      initialize: async () => {
        try {
          set({ isLoading: true })
          
          const token = localStorage.getItem('auth_token')
          if (token && get().user) {
            // We have both token and user data from persisted state
            set({ isAuthenticated: true, isLoading: false })
          } else if (token) {
            // We have token but no user data, try to get user data
            // For now just clear the token since we don't have a /me endpoint
            localStorage.removeItem('auth_token')
            set({ user: null, isAuthenticated: false, isLoading: false })
          } else {
            // No token, clear everything
            set({ user: null, isAuthenticated: false, isLoading: false })
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error)
          set({ user: null, isAuthenticated: false, isLoading: false })
        }
      },

      handleOAuthCallback: async (token: string, userData: any) => {
        try {
          set({ isLoading: true })
          
          // Store token in localStorage
          localStorage.setItem('auth_token', token)
          
          // Update state with user data
          set({
            user: {
              id: userData.id,
              email: userData.email,
              name: userData.name || userData.username,
              username: userData.username,
              avatar: userData.image,
              plan: "free" // Default plan
            },
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          console.error('OAuth callback failed:', error)
          set({ isLoading: false })
          throw error
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
