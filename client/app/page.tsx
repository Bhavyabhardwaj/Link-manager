"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Users,
  QrCode,
  Shield,
  Globe,
  Zap,
  Star,
  LinkIcon,
  Play,
  CheckCircle,
  Copy,
  MessageCircle,
  ExternalLink,
  Activity,
  TrendingUp,
  Check,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Clean Navigation - Notion/Vercel style
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <LinkIcon className="w-4 h-4 text-white dark:text-black" />
          </div>
          <span className="font-semibold text-lg text-gray-900 dark:text-white">LinkWeaver</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {["Features", "Pricing", "Docs", "Changelog"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" asChild className="text-sm">
            <Link href="/auth/signin">Sign in</Link>
          </Button>
          <Button asChild className="text-sm">
            <Link href="/auth/signup">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}

// Clean Hero Section - shadcn/ui style
function HeroSection() {
  const [stats, setStats] = useState({ links: 0, clicks: 0, users: 0 })

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const increment = 50
      const targetStats = { links: 2847, clicks: 156789, users: 1249 }

      const current = { links: 0, clicks: 0, users: 0 }
      const timer = setInterval(() => {
        current.links = Math.min(
          current.links + Math.ceil(targetStats.links / (duration / increment)),
          targetStats.links,
        )
        current.clicks = Math.min(
          current.clicks + Math.ceil(targetStats.clicks / (duration / increment)),
          targetStats.clicks,
        )
        current.users = Math.min(
          current.users + Math.ceil(targetStats.users / (duration / increment)),
          targetStats.users,
        )

        setStats({ ...current })

        if (
          current.links === targetStats.links &&
          current.clicks === targetStats.clicks &&
          current.users === targetStats.users
        ) {
          clearInterval(timer)
        }
      }, increment)
    }

    const timer = setTimeout(animateStats, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="pt-32 pb-20 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Badge
            variant="secondary"
            className="mb-6 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0"
          >
            <CheckCircle className="w-3 h-3 mr-2" />
            Trusted by 50,000+ creators
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The modern way to
          <br />
          manage your links
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Create, customize, and track your links with powerful analytics. Build beautiful bio pages that convert
          visitors into customers.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button size="lg" asChild className="text-base">
            <Link href="/auth/signup">
              Start for free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
            <Link href="#demo">
              <Play className="mr-2 w-4 h-4" />
              See demo
            </Link>
          </Button>
        </motion.div>

        {/* Clean Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { label: "Links created", value: stats.links, suffix: "+" },
            { label: "Total clicks", value: stats.clicks, suffix: "+" },
            { label: "Active users", value: stats.users, suffix: "+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Clean Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Advanced Analytics",
      description: "Track clicks, conversions, and user behavior with detailed insights and reports.",
      stats: "99.9% accuracy",
    },
    {
      icon: <QrCode className="w-5 h-5" />,
      title: "Dynamic QR Codes",
      description: "Generate QR codes that update automatically and provide scan analytics.",
      stats: "50M+ scans",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Bio Link Pages",
      description: "Create beautiful landing pages to showcase all your important links.",
      stats: "4.2x higher CTR",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "SOC 2 compliant with advanced security features and access controls.",
      stats: "Bank-grade security",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Network",
      description: "Fast redirects from 200+ locations worldwide with 99.99% uptime.",
      stats: "<50ms latency",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Developer API",
      description: "Integrate with our REST API and webhooks for custom workflows.",
      stats: "99.99% SLA",
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Everything you need to manage links
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to help you create, track, and optimize your links.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
                  <div className="text-gray-700 dark:text-gray-300">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{feature.description}</p>
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  {feature.stats}
                </Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Clean Demo Section
function InteractiveDemoSection() {
  const [inputUrl, setInputUrl] = useState("https://example.com/very-long-url")
  const [shortUrl, setShortUrl] = useState("lw.co/abc123")

  return (
    <section id="demo" className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">See it in action</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Try our link shortener and see real-time analytics</p>
        </motion.div>

        <motion.div
          className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Original URL</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                    placeholder="Enter your long URL"
                  />
                  <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <Button className="rounded-full p-3">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Shortened URL</label>
                <div className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                    />
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  </div>
                  <Button variant="outline" size="sm" className="px-3 py-3 bg-transparent">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Analytics
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Today</span>
                    <span className="text-sm font-medium text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +23
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">CTR</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">4.2%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Top Countries
                </h4>
                <div className="space-y-2">
                  {[
                    { country: "United States", percentage: 45 },
                    { country: "United Kingdom", percentage: 23 },
                    { country: "Canada", percentage: 18 },
                  ].map((item) => (
                    <div key={item.country} className="flex items-center space-x-3">
                      <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{item.country}</span>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-gray-900 dark:bg-white h-1.5 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-900 dark:text-white w-8">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Clean Testimonials
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of Growth at TechFlow",
      avatar: "/placeholder-user.jpg",
      content: "LinkWeaver helped us increase our conversion rates by 340%. The analytics are incredibly detailed.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director at StartupX",
      avatar: "/placeholder-user.jpg",
      content: "The QR code feature is perfect for our offline campaigns. Real-time tracking is a game changer.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Content Creator",
      avatar: "/placeholder-user.jpg",
      content: "The bio link page is exactly what I needed. Clean, customizable, and great analytics.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Trusted by creators worldwide
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">See what our customers have to say</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Clean CTA Section
function CTASection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Ready to get started?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of creators and businesses who trust LinkWeaver to manage their links.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" asChild className="text-base">
              <Link href="/auth/signup">
                Start for free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
              <Link href="/contact">
                <MessageCircle className="mr-2 w-4 h-4" />
                Contact sales
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Clean Footer
function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "API", "Changelog"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "Help Center", "Status"],
    Legal: ["Privacy", "Terms", "Security"],
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-white dark:text-black" />
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">LinkWeaver</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm leading-relaxed mb-4">
              The modern link management platform for creators and businesses.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2025 LinkWeaver. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function LinkWeaverLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <InteractiveDemoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
