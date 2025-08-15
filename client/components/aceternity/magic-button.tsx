"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface MagicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const MagicButton = forwardRef<HTMLButtonElement, MagicButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <motion.div
          className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    )
  }
)

MagicButton.displayName = "MagicButton"
