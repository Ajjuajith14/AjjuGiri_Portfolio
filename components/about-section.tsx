"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Layers,
  Smartphone,
  Zap,
  Database,
  GitBranch,
  FileCode,
  Server,
} from "lucide-react";
import { useDeviceDetection } from "@/hooks/use-device-detection";
import { useTheme } from "next-themes";
import ScrollReveal from "./scroll-reveal";
import ParallaxSection from "./parallax-section";

interface SkillProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  level: number;
  delay: number;
}

function Skill({ icon, name, description, level, delay }: SkillProps) {
  const skillRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillRef, { once: true, amount: 0.3 });
  const [width, setWidth] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(level);
      }, delay * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div
      ref={skillRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="gradient-card rounded-lg p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <p
            className={`text-sm ${
              theme === "light" ? "text-foreground/70" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
      <div className="skill-progress-bar mt-4">
        <div
          className="skill-progress-fill"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);
  const { isLowEndDevice } = useDeviceDetection();
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const skills = [
    {
      icon: <Code className="h-6 w-6" />,
      name: "Frontend Development",
      description: "React.js, Next.js, HTML5, CSS3, JavaScript, TypeScript",
      level: 95,
      delay: 0.1,
    },
    {
      icon: <Server className="h-6 w-6" />,
      name: "Backend Development",
      description: "Java, Spring Boot, Node.js, RESTful APIs, MongoDB",
      level: 85,
      delay: 0.2,
    },
    {
      icon: <Layers className="h-6 w-6" />,
      name: "UI Frameworks",
      description: "Bootstrap, Redux, Material UI, Tailwind CSS",
      level: 90,
      delay: 0.3,
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      name: "Responsive Design",
      description: "Mobile-first approach, cross-browser compatibility",
      level: 92,
      delay: 0.4,
    },
    {
      icon: <Database className="h-6 w-6" />,
      name: "Databases",
      description: "PostgreSQL, MySQL, MongoDB, Supabase, SQL, NoSQL",
      level: 80,
      delay: 0.5,
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      name: "Version Control",
      description: "Git, GitLab, CI/CD, Agile methodologies",
      level: 88,
      delay: 0.6,
    },
    {
      icon: <FileCode className="h-6 w-6" />,
      name: "Programming Languages",
      description: "Java, Python, C++, C, JavaScript",
      level: 90,
      delay: 0.7,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      name: "Core Skills",
      description: "DSA, OOPs, DBMS, Problem Solving",
      level: 85,
      delay: 0.8,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Don't render until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 w-full scroll-section gradient-bg"
    >
      <div className="container relative">
        {/* Decorative elements with parallax */}
        <ParallaxSection
          speed={0.15}
          overflow={true}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"></div>
        </ParallaxSection>

        <ScrollReveal direction="down">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
              My Skills & Expertise
            </h2>

            <p
              className={`text-lg ${
                theme === "light" ? "text-foreground/80" : "text-foreground/80"
              }`}
            >
              I'm a passionate Front End Developer and Software Development Engineer (SDE) with a strong focus on creating modern, intuitive,
              and responsive web applications. With expertise in React.js,
              Next.js, TypeScript, and Tailwind CSS, I bring designs to life
              while ensuring performance and accessibility. I have hands-on
              experience building scalable full-stack applications using
              Node.js, Spring Boot, PostgreSQL, and MongoDB. My projects—ranging
              from CRM systems to e-commerce platforms—have improved user
              engagement and performance metrics significantly. I’ve solved 250+
              DSA problems on GFG and LeetCode, showcasing my problem-solving
              mindset. I thrive in fast-paced, Agile environments and take pride
              in writing clean, maintainable code with real-world impact.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <Skill
                icon={skill.icon}
                name={skill.name}
                description={skill.description}
                level={skill.level}
                delay={skill.delay}
              />
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
