"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Achievements", href: "#achievements" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { theme } = useTheme()

  // Only run on client side after component is mounted
  useEffect(() => {
    // Set mounted state
    setIsMounted(true)

    // Defer adding event listeners with a timeout
    const timer = setTimeout(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)

        // Find active section
        const sections = navItems.map((item) => item.href.replace("#", ""))

        for (const section of sections.reverse()) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }

      // Check if window exists before adding listener
      if (typeof window !== "undefined") {
        // Initial check
        handleScroll()

        // Add event listener
        window.addEventListener("scroll", handleScroll, { passive: true })
      }

      // Cleanup function
      return () => {
        if (typeof window !== "undefined") {
          window.removeEventListener("scroll", handleScroll)
        }
      }
    }, 100) // Short delay to ensure DOM is ready

    // Clear timeout on unmount
    return () => clearTimeout(timer)
  }, [])

  // Safe scroll function
  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)

    // Only run on client side
    if (typeof window !== "undefined" && isMounted) {
      // Extract the ID from the href
      const id = href.replace("#", "")

      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        try {
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        } catch (error) {
          console.error("Error scrolling to section:", error)
        }
      })
    }
  }

  // Don't render anything until mounted
  if (!isMounted) {
    return null
  }

  // Enhanced light mode styles
  const headerBg = isScrolled
    ? theme === "light"
      ? "bg-white/90 backdrop-blur-md py-2 shadow-md"
      : "bg-background/80 backdrop-blur-md py-2 shadow-md"
    : "bg-transparent py-4"

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", headerBg)}>
        <div className="container flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <span className="text-primary glow-text">Ajju</span>
            <span className={theme === "light" ? "text-primary/80" : "text-primary/70"}>Giri</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors animated-underline",
                    activeSection === item.href.replace("#", "")
                      ? "text-primary"
                      : theme === "light"
                        ? "text-foreground/80 hover:text-primary"
                        : "text-foreground/70 hover:text-primary",
                  )}
                >
                  {item.name}
                </button>
              </motion.div>
            ))}
            <ModeToggle />
          </nav>

          <div className="flex items-center md:hidden">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`ml-4 p-1 ${theme === "light" ? "text-foreground/80" : "text-foreground/70"} hover:text-primary`}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-50 ${theme === "light" ? "bg-white/95" : "bg-background/95"} backdrop-blur-sm md:hidden`}
          >
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="text-xl font-bold">
                  <span className="text-primary glow-text">Ajju</span>
                  <span className={theme === "light" ? "text-primary/80" : "text-primary/70"}>Giri</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-1 ${theme === "light" ? "text-foreground/80" : "text-foreground/70"} hover:text-primary`}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-8 p-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={cn(
                        "text-lg font-medium transition-colors",
                        activeSection === item.href.replace("#", "")
                          ? "text-primary"
                          : theme === "light"
                            ? "text-foreground/80 hover:text-primary"
                            : "text-foreground/70 hover:text-primary",
                      )}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}