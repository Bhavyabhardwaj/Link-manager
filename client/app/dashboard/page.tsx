"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
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
          change: "+12.5%",
          icon: BarChart3,
          color: "text-primary",
        },
        {
          title: "Active Links",
          value: analytics.totalLinks || 0,
          change: "+3",
          icon: Link2,
          color: "text-secondary",
        },
        {
          title: "QR Scans",
          value: analytics.totalQRScans || 0,
          change: "+8.2%",
          icon: QrCode,
          color: "text-accent",
        },
        {
          title: "Bio Views",
          value: analytics.totalBioViews || 0,
          change: "+15.3%",
          icon: Users,
          color: "text-orange-500",
        },
      ]
    : []

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <Skeleton className="h-64 w-full lg:col-span-2" />
              <Skeleton className="h-64 w-full" />
            </div>
            <Skeleton className="h-48 w-full" />
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
              <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(" ")[0] || "there"}!</h1>
              <p className="text-muted-foreground">Here's what's happening with your links today.</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Link
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-2xl font-bold">
                            <AnimatedCounter end={stat.value} />
                          </span>
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                            {stat.change}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Real-time updates from your links</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.recentActivity?.map((activity: any, index: number) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.link}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{activity.country}</span>
                          <span>{activity.time}</span>
                        </div>
                      </motion.div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No recent activity</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Countries */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Top Countries
                  </CardTitle>
                  <CardDescription>Your best performing regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.topCountries?.slice(0, 4).map((country: any, index: number) => (
                      <motion.div
                        key={country.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span>{country.flag}</span>
                            <p className="font-medium truncate">{country.name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{country.clicks.toLocaleString()} clicks</span>
                            <Badge variant="secondary" className="text-xs">
                              #{index + 1}
                            </Badge>
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
                            <DropdownMenuItem>
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </motion.div>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No data available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors bg-transparent"
                    onClick={() => (window.location.href = "/dashboard/short-links")}
                  >
                    <Link2 className="w-6 h-6" />
                    <span>Create Short Link</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors bg-transparent"
                    onClick={() => (window.location.href = "/dashboard/bio-links")}
                  >
                    <Users className="w-6 h-6" />
                    <span>Edit Bio Page</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors bg-transparent"
                    onClick={() => (window.location.href = "/dashboard/qr-codes")}
                  >
                    <QrCode className="w-6 h-6" />
                    <span>Generate QR Code</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
