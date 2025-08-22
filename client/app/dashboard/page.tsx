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
          icon: BarChart3,
          color: "text-blue-600 dark:text-blue-400",
        },
        {
          title: "Active Links",
          value: analytics.totalLinks || 0,
          icon: Link2,
          color: "text-green-600 dark:text-green-400",
        },
        {
          title: "QR Scans",
          value: analytics.totalQRScans || 0,
          icon: QrCode,
          color: "text-purple-600 dark:text-purple-400",
        },
        {
          title: "Bio Views",
          value: analytics.totalBioViews || 0,
          icon: Users,
          color: "text-orange-600 dark:text-orange-400",
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Welcome back, {user?.name?.split(" ")[0] || "there"}!
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">Here's what's happening with your links today.</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/80">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground/80 uppercase tracking-wide">{stat.title}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-3xl font-bold text-foreground">
                            <AnimatedCounter end={stat.value} />
                          </span>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/10">
                        <stat.icon className={`w-7 h-7 ${stat.color}`} />
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
              <Card className="border-2 border-border/50 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">Real-time updates from your links</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {analytics?.recentActivity?.map((activity: any, index: number) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all duration-300 border border-border/30 hover:border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse" />
                          <div>
                            <p className="font-medium text-foreground">{activity.action}</p>
                            <p className="text-sm text-muted-foreground/80">{activity.link}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground/80">
                          <span className="font-medium">{activity.country}</span>
                          <span>{activity.time}</span>
                        </div>
                      </motion.div>
                    )) || (
                      <div className="text-center py-12 text-muted-foreground/60">
                        <div className="p-4 rounded-full bg-muted/30 w-fit mx-auto mb-4">
                          <TrendingUp className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-lg font-medium">No recent activity</p>
                        <p className="text-sm mt-1">Your link activity will appear here</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Countries */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-2 border-border/50 bg-gradient-to-br from-card to-card/80">
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                      <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Top Countries
                  </CardTitle>
                  <CardDescription className="text-muted-foreground/80">Your best performing regions</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {analytics?.topCountries?.slice(0, 4).map((country: any, index: number) => (
                      <motion.div
                        key={country.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all duration-300 border border-border/30 hover:border-border/50 group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">{country.flag}</span>
                            <p className="font-medium truncate text-foreground">{country.name}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-foreground">{country.clicks.toLocaleString()} clicks</span>
                            <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-primary/30">
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
