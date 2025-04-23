import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import AchievementsSection from "@/components/achievements-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import ResumeSection from "@/components/resume-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="noise"></div>
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
    </main>
  )
}
