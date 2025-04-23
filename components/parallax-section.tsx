"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down"
  overflow?: boolean
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "up",
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Adjust the transform based on direction
  const y = useTransform(scrollYProgress, [0, 1], direction === "up" ? [0, -100 * speed] : [0, 100 * speed])

  return (
    <motion.div ref={ref} className={`relative ${overflow ? "overflow-visible" : "overflow-hidden"} ${className}`}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  )
}