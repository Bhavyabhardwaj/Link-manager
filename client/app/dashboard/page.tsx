"use client"

import { useState, useEffect } from "react"
import { BarChart3, Link2, QrCode, Users, TrendingUp, Plus, ExternalLink, Copy, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import DashboardLayout from "@/components/dashboard-layout"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import apiClient from "@/lib/api-client"

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getAnalyticsOverview()
      setAnalytics(response)
    } catch (error) {
      console.error("Failed to load analytics:", error)
      toast({
        title: "Failed to load analytics",
        description: "There was an error loading your analytics data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const stats = analytics
    ? [
        {
          title: "Total Clicks",
          value: analytics.totalClicks || 0,
          icon: BarChart3,
          iconColor: "text-indigo-600 dark:text-indigo-400",
          iconBg: "bg-indigo-100 dark:bg-indigo-900/20",
        },
        {
          title: "Active Links",
          value: analytics.totalLinks || 0,
          icon: Link2,
          iconColor: "text-teal-600 dark:text-teal-400",
          iconBg: "bg-teal-100 dark:bg-teal-900/20",
        },
        {
          title: "QR Scans",
          value: analytics.totalQRScans || 0,
          icon: QrCode,
          iconColor: "text-blue-600 dark:text-blue-400",
          iconBg: "bg-blue-100 dark:bg-blue-900/20",
        },
        {
          title: "Bio Views",
          value: analytics.totalBioViews || 0,
          icon: Users,
          iconColor: "text-amber-600 dark:text-amber-400",
          iconBg: "bg-amber-100 dark:bg-amber-900/20",
        },
      ]
    : []

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-80" />
                <Skeleton className="h-5 w-96" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <Skeleton className="h-80 w-full lg:col-span-2" />
              <Skeleton className="h-80 w-full" />
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name?.split(" ")[0] || "there"}!
              </h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your links today.</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Link
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.title} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{stat.title}</p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-foreground">
                          <AnimatedCounter end={stat.value} />
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                      <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/20">
                    <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  Recent Activity
                </CardTitle>
                <CardDescription>Real-time updates from your links</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {analytics?.recentActivity?.map((activity: any, index: number) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full" />
                        <div>
                          <p className="font-medium text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.link}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="secondary">{activity.country}</Badge>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
                        <TrendingUp className="w-8 h-8" />
                      </div>
                      <p className="font-medium">No recent activity</p>
                      <p className="text-sm mt-1">Your link activity will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader className="border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Top Countries
                </CardTitle>
                <CardDescription>Your best performing regions</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {analytics?.topCountries?.slice(0, 4).map((country: any, index: number) => (
                    <div
                      key={country.code}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{country.flag}</span>
                          <p className="font-medium truncate text-foreground">{country.name}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground">
                            {country.clicks.toLocaleString()} clicks
                          </span>
                          <Badge variant="outline">#{index + 1}</Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Export Data
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="p-4 rounded-full bg-muted w-fit mx-auto mb-4">
                        <BarChart3 className="w-8 h-8" />
                      </div>
                      <p>No data available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with these common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-muted/50 bg-transparent"
                  onClick={() => (window.location.href = "/dashboard/short-links")}
                >
                  <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
                    <Link2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="font-medium">Create Short Link</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-muted/50 bg-transparent"
                  onClick={() => (window.location.href = "/dashboard/bio-links")}
                >
                  <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/20">
                    <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="font-medium">Edit Bio Page</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-muted/50 bg-transparent"
                  onClick={() => (window.location.href = "/dashboard/qr-codes")}
                >
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">Generate QR Code</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
