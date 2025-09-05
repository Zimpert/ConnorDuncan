"use client"

import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

interface BackgroundProps {
  activeSection: string
}

export function ScrollBackground({ activeSection }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollVelocityRef = useRef(0)
  const lastScrollRef = useRef(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  // Section-based color palettes (HSL hue values)
  const sectionColors = {
    hero: { primary: 270, secondary: 300, tertiary: 240 }, // Purple spectrum
    skills: { primary: 280, secondary: 310, tertiary: 250 },
    projects: { primary: 290, secondary: 320, tertiary: 260 },
    aspirations: { primary: 300, secondary: 330, tertiary: 270 },
    contact: { primary: 310, secondary: 340, tertiary: 280 },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Scroll velocity tracking
    const handleScroll = () => {
      const currentScroll = window.scrollY
      scrollVelocityRef.current = Math.abs(currentScroll - lastScrollRef.current)
      lastScrollRef.current = currentScroll
    }
    window.addEventListener("scroll", handleScroll)

    // Initialize particles
    const initParticles = () => {
      const particleCount = window.innerWidth < 768 ? 50 : 100
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          hue: Math.random() * 60 + 270, // Purple range
        })
      }
    }
    initParticles()

    // Animation loop
    const animate = () => {
      if (!isVisible || prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const colors = sectionColors[activeSection as keyof typeof sectionColors] || sectionColors.hero
      const scrollIntensity = Math.min(scrollVelocityRef.current * 0.1, 2)

      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = ((maxDistance - distance) / maxDistance) * 0.02
          particle.vx -= (dx / distance) * force
          particle.vy -= (dy / distance) * force
        }

        // Update position with scroll influence
        particle.x += particle.vx * (1 + scrollIntensity)
        particle.y += particle.vy * (1 + scrollIntensity)

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Gradually shift color based on section
        const targetHue = colors.primary + (index % 3) * 20
        particle.hue += (targetHue - particle.hue) * 0.01

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        })

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99
      })

      // Decay scroll velocity
      scrollVelocityRef.current *= 0.95

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [activeSection, isVisible, prefersReducedMotion])

  if (prefersReducedMotion) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/10 via-black to-purple-800/10" />
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(135deg, #000000 0%, #1a0033 50%, #000000 100%)" }}
    />
  )
}
