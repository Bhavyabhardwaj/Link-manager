"use client"

import { useState, useEffect, useRef, memo } from "react"
import { useClientState } from "@/hooks/use-client-state"
import {
  ArrowRight,
  Play,
  BarChart3,
  Users,
  QrCode,
  Zap,
  Lock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { HydrationSafe } from "@/components/hydration-safe"
import Link from "next/link"

// Memoized Animated Counter Component
const AnimatedCounter = memo(function AnimatedCounter({ 
  end, 
  duration = 2, 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string 
}) {
  const [count, setCount] = useState(0)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

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
  }, [end, duration, inView])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
})

// Simple Dashboard Mockup
const SimpleDashboard = memo(() => {
  return (
    <div className="relative">
      <div className="w-[600px] h-[400px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Browser Chrome */}
        <div className="h-12 bg-muted border-b border-border flex items-center px-4 gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 bg-background rounded-md flex items-center px-3">
              <Lock className="w-3 h-3 text-muted-foreground mr-2" />
              <span className="text-xs text-muted-foreground">linkcraft.co/dashboard</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold">Dashboard</h3>
              <p className="text-sm text-muted-foreground">Welcome back!</p>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Create Link
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-2xl font-bold">
                <AnimatedCounter end={0} />
              </div>
              <div className="text-xs text-muted-foreground">Total Clicks</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-2xl font-bold">
                <AnimatedCounter end={0} />
              </div>
              <div className="text-xs text-muted-foreground">Active Links</div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-2xl font-bold">
                <AnimatedCounter end={0} />
              </div>
              <div className="text-xs text-muted-foreground">QR Scans</div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg flex items-end justify-between p-4">
            {[10, 15, 12, 20, 16, 25, 18].map((height, i) => (
              <div
                key={i}
                style={{ height: `${height}%` }}
                className="w-8 bg-gradient-to-t from-primary to-secondary rounded-t"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default function LandingPage() {
  // Use hydration-safe state for scroll
  const [scrolled, setScrolled] = useClientState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    // Only add event listener after component mounts
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrolled])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <HydrationSafe>
                  <Zap className="w-5 h-5 text-white" />
                </HydrationSafe>
              </div>
              <span className="text-xl font-bold">LinkCraft</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                Pricing
              </a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-background">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">
              Ship links that{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                convert
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              The link management platform that feels like magic. Beautiful bio pages, instant analytics, and tools that just work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4 text-lg font-semibold"
              >
                Start building
                <HydrationSafe>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </HydrationSafe>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent transition-all duration-300 group px-8 py-4 text-lg font-semibold"
              >
                <HydrationSafe>
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </HydrationSafe>
                See how it works
              </Button>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="w-10 h-10 border-2 border-background shadow-sm">
                    <AvatarImage src={`/placeholder-40x40.png?height=40&width=40&text=${i}`} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
                      {i}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-muted-foreground">
                Used by <span className="font-semibold text-foreground">10,000+</span> creators
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SimpleDashboard />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                stand out
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to make your links work harder and your brand shine brighter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <HydrationSafe>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </HydrationSafe>
                <h3 className="font-semibold">Real-time Analytics</h3>
              </div>
              <p className="text-muted-foreground">
                Track every click with detailed analytics and insights into your audience behavior.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <HydrationSafe>
                  <Users className="w-5 h-5 text-secondary" />
                </HydrationSafe>
                <h3 className="font-semibold">Bio Page Builder</h3>
              </div>
              <p className="text-muted-foreground">
                Create stunning bio pages that convert visitors into customers with our intuitive builder.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <HydrationSafe>
                  <QrCode className="w-5 h-5 text-accent" />
                </HydrationSafe>
                <h3 className="font-semibold">Smart QR Codes</h3>
              </div>
              <p className="text-muted-foreground">
                Generate dynamic QR codes that update automatically and provide detailed scan analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              get started?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who trust LinkCraft to power their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                Start your free trial
                <HydrationSafe>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </HydrationSafe>
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-accent transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                View demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
