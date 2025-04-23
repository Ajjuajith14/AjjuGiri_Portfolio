"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Delay the start of the animation
      const delayTimeout = setTimeout(() => {
        let startTime: number
        let animationFrame: number

        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
          setCount(Math.floor(progress * end))

          if (progress < 1) {
            animationFrame = requestAnimationFrame(step)
          } else {
            setCount(end)
            setHasAnimated(true)
          }
        }

        animationFrame = requestAnimationFrame(step)

        return () => {
          cancelAnimationFrame(animationFrame)
          clearTimeout(delayTimeout)
        }
      }, delay * 1000)

      return () => clearTimeout(delayTimeout)
    }
  }, [isInView, end, duration, delay, hasAnimated])

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}