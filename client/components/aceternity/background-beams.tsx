"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export const BackgroundBeams = ({
  className,
}: {
  className?: string
}) => {
  const [beams, setBeams] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateBeam = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.random() * rect.width
      const y = Math.random() * rect.height
      const opacity = Math.random() * 0.3 + 0.1

      const newBeam = {
        id: Date.now(),
        x,
        y,
        opacity,
      }

      setBeams((prev) => [...prev, newBeam])

      // Remove beam after animation
      setTimeout(() => {
        setBeams((prev) => prev.filter((beam) => beam.id !== newBeam.id))
      }, 3000)
    }

    const interval = setInterval(generateBeam, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
    >
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute w-1 h-32 bg-gradient-to-b from-blue-400/50 to-transparent rounded-full"
          style={{
            left: beam.x,
            top: beam.y,
            opacity: beam.opacity,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: beam.opacity }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
