"use client"

import { useState, useEffect } from "react"

interface DeviceCapabilities {
  isLowEndDevice: boolean
  isMobile: boolean
  prefersReducedMotion: boolean
  isTouchDevice: boolean
}

export function useDeviceDetection(): DeviceCapabilities & { isReady: boolean } {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities & { isReady: boolean }>({
    isLowEndDevice: false,
    isMobile: false,
    prefersReducedMotion: false,
    isTouchDevice: false,
    isReady: false,
  })

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Detect low-end devices based on memory, CPU cores, and user agent
    const isLowEndDevice = () => {
      // Check available memory (if available in browser)
      if ("deviceMemory" in navigator) {
        // @ts-ignore - deviceMemory exists but TypeScript doesn't know about it
        if (navigator.deviceMemory < 4) return true
      }

      // Check CPU cores (if available)
      if ("hardwareConcurrency" in navigator) {
        if (navigator.hardwareConcurrency < 4) return true
      }

      // Check for mobile devices
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      // If it's a mobile device and we couldn't determine memory/CPU, assume it might be low-end
      if (isMobileDevice) return true

      return false
    }

    // Detect mobile devices
    const isMobile = () => {
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      )
    }

    // Detect touch devices
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      )
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = () => {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }

    // Set capabilities
    setCapabilities({
      isLowEndDevice: isLowEndDevice(),
      isMobile: isMobile(),
      prefersReducedMotion: prefersReducedMotion(),
      isTouchDevice: isTouchDevice(),
      isReady: true,
    })

    // Listen for changes in prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setCapabilities((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
      }))
    }

    mediaQuery.addEventListener("change", handleMediaChange)
    return () => mediaQuery.removeEventListener("change", handleMediaChange)
  }, [])

  return capabilities
}