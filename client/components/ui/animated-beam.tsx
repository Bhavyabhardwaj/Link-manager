// components/ui/animated-beam.tsx
"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AnimatedBeamProps {
  className?: string
  containerRef?: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startYOffset?: number
  startXOffset?: number
  endYOffset?: number
  endXOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startYOffset = 0,
  startXOffset = 0,
  endYOffset = 0,
  endXOffset = 0,
}) => {
  return (
    <svg
      fill="none"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className
      )}
      viewBox="0 0 400 400"
    >
      <path
        d="M 50 200 Q 200 100 350 200"
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
      />
      <path
        d="M 50 200 Q 200 100 350 200"
        stroke="url(#gradient)"
        strokeWidth={pathWidth}
        fill="none"
        strokeDasharray="5 5"
      >
        <motion.animate
          attributeName="stroke-dashoffset"
          values={reverse ? ["0", "-10"] : ["-10", "0"]}
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </path>
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id="gradient"
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%"
          }}
          animate={{
            x1: ["0%", "100%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"]
          }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            delay: delay
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
