"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Eye, EyeOff } from 'lucide-react'

export default function ResumeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [previewVisible, setPreviewVisible] = useState(true)

  return (
    <section ref={sectionRef} id="resume" className="py-20 md:py-32 w-full scroll-section gradient-bg">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Resume
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 glow-text">My Resume</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Download my resume to learn more about my skills, experience, and education.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 neon-button">
              <a href="/ajju-giri-resume.pdf" download="Ajju_Giri_Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>

            <Button variant="outline" onClick={() => setPreviewVisible(!previewVisible)} className="neon-button">
              {previewVisible ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          </div>

          <AnimatePresence>
            {previewVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="gradient-card rounded-lg shadow-lg overflow-hidden glow-border"
              >
                <div className="aspect-[8.5/11] w-full bg-white relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full p-8 text-black overflow-y-auto">
                      <div className="border-b border-gray-300 pb-4 mb-4">
                        <h1 className="text-3xl font-bold mb-2">AJJU GIRI</h1>
                        <p className="text-gray-600">ajjugiri14@gmail.com | +91 8341755684 | Hyderabad, Telangana</p>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">EDUCATION</h2>
                        <div className="mb-2">
                          <div className="flex flex-wrap justify-between">
                            <h3 className="font-bold">Indian Institute Of Information Technology Pune</h3>
                            <span>July 2020 - May 2024</span>
                          </div>
                          <p className="italic mb-1">
                            Bachelor of Technology in Electronics and Communication Engineering
                          </p>
                          <p className="text-sm">CGPA: 7.1</p>
                        </div>
                        <div>
                          <div className="flex flex-wrap justify-between">
                            <h3 className="font-bold">Narayana Junior College</h3>
                            <span>Jun 2017 - July 2019</span>
                          </div>
                          <p className="italic mb-1">Intermediate in Maths, Physics and Chemistry</p>
                          <p className="text-sm">Percentage: 96.8</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">WORK EXPERIENCE</h2>
                        <div className="mb-3">
                          <div className="flex flex-wrap justify-between">
                            <h3 className="font-bold">SDE Intern</h3>
                            <span>Jul 2024 - Jan 2025</span>
                          </div>
                          <p className="italic mb-1">Klandr, Work From Home</p>
                          <ul className="list-disc pl-5 text-gray-700 text-sm">
                            <li>
                              Developed a responsive CRM application using React.js, TypeScript, and Next.js, improving
                              sales workflows and enhancing lead conversion by 400%.
                            </li>
                            <li>
                              Optimized backend services using SQL, PostgreSQL, Supabase, and Prisma, reducing database
                              query execution time by 35%.
                            </li>
                            <li>
                              Integrated Google Cloud Storage and AWS, reducing downtime by 50% and ensuring seamless
                              cloud deployment.
                            </li>
                            <li>
                              Followed Agile methodologies and maintained clean, modular code using Git and version
                              control workflows, reducing development errors by 30%.
                            </li>
                            <li>
                              Experienced in Agile development processes and working with GitLab and Jira for version
                              control.
                            </li>
                            <li>
                              Worked with real-time data streams and WebSocket integration during feature development.
                            </li>
                          </ul>
                        </div>
                        <div>
                          <div className="flex flex-wrap justify-between">
                            <h3 className="font-bold">Front End Developer Intern</h3>
                            <span>Nov 2021 - Jan 2022</span>
                          </div>
                          <p className="italic mb-1">1stop.ai, Work From Home</p>
                          <ul className="list-disc pl-5 text-gray-700 text-sm">
                            <li>
                              Designed and deployed a prototype of an E-Commerce website for purchasing clothes,
                              sneakers, and more, increasing user engagement by 30%.
                            </li>
                            <li>
                              Leveraged HTML, CSS, JavaScript, and Bootstrap to develop a visually appealing and
                              responsive front-end interface, reducing page load time by 25%.
                            </li>
                            <li>
                              Implemented modern typography, color schemes, and layout techniques, leading to a 20%
                              improvement in user retention.
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">PROJECTS</h2>
                        <div className="mb-2">
                          <h3 className="font-bold">Movie Review Application</h3>
                          <ul className="list-disc pl-5 text-gray-700 text-sm">
                            <li>
                              Developed a highly scalable movie review platform allowing users to post reviews,
                              increasing user retention by 50%.
                            </li>
                            <li>
                              Built using React.js, CSS, Spring Boot, Hibernate, and Node.js with MongoDB Atlas for
                              database management, ensuring 99.9% uptime.
                            </li>
                            <li>
                              Implemented GET and POST API methods for efficient data retrieval and storage, improving
                              review submission speed by 40%.
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">TECHNICAL SKILLS</h2>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Programming Languages:</span> Java, Python, C++, C
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Web Development:</span> HTML5, CSS3, JavaScript, PHP, Node.js,
                          RESTful APIs, MongoDB, Figma, CI/CD
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Frameworks & Libraries:</span> React.js, Next.js, Redux,
                          Spring, Spring Boot, JDBC, JUnit, Prisma, Cypress, Jest, React Testing Library
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Databases & Cloud:</span> PostgreSQL, MySQL, Supabase, SQL,
                          NoSQL, AWS, GCP, Git, GitLab, CI/CD
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Core Skills:</span> Data Structures and Algorithms, OOPs,
                          DBMS, Core Java, Advanced Java, Problem Solving
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Tools & IDEs:</span> VS Code, IntelliJ IDEA, Eclipse, PyCharm
                          CE, Sublime Text
                        </p>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2 text-gray-800">ADDITIONAL TRAINING & CERTIFICATES</h2>
                        <ul className="list-disc pl-5 text-gray-700 text-sm">
                          <li>
                            Scaler Certified - DSA Fundamentals by Java
                          </li>
                          <li>Simplilearn - Java Full Stack Development</li>
                          <li>Udemy Certified - Master SpringBoot & Hibernate</li>
                          <li>1stop Certified - Front End Development</li>
                          <li>Great Learning Certified - UI/UX for Beginners</li>
                        </ul>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold mb-2 text-gray-800">ACHIEVEMENTS</h2>
                        <ul className="list-disc pl-5 text-gray-700 text-sm">
                          <li>250+ DSA problems solved on GFG</li>
                          <li>100+ problems completed on LeetCode</li>
                          <li>Best Major Project Award received (5th semester)</li>
                          <li>3-Star rating earned on CodeChef</li>
                          <li>Silver Medal awarded (District Cricket)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// "use client"

// import type React from "react"
// import { Download } from "lucide-react"
// import { Button } from "@/components/ui/button"

// interface ResumeSectionProps {
//   title: string
//   children: React.ReactNode
// }

// const ResumeSection: React.FC<ResumeSectionProps> = ({ title, children }) => {
//   return (
//     <section className="mb-8">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">{title}</h2>
//         <Button asChild className="bg-primary hover:bg-primary/90 neon-button">
//           <a
//             href="/AjjuGiri-Resume.pdf"
//             download
//             onClick={(e) => {
//               // Force download attribute to work properly
//               const link = document.createElement("a")
//               link.href = "/AjjuGiri-Resume.pdf.pdf"
//               link.download = "AjjuGiri-Resume.pdf"
//               document.body.appendChild(link)
//               link.click()
//               document.body.removeChild(link)
//               e.preventDefault()
//             }}
//           >
//             <Download className="mr-2 h-4 w-4" />
//             Download Resume
//           </a>
//         </Button>
//       </div>
//       <div>{children}</div>
//     </section>
//   )
// }

// export default ResumeSection
