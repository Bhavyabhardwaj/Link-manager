"use client"

import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundEffects } from "@/components/ui/background-effects"
import { InteractiveFeatureCard } from "@/components/ui/interactive-feature-card"
import { AnimatedStat } from "@/components/ui/animated-stats"
import { cn } from "@/lib/utils"
import { 
  ArrowRight,
  BarChart3,
  Check,
  Globe,
  MousePointer,
  QrCode,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  Eye,
  Download,
  Calendar,
  Clock,
  Target,
  Layers,
  Command,
  Cpu
} from "lucide-react"
import { useRef } from "react"

// Advanced Typography Component
const TypographyH1 = ({ children, className, ...props }: any) => (
  <h1 
    className={cn(
      "font-cal text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tighter leading-[0.9]",
      className
    )} 
    {...props}
  >
    {children}
  </h1>
)

const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarahchen_dev",
    body: "This is hands down the most elegant link management platform I've ever used. The analytics insights are incredible!",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Marcus Rodriguez", 
    username: "@marcusrod",
    body: "LinkWeaver completely transformed our digital marketing strategy. We've seen a 340% increase in click-through rates.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Emily Johnson",
    username: "@emilyjohnson", 
    body: "The QR code generation and bio pages helped us bridge offline and online seamlessly. Revenue increased by 180%.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "David Park",
    username: "@davidpark_tech",
    body: "Clean, powerful, and incredibly fast. This is what modern SaaS should look like.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5
  }
]

const features = [
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Precision Analytics",
    description: "Real-time insights with geographic data, device analytics, referrer tracking, and conversion metrics that drive decision-making."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Beautiful Bio Pages",
    description: "Create stunning, mobile-optimized landing pages that showcase your brand identity and convert visitors into followers."
  },
  {
    icon: <QrCode className="h-8 w-8" />,
    title: "Smart QR Codes",
    description: "Generate dynamic QR codes with custom branding, advanced tracking capabilities, and bulk operations for enterprise needs."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Enterprise Security",
    description: "Advanced security features including link expiration, password protection, fraud detection, and compliance standards."
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Custom Domains",
    description: "Use your own domain for branded short links that build trust, improve click-through rates, and enhance brand recognition."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Performance",
    description: "Global CDN ensures sub-100ms redirects with 99.99% uptime backed by enterprise SLA and 24/7 monitoring."
  }
]

const stats = [
  { label: "Links Created", value: 2840, suffix: "M+" },
  { label: "Active Users", value: 125, suffix: "K+" },
  { label: "Countries", value: 180, suffix: "+" },
  { label: "Uptime", value: 99.99, suffix: "%" }
]

const companies = [
  "TechCorp", "StartupHub", "CreativeStudio", "DigitalFlow", "InnovateLab", "FutureTech"
]

export default function LandingPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 relative overflow-x-hidden">
      <BackgroundEffects />
      
      {/* Premium Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.320, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              <span className="text-xl font-cal font-semibold">
                LinkWeaver
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pricing', 'Docs', 'Enterprise'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-lg hover:shadow-xl transition-all duration-200">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden">
        <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto">
          <div className="text-center max-w-6xl mx-auto pt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.320, 1] }}
              className="mb-8"
            >
              <Badge 
                variant="secondary" 
                className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 125K+ creators worldwide
              </Badge>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.320, 1] }}
            >
              <TypographyH1 className="mb-8">
                <span className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
                  Link management
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  reimagined
                </span>
              </TypographyH1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.320, 1] }}
              className="text-xl md:text-2xl lg:text-3xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-5xl mx-auto leading-relaxed font-light"
            >
              Create beautiful bio pages, track performance with precision analytics, 
              and manage your digital presence with the most advanced link platform ever built.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.320, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/auth/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    Start building for free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/demo">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8 py-4 text-lg font-medium border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-all duration-200"
                  >
                    <Globe className="mr-2 w-5 h-5" />
                    Live demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.320, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={index * 200}
                />
              ))}
            </motion.div>

            {/* Trusted by companies */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-20"
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-medium">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                {companies.map((company, index) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="text-lg font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    {company}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Features Grid */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-cal font-semibold mb-6 tracking-tight">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                Everything you need to
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed for creators, marketers, and businesses who demand excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <InteractiveFeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof with Enhanced Design */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-cal font-semibold mb-6 tracking-tight">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                Loved by creators
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                worldwide
              </span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              See what our community of over 125,000 creators, marketers, and businesses have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.320, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -8, rotateY: 5 }}
                className="group relative"
              >
                <div className="h-full rounded-3xl bg-white dark:bg-zinc-900 p-8 shadow-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-zinc-200/20 dark:group-hover:shadow-zinc-900/20">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 mb-6 text-lg leading-relaxed">
                    "{testimonial.body}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {testimonial.username}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-cal font-semibold mb-8 tracking-tight">
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                Ready to transform
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                your links?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join over 125,000 creators who trust LinkWeaver to power their digital presence. 
              Start free, scale as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="lg" 
                    className="px-12 py-4 text-lg font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-2xl hover:shadow-3xl transition-all duration-300"
                  >
                    Start building today
                    <TrendingUp className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-6">
              No credit card required • Free forever plan • Enterprise support available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-16 px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-cal font-semibold">
                LinkWeaver
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Product</h4>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/features" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Pricing</Link></li>
                  <li><Link href="/enterprise" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Enterprise</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Resources</h4>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Documentation</Link></li>
                  <li><Link href="/api" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">API</Link></li>
                  <li><Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Blog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Company</h4>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">About</Link></li>
                  <li><Link href="/careers" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Legal</h4>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Terms</Link></li>
                  <li><Link href="/security" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Security</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 dark:text-zinc-400">
              <p>© 2025 LinkWeaver. Crafted with precision for creators.</p>
              <p className="mt-4 md:mt-0">Built with Next.js, deployed on Vercel</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
