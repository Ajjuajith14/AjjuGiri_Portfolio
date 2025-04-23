"use client"

import { useCallback, useEffect, useState } from "react"
import Particles from "react-particles"
import type { Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import { useTheme } from "next-themes"

export default function ParticlesBackground() {
  const [mounted, setMounted] = useState(false)
  const { isLowEndDevice } = useDeviceDetection()
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  if (!mounted) return null

  // Reduce particle count for low-end devices
  const particleCount = isLowEndDevice ? 20 : 50

  // Adjust particle color based on theme - enhanced contrast for light mode
  const particleColor = theme === "light" ? "#6d28d9" : "#954ce9"
  const linkColor = theme === "light" ? "#7c3aed" : "#954ce9"
  const linkOpacity = theme === "light" ? 0.3 : 0.2 // Higher opacity for light mode for better visibility

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: linkOpacity,
            width: theme === "light" ? 1.2 : 1, // Slightly thicker lines for light mode
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleCount,
          },
          opacity: {
            value: theme === "light" ? 0.5 : 0.3, // Higher opacity for light mode
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: theme === "light" ? 4 : 3 }, // Slightly larger particles for light mode
          },
        },
        detectRetina: true,
      }}
    />
  )
}