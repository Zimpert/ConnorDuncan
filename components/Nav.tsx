"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

interface NavProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export function Nav({ activeSection, onSectionChange }: NavProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "aspirations", label: "Goals" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
      onSectionChange(sectionId)
    }
    setIsNavOpen(false)
  }

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isNavOpen) {
        setIsNavOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isNavOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (isNavOpen) {
      const focusableElements = document.querySelectorAll(
        "[data-mobile-nav] button, [data-mobile-nav] a, [data-mobile-nav] input, [data-mobile-nav] select, [data-mobile-nav] textarea",
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus()
              e.preventDefault()
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      firstElement?.focus()

      return () => document.removeEventListener("keydown", handleTabKey)
    }
  }, [isNavOpen])

  return (
    <nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 backdrop-blur-lg border border-purple-500/30 rounded-full px-6 py-3 shadow-2xl animate-in slide-in-from-top-4 duration-1000 delay-500"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black ${
                activeSection === item.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "text-purple-200 hover:text-white hover:bg-purple-800/50"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="md:hidden p-2 rounded-full hover:bg-purple-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-expanded={isNavOpen}
          aria-controls="mobile-menu"
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
        >
          {isNavOpen ? <X className="w-5 h-5 text-purple-200" /> : <Menu className="w-5 h-5 text-purple-200" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isNavOpen && (
        <div
          id="mobile-menu"
          data-mobile-nav
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          role="menu"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-inset ${
                  activeSection === item.id
                    ? "bg-purple-600 text-white"
                    : "text-purple-200 hover:text-white hover:bg-purple-800/50"
                }`}
                role="menuitem"
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
