"use client"

import { Suspense, type ReactNode } from "react"
import { Canvas } from "@react-three/fiber"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import { Loader } from "@/components/ui/loader"

// Define the allowed frameloop values
type FrameloopValue = "always" | "demand" | "never"

interface OptimizedCanvasProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  dpr?: number | [min: number, max: number]
  performance?: "low" | "medium" | "high"
}

export function OptimizedCanvas({ children, fallback, className, dpr, performance = "medium" }: OptimizedCanvasProps) {
  const { isLowEndDevice, isMobile, prefersReducedMotion, isReady } = useDeviceDetection()

  // Don't render anything until we've detected device capabilities
  if (!isReady) {
    return <div className={`${className} flex items-center justify-center bg-muted/20`}>{fallback || <Loader />}</div>
  }

  // Calculate appropriate device pixel ratio
  const calculateDpr = (): number | [number, number] => {
    if (dpr) return dpr
    if (isLowEndDevice) return 1
    if (isMobile) return 1.5
    return [1, 2] as [number, number]
  }

  // Determine the frameloop value
  const getFrameloop = (): FrameloopValue => {
    return prefersReducedMotion ? "demand" : "always"
  }

  // Performance settings based on device capabilities
  const getPerformanceSettings = () => {
    // Get the frameloop value
    const frameloop = getFrameloop()
    
    // Base settings
    const settings = {
      flat: true, // Use flat shading when possible
      frameloop, // Use the typed frameloop value
      // Add error handling for the canvas
      onCreated: (state: any) => {
        // Add any initialization code here
        state.gl.setClearColor(0x000000, 0) // Set transparent background
      },
      // Add error handling
      onError: (error: any) => {
        console.error("Canvas error:", error)
      },
    }

    // Add performance-specific settings
    if (isLowEndDevice || performance === "low") {
      return {
        ...settings,
        dpr: 1,
        frameloop: "demand" as FrameloopValue, // Explicitly type as FrameloopValue
        gl: { antialias: false, powerPreference: "low-power" },
      }
    }

    if (isMobile || performance === "medium") {
      return {
        ...settings,
        dpr: calculateDpr(),
        gl: { powerPreference: "high-performance" },
      }
    }

    // High performance settings
    return {
      ...settings,
      dpr: calculateDpr(),
      gl: { antialias: true, powerPreference: "high-performance" },
    }
  }

  // Add an error boundary for the Canvas
  return (
    <div className={className}>
      <Canvas {...getPerformanceSettings()}>
        <Suspense fallback={null}>
          {/* Wrap children in an error boundary */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}