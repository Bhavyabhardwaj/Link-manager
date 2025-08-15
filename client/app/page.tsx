"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { AuroraBackground } from "@/components/aceternity/aurora-background"
import { BackgroundBeams } from "@/components/aceternity/background-beams"
import { MagicButton } from "@/components/aceternity/magic-button"

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              LinkCraft
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors font-medium">Pricing</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors font-medium">About</a>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <MagicButton>
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </MagicButton>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AuroraBackground>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.h1 
              className="text-6xl lg:text-8xl font-black mb-8 tracking-tight leading-none"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block text-white mb-2">Ship links</span>
              <span className="block text-white mb-2">that </span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                convert
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl lg:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The link management platform that feels like magic. Beautiful bio pages, instant analytics, and tools that just work.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/auth/signup">
                <MagicButton className="text-lg px-8 py-4">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Start building
                  <ArrowRight className="ml-2 w-5 h-5" />
                </MagicButton>
              </Link>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-300 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                >
                  <Play className="mr-2 w-5 h-5" />
                  See demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  >
                    <Avatar className="w-12 h-12 border-2 border-slate-700 shadow-lg">
                      <AvatarImage src={`/placeholder-40x40.png`} />
                      <AvatarFallback className="bg-gradient-to-br from-slate-800 to-slate-700 text-slate-300 font-semibold">
                        {i}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </div>
              <div className="text-slate-400">
                Used by <span className="font-bold text-white">50,000+</span> creators
              </div>
            </motion.div>
          </div>
        </AuroraBackground>
        <BackgroundBeams />
      </section>
    </div>
  )
}
