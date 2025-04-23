"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const { isMobile, isTouchDevice, isReady } = useDeviceDetection()
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  // Mouse position values
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Create springs for smooth movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Outer cursor (follows with more delay)
  const outerCursorX = useSpring(cursorX, { damping: 15, stiffness: 200 })
  const outerCursorY = useSpring(cursorY, { damping: 15, stiffness: 200 })

  // State for hover effects
  const [isHovering, setIsHovering] = useState(false)
  const [cursorActive, setCursorActive] = useState(false)

  useEffect(() => {
    // Don't run on mobile or touch devices
    if (isMobile || isTouchDevice || !isReady) return

    setCursorActive(true)
    document.body.classList.add("custom-cursor-active")

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      if (!isVisible) {
        setIsVisible(true)
      }
    }

    // Track mouse movement
    window.addEventListener("mousemove", moveCursor)

    // Track hover state on interactive elements
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, .gradient-card, .neon-button',
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Hide cursor when it leaves the window
    const handleMouseLeaveWindow = () => setIsVisible(false)
    const handleMouseEnterWindow = () => setIsVisible(true)

    document.body.addEventListener("mouseleave", handleMouseLeaveWindow)
    document.body.addEventListener("mouseenter", handleMouseEnterWindow)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.body.removeEventListener("mouseleave", handleMouseLeaveWindow)
      document.body.removeEventListener("mouseenter", handleMouseEnterWindow)
      document.body.classList.remove("custom-cursor-active")

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [cursorX, cursorY, isMobile, isTouchDevice, isReady, isVisible])

  // Don't render on mobile/touch devices or when not ready
  if (isMobile || isTouchDevice || !isReady || !cursorActive) return null

  // Get cursor colors based on theme
  const cursorColor = theme === "dark" ? "rgba(149, 76, 233, 0.6)" : "rgba(124, 58, 237, 0.6)"
  const cursorBorder = theme === "dark" ? "rgba(149, 76, 233, 0.2)" : "rgba(124, 58, 237, 0.3)"

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: cursorColor,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ scale: { type: "spring", damping: 20, stiffness: 300 } }}
      />

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[9998]"
        style={{
          x: outerCursorX,
          y: outerCursorY,
          borderColor: cursorBorder,
          opacity: isVisible ? 0.6 : 0,
          scale: isHovering ? 1.8 : 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ scale: { type: "spring", damping: 15, stiffness: 200 } }}
      />
    </>
  )
}