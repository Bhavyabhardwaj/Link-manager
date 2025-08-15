"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export const AuroraBackground = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.3), transparent 40%)`,
          }}
          transition={{ duration: 0.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.05)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
