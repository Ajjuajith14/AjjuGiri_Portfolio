"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Trophy, Code, Award, Star, GitBranch, CheckCircle2 } from 'lucide-react'
import AnimatedCounter from "./animated-counter"
import ScrollReveal from "./scroll-reveal"
import ParallaxSection from "./parallax-section"

interface AchievementCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  description: string
  index: number
}

function AchievementCard({ icon, title, value, description, index }: AchievementCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.5 })

  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <motion.div ref={cardRef} className="h-full">
        <div className="gradient-card rounded-lg p-6 h-full relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex flex-col items-center text-center h-full">
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <div className="text-3xl font-bold mb-2 achievement-value">
              {typeof value === "number" ? <AnimatedCounter end={value} delay={index * 0.1} /> : value}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const achievements = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "DSA Problems",
      value: 250,
      description: "Problems solved on GeeksForGeeks",
      index: 0,
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "LeetCode",
      value: 100,
      description: "Problems completed on LeetCode",
      index: 1,
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "CodeChef",
      value: "3-Star",
      description: "Rating earned on CodeChef",
      index: 2,
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Best Project",
      value: "Award",
      description: "Best Major Project Award (5th semester)",
      index: 3,
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Silver Medal",
      value: "District",
      description: "Silver Medal awarded in District Cricket",
      index: 4,
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Certifications",
      value: 5,
      description: "Professional certifications earned",
      index: 5,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-20 md:py-32 w-full scroll-section relative overflow-hidden"
    >
      <div className="absolute inset-0 animated-bg"></div>

      {/* Decorative elements with parallax */}
      <ParallaxSection speed={0.2} overflow={true} className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></motion.div>
        <motion.div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></motion.div>
      </ParallaxSection>

      <div className="container relative z-10">
        <ScrollReveal direction="down">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Achievements
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">My Accomplishments</h2>

            <p className="text-lg text-foreground/80">
              Highlighting my accomplishments in problem-solving, coding competitions, and professional development.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.index}
              icon={achievement.icon}
              title={achievement.title}
              value={achievement.value}
              description={achievement.description}
              index={achievement.index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}