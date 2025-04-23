"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  index: number
}

function ExperienceItem({ title, company, period, description, skills, index }: ExperienceItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={itemRef}
      className="experience-item"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 text-muted-foreground">
        <span>{company}</span>
        <span className="hidden sm:block">•</span>
        <span>{period}</span>
      </div>
      <p className="mb-4 text-foreground/80">{description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <Badge key={i} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  const experiences = [
    {
      title: "SDE Intern",
      company: "Klandr, Work From Home",
      period: "Jul 2024 - Jan 2025",
      description:
        "Developed a responsive CRM application using React.js, TypeScript, and Next.js, improving sales workflows and enhancing lead conversion by 400%. Optimized backend services using SQL, PostgreSQL, Supabase, and Prisma, reducing database query execution time by 35%.",
      skills: ["React.js", "TypeScript", "Next.js", "PostgreSQL", "Prisma", "AWS", "Google Cloud"],
    },
    {
      title: "Front End Developer Intern",
      company: "1stop.ai, Work From Home",
      period: "Nov 2021 - Jan 2022",
      description:
        "Designed and deployed a prototype of an E-Commerce website for purchasing clothes, sneakers, and more, increasing user engagement by 30%. Leveraged HTML, CSS, JavaScript, and Bootstrap to develop a visually appealing and responsive front-end interface, reducing page load time by 25%.",
      skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "UI/UX Design"],
    },
    {
      title: "Bachelor of Technology",
      company: "Indian Institute Of Information Technology Pune",
      period: "July 2020 - May 2024",
      description:
        "Completed B.Tech in Electronics and Communication Engineering with a CGPA of 7.1. Received Best Major Project Award in 5th semester. Solved 250+ DSA problems on GFG and 100+ problems on LeetCode.",
      skills: ["Java", "DSA", "Problem Solving", "Web Development", "Project Management"],
    },
    {
      title: "Intermediate",
      company: "Narayana Junior College",
      period: "Jun 2017 - July 2019",
      description:
        "Completed Intermediate in Mathematics, Physics, and Chemistry with 96.8%. Awarded Silver Medal in District Cricket.",
      skills: ["Mathematics", "Physics", "Chemistry", "Teamwork"],
    },
  ]

  return (
    <section ref={sectionRef} id="experience" className="py-20 md:py-32 w-full scroll-section relative overflow-hidden">
      <div className="absolute inset-0 animated-bg"></div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ y }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      ></motion.div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">My Journey</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            My professional journey and educational background in technology and development.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              skills={exp.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}