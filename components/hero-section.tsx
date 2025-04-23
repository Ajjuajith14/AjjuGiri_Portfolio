"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from 'lucide-react'
import { TypeAnimation } from "react-type-animation"
import { useDeviceDetection } from "@/hooks/use-device-detection"
import ParticlesBackground from "./particles-background"
import ParallaxSection from "./parallax-section"
import ScrollReveal from "./scroll-reveal"

// Add the missing imports
import { Code, Braces, Server, Database, FileCode } from 'lucide-react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { isLowEndDevice } = useDeviceDetection()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects for hero content
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToAbout = () => {
    if (typeof window !== "undefined" && isMounted) {
      requestAnimationFrame(() => {
        try {
          const aboutSection = document.getElementById("about")
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" })
          }
        } catch (error) {
          console.error("Error scrolling to about section:", error)
        }
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.2,
      },
    },
  }

  // Floating icons
  const FloatingIcon = ({ icon, className }: { icon: React.ReactNode; className: string }) => (
    <motion.div
      variants={iconVariants}
      className={`absolute hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 backdrop-blur-sm ${className}`}
    >
      {icon}
    </motion.div>
  )

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden scroll-section"
    >
      {!isLowEndDevice && <ParticlesBackground />}

      <div className="absolute inset-0 animated-bg"></div>

      {/* Content container with higher z-index and parallax effect */}
      <motion.div
        className="container relative z-30 flex flex-col items-center text-center"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollReveal direction="down" delay={0.1}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Frontend Developer & SDE
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">Ajju Giri</h1>
        </ScrollReveal>

        {/* Update the TypeAnimation component to ensure it's not blocked by any icons */}
        <ScrollReveal delay={0.5} className="text-xl md:text-2xl text-foreground/80 h-16 mb-10 relative z-30">
          <TypeAnimation
            sequence={[
              "Frontend Developer with React.js & Next.js",
              1000,
              "Full Stack Developer with React & MongoDB/Springboot",
              1000,
              "Java Developer with Spring Boot",
              1000,
              "Problem Solver with 250+ DSA Solutions",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
            className="text-primary"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.7}>
          <Button
            onClick={scrollToAbout}
            className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 neon-button"
          >
            Explore My Work
            <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
        </ScrollReveal>
      </motion.div>

      {/* Floating icons with parallax effect */}
      <ParallaxSection speed={0.3} overflow={true} className="absolute inset-0 pointer-events-none">
        <FloatingIcon icon={<Code className="h-8 w-8 text-primary" />} className="top-[15%] left-[10%] floating" />
        <FloatingIcon
          icon={<Braces className="h-8 w-8 text-primary" />}
          className="bottom-[15%] right-[10%] floating-slow"
        />
        <FloatingIcon
          icon={<Server className="h-8 w-8 text-primary" />}
          className="top-[20%] right-[15%] floating-fast"
        />
        <FloatingIcon
          icon={<Database className="h-8 w-8 text-primary" />}
          className="bottom-[20%] left-[15%] floating"
        />
        <FloatingIcon
          icon={<FileCode className="h-8 w-8 text-primary" />}
          className="top-[80%] left-[20%] floating-slow"
        />
      </ParallaxSection>

      {/* Decorative gradient circles with parallax effect */}
      <ParallaxSection speed={0.2} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </ParallaxSection>
    </section>
  )
}