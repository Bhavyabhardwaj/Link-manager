"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GridBackground } from "@/components/ui/grid-background"
import { Spotlight } from "@/components/ui/spotlight"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import Marquee from "@/components/ui/marquee"
import { cn } from "@/lib/utils"
import { 
  BarChart3, 
  Users, 
  QrCode, 
  Zap, 
  ArrowRight,
  Check,
  Globe,
  MousePointer,
  Sparkles,
  TrendingUp,
  Shield,
  Smartphone,
  Eye,
  Download,
  Star
} from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    username: "@sarahchen",
    body: "This is the best link management tool I've ever used. The analytics are insane!",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Marcus Rodriguez", 
    username: "@marcusrodriguez",
    body: "LinkWeaver transformed my entire workflow. The QR codes feature is incredible.",
    img: "https://avatar.vercel.sh/marcus",
  },
  {
    name: "Emily Johnson",
    username: "@emilyjohnson", 
    body: "Professional bio pages that actually convert. My CTR doubled!",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Alex Kim",
    username: "@alexkim",
    body: "Clean interface, powerful features. Everything I wanted in a link tool.",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Jordan Smith",
    username: "@jordansmith",
    body: "The custom domains feature is exactly what my business needed.",
    img: "https://avatar.vercel.sh/jordan",
  },
  {
    name: "Taylor Brown",
    username: "@taylorbrown",
    body: "Amazing product. The team really understands what creators need.",
    img: "https://avatar.vercel.sh/taylor",
  },
]

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  )
}

const SkeletonTwo = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)`,
        backgroundSize: `20px 20px`,
      }}
    ></motion.div>
  )
}

const SkeletonThree = () => {
  return (
    <div className="flex gap-2 h-full">
      <div className="rounded-full w-12 h-12 bg-neutral-300 dark:bg-neutral-700"></div>
      <div>
        <div className="rounded-md w-20 h-4 bg-neutral-300 dark:bg-neutral-700 mb-2"></div>
        <div className="rounded-md w-16 h-3 bg-neutral-200 dark:bg-neutral-800"></div>
      </div>
    </div>
  )
}

const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -top-10 md:-top-10 -left-10 md:-left-10 text-slate-500 dark:text-white h-24 w-24" />
      <Globe className="absolute -bottom-10 -right-10 text-slate-500 dark:text-white h-24 w-24" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <TrendingUp className="h-16 w-16 text-slate-500 dark:text-white" />
      </div>
    </div>
  )
}

const SkeletonFive = () => {
  return (
    <div className="relative flex flex-col items-center p-6 h-full">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
        <BarChart3 className="w-8 h-8 text-white" />
      </div>
      <div className="space-y-2 w-full">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3"></div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black dark:bg-black text-white relative overflow-hidden">
      <GridBackground />
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 border-b border-white/[0.1] bg-black/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-8 h-8 bg-white rounded-md flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Zap className="w-4 h-4 text-black" />
              </motion.div>
              <span className="text-lg font-bold">
                LinkWeaver
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm text-white/60 hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-sm text-white hover:bg-white/10">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="text-sm bg-white text-black hover:bg-white/90">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 border border-white/20">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Trusted by 10,000+ creators worldwide
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
            >
              The future of{" "}
              <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                link management
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Create stunning bio pages, track every click with precision analytics, and manage your digital presence like never before.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link href="/auth/signup">
                <Button size="lg" className="px-8 py-4 text-lg bg-white text-black hover:bg-white/90 font-medium">
                  Start building for free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/10">
                  <Globe className="mr-2 w-5 h-5" />
                  Live demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Powerful features designed for creators, marketers, and businesses who demand the best
            </p>
          </motion.div>

          <BentoGrid className="max-w-4xl mx-auto">
            <BentoGridItem
              title="Advanced Analytics"
              description="Track every click with precision. Get detailed insights about your audience, geographic data, and user behavior patterns."
              header={<SkeletonFive />}
              className="md:col-span-2 bg-neutral-950 border-white/[0.1]"
              icon={<BarChart3 className="h-4 w-4 text-neutral-300" />}
            />
            <BentoGridItem
              title="Global Performance"
              description="Lightning-fast redirects powered by our global CDN network."
              header={<SkeletonFour />}
              className="md:col-span-1 bg-neutral-950 border-white/[0.1]"
              icon={<Globe className="h-4 w-4 text-neutral-300" />}
            />
            <BentoGridItem
              title="Beautiful Bio Pages"
              description="Create stunning, mobile-optimized landing pages that convert visitors into followers."
              header={<SkeletonOne />}
              className="md:col-span-1 bg-neutral-950 border-white/[0.1]"
              icon={<Users className="h-4 w-4 text-neutral-300" />}
            />
            <BentoGridItem
              title="Smart QR Codes"
              description="Generate dynamic QR codes with custom designs, logos, and tracking capabilities."
              header={<SkeletonTwo />}
              className="md:col-span-2 bg-neutral-950 border-white/[0.1]"
              icon={<QrCode className="h-4 w-4 text-neutral-300" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Social Proof Marquee */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by creators worldwide
          </h2>
          <p className="text-lg text-white/60">
            See what our community is saying
          </p>
        </div>
        
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {testimonials.map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {testimonials.map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Ready to{" "}
              <span className="bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                transform
              </span>{" "}
              your links?
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Join thousands of creators who trust LinkWeaver to power their digital presence. Start free, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="px-12 py-4 text-lg bg-white text-black hover:bg-white/90 font-medium">
                  Start building today
                  <TrendingUp className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/40 mt-6">
              No credit card required • Free forever plan • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.1] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <Zap className="w-3 h-3 text-black" />
              </div>
              <span className="text-lg font-bold">
                LinkWeaver
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/privacy" className="text-sm text-white/60 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-white/60 hover:text-white">
                Terms
              </Link>
              <Link href="/support" className="text-sm text-white/60 hover:text-white">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
