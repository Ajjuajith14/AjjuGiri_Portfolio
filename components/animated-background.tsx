"use client"

import { useRef } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()

  // Transform values based on scroll
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.15, 0.2])
  const gradientPosition = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Theme-based colors - Fixed by properly formatting the rgba strings
  const primaryColor = theme === "dark" ? "rgba(149, 76, 233, 0.15)" : "rgba(124, 58, 237, 0.15)"
  const secondaryColor = theme === "dark" ? "rgba(43, 74, 134, 0.15)" : "rgba(79, 70, 229, 0.15)"

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        opacity: backgroundOpacity,
        background: `
          radial-gradient(circle at ${gradientPosition.get()}% 20%, ${primaryColor} 0%, transparent 30%),
          radial-gradient(circle at ${100 - gradientPosition.get()}% 80%, ${secondaryColor} 0%, transparent 30%)
        `,
      }}
    />
  )
}