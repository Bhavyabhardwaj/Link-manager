// components/ui/animated-stats.tsx
"use client"

import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"

interface AnimatedStatProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

export function AnimatedStat({ value, label, suffix = "", delay = 0 }: AnimatedStatProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 3000 })
  const displayValue = useMotionValue(0)

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value)
      }, delay)
    }
  }, [isInView, value, motionValue, delay])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      displayValue.set(Math.round(latest))
    })
  }, [springValue, displayValue])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <motion.div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent mb-2">
        <motion.span>{displayValue}</motion.span>
        {suffix}
      </motion.div>
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  )
}
