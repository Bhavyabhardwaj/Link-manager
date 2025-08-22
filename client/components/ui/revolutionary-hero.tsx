// components/ui/revolutionary-hero.tsx
"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Play, Users, TrendingUp, Globe } from "lucide-react"
import Link from "next/link"

export function RevolutionaryHero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-black dark:to-indigo-950"
        style={{
          scale,
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-blue-500 rounded-full blur-sm"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-32 w-6 h-6 bg-purple-500 rounded-full blur-sm"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-32 left-40 w-3 h-3 bg-green-500 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.7, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Badge className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mr-2"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            Used by 250,000+ creators worldwide
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-cal font-bold tracking-tighter leading-[0.85] mb-6">
            <span className="block">
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
                Build your
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                digital empire
              </span>
            </span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-zinc-600 dark:text-zinc-400 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            The only link management platform that scales with your ambition. 
            Create, track, and optimize every connection that matters.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link href="/auth/signup">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl">
                Start free trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
          
          <Link href="/demo">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <Play className="mr-2 w-5 h-5" />
                Watch demo
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { icon: Users, value: "250K+", label: "Active Users" },
            { icon: TrendingUp, value: "5.2B", label: "Links Created" },
            { icon: Globe, value: "195", label: "Countries" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-center mb-2">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
