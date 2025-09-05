"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Code, Zap, Rocket, Brain } from "lucide-react"
import { ScrollBackground } from "@/components/ScrollBackground"
import { Nav } from "@/components/Nav"
import { setupSectionObserver } from "@/utils/scroll"

export default function FuturisticPortfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    setIsVisible(true)

    const cleanup = setupSectionObserver(["hero", "skills", "projects", "aspirations", "contact"], setActiveSection)

    return cleanup
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = [
    {
      name: "React/Next.js",
      level: 95,
      icon: <Code className="w-6 h-6 text-purple-400" />,
      description: "Building modern web applications with cutting-edge frameworks",
    },
    {
      name: "TypeScript",
      level: 90,
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      description: "Type-safe development for scalable applications",
    },
    {
      name: "Animation Libraries",
      level: 88,
      icon: <Rocket className="w-6 h-6 text-pink-400" />,
      description: "Framer Motion, GSAP, and custom CSS animations",
    },
    {
      name: "UI/UX Design",
      level: 85,
      icon: <Brain className="w-6 h-6 text-green-400" />,
      description: "Creating intuitive and beautiful user experiences",
    },
    {
      name: "Node.js/APIs",
      level: 82,
      icon: <Code className="w-6 h-6 text-yellow-400" />,
      description: "Backend development and API integration",
    },
    {
      name: "Three.js/WebGL",
      level: 78,
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      description: "3D graphics and immersive web experiences",
    },
  ]

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of machine learning models",
      tech: ["Three.js", "React", "WebGL"],
      status: "Live",
    },
    {
      title: "Quantum UI Library",
      description: "Futuristic component library with advanced animations",
      tech: ["React", "Framer Motion", "TypeScript"],
      status: "In Progress",
    },
    {
      title: "AI Code Assistant",
      description: "Smart coding companion with real-time suggestions",
      tech: ["Next.js", "OpenAI API", "WebSockets"],
      status: "Planning",
    },
  ]

  const aspirations = [
    { year: "2024", goal: "Master WebGL and 3D web development", icon: <Code className="w-5 h-5" /> },
    { year: "2025", goal: "Launch AI-powered development tools", icon: <Brain className="w-5 h-5" /> },
    { year: "2026", goal: "Contribute to open-source WebXR projects", icon: <Zap className="w-5 h-5" /> },
    { year: "2027", goal: "Build immersive metaverse experiences", icon: <Rocket className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen relative">
      <ScrollBackground activeSection={activeSection} />

      <Nav activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-400/10 animate-pulse" />
        <div className="absolute top-20 left-20 w-20 h-20 bg-purple-600/30 rounded-full animate-bounce delay-1000 blur-sm" />
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-purple-400/30 rounded-full animate-bounce delay-2000 blur-sm" />
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-purple-500/30 rounded-full animate-pulse delay-1500 blur-sm" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-600/40 rounded-full animate-ping delay-3000" />
        <div className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-purple-400/40 rounded-full animate-ping delay-4000" />

        <div
          className={`text-center z-10 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 bg-clip-text text-transparent mb-6 animate-in slide-in-from-bottom-4 duration-1000 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] hover:animate-[shimmer_0.5s_ease-in-out_infinite]">
            Connor Duncan
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 animate-in slide-in-from-bottom-4 duration-1000 delay-200 hover:bg-gradient-to-r hover:from-purple-300 hover:via-white hover:to-purple-300 hover:bg-clip-text hover:text-transparent hover:bg-[length:200%_100%] hover:animate-[shimmer_1s_ease-in-out_infinite] transition-all duration-300 cursor-default">
            Full Stack Web Developer • Animation Architect • Digital Innovator
          </p>
          <div className="flex gap-4 justify-center animate-in slide-in-from-bottom-4 duration-1000 delay-400">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => scrollToSection("projects")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Work
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-purple-300 hover:via-white hover:to-purple-300 hover:bg-[length:200%_100%] hover:animate-[shimmer_1s_ease-in-out_infinite] transition-all duration-300 cursor-default">
          Technical Arsenal
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={skill.name}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 border-purple-500/20 hover:border-purple-400/50 bg-black/60 backdrop-blur-sm ${
                activeSkill === skill.name ? "ring-2 ring-purple-400 shadow-2xl shadow-purple-500/25 scale-105" : ""
              }`}
              onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
                <Progress value={skill.level} className="mb-3 h-2" />
                <p className="text-sm text-purple-200 mb-2">{skill.level}% Proficiency</p>
                {activeSkill === skill.name && (
                  <p className="text-sm text-purple-100 animate-in slide-in-from-top-2 duration-300">
                    {skill.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-purple-300 hover:via-white hover:to-purple-300 hover:bg-[length:200%_100%] hover:animate-[shimmer_1s_ease-in-out_infinite] transition-all duration-300 cursor-default">
          Innovation Lab
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 border-purple-500/20 hover:border-purple-400/50 bg-black/60 backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-white group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <Badge
                      variant={
                        project.status === "Live"
                          ? "default"
                          : project.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                      className={`${
                        project.status === "Live"
                          ? "bg-purple-600 text-white border-purple-600"
                          : project.status === "In Progress"
                            ? "bg-purple-800/50 text-purple-200 border-purple-600/50"
                            : "border-purple-400/50 text-purple-300"
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-purple-200 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs border-purple-400/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Aspirations Timeline */}
      <section id="aspirations" className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-purple-300 hover:via-white hover:to-purple-300 hover:bg-[length:200%_100%] hover:animate-[shimmer_1s_ease-in-out_infinite] transition-all duration-300 cursor-default">
          Future Trajectory
        </h2>
        <div className="space-y-8">
          {aspirations.map((aspiration, index) => (
            <div
              key={aspiration.year}
              className="flex items-center gap-6 group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                {aspiration.year}
              </div>
              <Card className="flex-1 group-hover:shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 border-purple-500/20 group-hover:border-purple-400/50 bg-black/60 backdrop-blur-sm">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {aspiration.icon}
                  </div>
                  <p className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors duration-300">
                    {aspiration.goal}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-purple-300 hover:via-white hover:to-purple-300 hover:bg-[length:200%_100%] hover:animate-[shimmer_1s_ease-in-out_infinite] transition-all duration-300 cursor-default">
          Connect & Collaborate
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-in slide-in-from-left-4 duration-1000">
            <h3 className="text-2xl font-bold mb-6 text-white hover:bg-gradient-to-r hover:from-purple-300 hover:via-white hover:to-purple-300 hover:bg-clip-text hover:text-transparent hover:bg-[length:200%_100%] hover:animate-[shimmer_1s_ease-in-out_infinite] transition-all duration-300 cursor-default">
              Let's Build the Future
            </h3>
            <p className="text-purple-200 mb-8 leading-relaxed">
              Ready to push the boundaries of web development? Whether it's creating immersive experiences, building
              cutting-edge animations, or exploring new technologies, I'm always excited to collaborate on innovative
              projects.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open("https://github.com/connorduncan", "_blank")}
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open("https://linkedin.com/in/connorduncan", "_blank")}
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open("mailto:connor@example.com", "_blank")}
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Card className="border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 animate-in slide-in-from-right-4 duration-1000 bg-black/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <form className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="bg-black/50 border-purple-500/30 text-white placeholder:text-purple-300 hover:border-purple-400/50 focus:border-purple-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-black/50 border-purple-500/30 text-white placeholder:text-purple-300 hover:border-purple-400/50 focus:border-purple-400 transition-colors duration-300"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    className="bg-black/50 border-purple-500/30 text-white placeholder:text-purple-300 hover:border-purple-400/50 focus:border-purple-400 transition-colors duration-300"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-purple-300 border-t border-purple-500/20">
        <p>&copy; 2024 Connor Duncan. Crafted with passion and future-forward thinking.</p>
      </footer>
    </div>
  )
}
