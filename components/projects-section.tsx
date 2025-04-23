"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  index: number;
}

function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageUrl,
  index,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // Add delay based on index
      className="project-card gradient-card h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
        <Image
          src={
            imageUrl ||
            `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(
              title
            )}`
          }
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              +{technologies.length - 4} more
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" size="sm" asChild className="neon-button">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-primary hover:bg-primary/90 neon-button"
          >
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [currentProject, setCurrentProject] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Add useEffect to ensure client-side rendering is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "Movie Review Application",
      description:
        "A highly scalable movie review platform allowing users to post reviews, increasing user retention by 50%.",
      technologies: ["React.js", "CSS", "Spring Boot", "Hibernate", "MongoDB"],
      githubUrl: "https://github.com/Ajjuajith14/Full-Stack-Moive-Review-Writer-Application",
      liveUrl: "https://github.com/Ajjuajith14/Full-Stack-Moive-Review-Writer-Application",
      imageUrl:
        "/images/project-images/movie_review_application.png",
    },
    {
      title: "CRM Application",
      description:
        "A responsive CRM application improving sales workflows and enhancing lead conversion by 400%.",
      technologies: [
        "React.js",
        "TypeScript",
        "Next.js",
        "PostgreSQL",
        "Prisma",
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://www.fonemonk.com/",
      imageUrl: "/images/project-images/crm-application.png",
    },
    {
      title: "E-Commerce Website",
      description:
        "Developed a prototype E-Commerce website for purchasing clothes, sneakers, and accessories using HTML, CSS, JavaScript, and Bootstrap. Reduced page load time by 25% and improved layout consistency across 3 device types.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      githubUrl: "https://github.com/Ajjuajith14/E-Commerce-shopping",
      liveUrl: "https://ajjuajith14.github.io/E-Commerce-shopping/",
      imageUrl: "/images/project-images/ecommerce-website.png",
    },
    {
      title: "Portfolio Website",
      description:
        "An interactive 3D portfolio website showcasing frontend development skills and projects.",
      technologies: [
        "Next.js",
        "Three.js",
        "React Three Fiber",
        "Tailwind CSS",
      ],
      githubUrl: "https://github.com/Ajjuajith14/AjjuGiri_Portfolio",
      liveUrl: "https://github.com/Ajjuajith14/AjjuGiri_Portfolio",
      imageUrl: "/images/project-images/portfolio-website.png",
    },
    {
      title: "Todo List Application",
      description:
        "Spearheaded the precise designing of a Todo list Application with 95% accuracy, built using React.js and JavaScript for frontend, and Spring, Spring Boot, Hibernate for backend with MySQL database.",
      technologies: [
        "React.js",
        "JavaScript",
        "Spring Boot",
        "Hibernate",
        "MySQL",
        "H2",
      ],
      githubUrl: "https://github.com/Ajjuajith14/Full-Stack-TodoList-Application",
      liveUrl: "https://github.com/Ajjuajith14/Full-Stack-TodoList-Application",
      imageUrl: "/images/project-images/todolist.png",
    },
    {
      title: "Youtube Clone",
      description:
        "Engineered a responsive React JS application featuring captivating video sections, meticulously crafted to deliver an immersive user experience with Redux for seamless data flow.",
      technologies: ["React.js", "Redux", "CSS", "JavaScript"],
      githubUrl: "https://github.com/Ajjuajith14/Youtube_Clone",
      liveUrl: "https://github.com/Ajjuajith14/Youtube_Clone",
      imageUrl: "/images/project-images/youtube-clone.png",
    },
    {
      title: "Weather Update Application",
      description:
        "Designed and developed a Weather Update Application using JavaScript, Node.js, and Express.js showcasing proficiency in full-stack development with real-time weather data from OpenWeather API.",
      technologies: [
        "JavaScript",
        "Node.js",
        "Express.js",
        "CSS",
        "OpenWeather API",
      ],
      githubUrl: "https://github.com/Ajjuajith14/Weather_App",
      liveUrl: "https://github.com/Ajjuajith14/Weather_App/blob/main/README.md",
      imageUrl: "/images/project-images/weather-api.png",
    },
    {
      title: "Game 2048",
      description:
        "Built and deployed a playable version of the 2048 game using JavaScript, HTML, and CSS. Players slide tiles in four directions to merge matching numbers and reach 2048. Designed as a fun project to boost confidence and refresh the mind.",
        technologies: ["JavaScript", "HTML", "CSS"],
        githubUrl: "https://github.com/Ajjuajith14/Game_2048",
      liveUrl: "https://ajjuajith14.github.io/Game_2048/",
      imageUrl: "/images/project-images/Game2048.png",
    },
    {
      title: "Corn Leaf Disease Detection",
      description:
        "Developed a deep learning model using MobileNet to accurately detect corn leaf diseases as part of my final year project. Achieved 94% classification accuracy, demonstrating strong potential for real-world agricultural applications",
      technologies: ["Python", "TensorFlow", "Kaggle", "Numpy"],
      githubUrl: "https://github.com/Ajjuajith14/Coin_or_Maize_Leaf_Disease_Detection",
      liveUrl: "https://github.com/Ajjuajith14/Coin_or_Maize_Leaf_Disease_Detection/blob/main/Corn_Leaf_Disease_Detection.ipynb",
      imageUrl: "/images/project-images/corn-leaf-disease.png",
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Debug output to verify the number of projects
  // console.log(`Total projects: ${projects.length}`);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 md:py-32 w-full scroll-section gradient-bg"
    >
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">
            Featured Work
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Explore some of my recent work showcasing my skills in frontend
            development, Java, and full-stack applications.
          </p>
          {/* Add a counter to show how many projects are being displayed */}
          <p className="text-sm text-primary mt-2">
            Showing all {projects.length} projects
          </p>
        </motion.div>

        {/* Desktop view - grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mounted &&
            projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
                imageUrl={project.imageUrl}
                index={index}
              />
            ))}
        </div>

        {/* Mobile view - carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              {mounted && (
                <ProjectCard
                  key={currentProject}
                  title={projects[currentProject].title}
                  description={projects[currentProject].description}
                  technologies={projects[currentProject].technologies}
                  githubUrl={projects[currentProject].githubUrl}
                  liveUrl={projects[currentProject].liveUrl}
                  imageUrl={projects[currentProject].imageUrl}
                  index={currentProject}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="rounded-full bg-secondary/50 backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex flex-wrap justify-center gap-1 max-w-[200px]">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentProject ? "bg-primary" : "bg-primary/30"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                ></button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="rounded-full bg-secondary/50 backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Add project counter for mobile */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Project {currentProject + 1} of {projects.length}
          </div>
        </div>
      </div>
    </section>
  );
}
