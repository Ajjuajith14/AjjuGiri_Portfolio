"use client"

import { useState, useEffect } from "react"

export function useMobile(): { isMobile: boolean; isReady: boolean } {
  const [state, setState] = useState({
    isMobile: false,
    isReady: false,
  })

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      const userAgent = 
        typeof window.navigator === "undefined" ? "" : navigator.userAgent
      
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
      
      // Also consider screen width for tablets in portrait mode
      const width = window.innerWidth
      const isMobileSize = width < 768
      
      return mobile || isMobileSize
    }

    // Set initial state
    setState({
      isMobile: checkMobile(),
      isReady: true,
    })

    // Add event listener for window resize
    const handleResize = () => {
      setState(prev => ({
        ...prev,
        isMobile: checkMobile(),
      }))
    }

    window.addEventListener("resize", handleResize)
    
    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return state
}