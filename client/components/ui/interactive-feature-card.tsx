// components/ui/interactive-feature-card.tsx
"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

interface InteractiveFeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}

export function InteractiveFeatureCard({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: InteractiveFeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.320, 1] }}
      viewport={{ once: true }}
      className="group relative h-96 w-full cursor-pointer"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 p-8 shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-zinc-200/20 dark:group-hover:shadow-zinc-900/20"
      >
        <div className="flex flex-col h-full">
          <motion.div 
            className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <h3 className="mb-4 text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
        </div>
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}
