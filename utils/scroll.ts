"use client"

export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit,
) {
  const observer = new IntersectionObserver(callback, {
    threshold: 0.3,
    rootMargin: "-20% 0px -20% 0px",
    ...options,
  })

  return observer
}

export function setupSectionObserver(sections: string[], onSectionChange: (sectionId: string) => void) {
  const observer = useIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onSectionChange(entry.target.id)
      }
    })
  })

  sections.forEach((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      observer.observe(element)
    }
  })

  return () => observer.disconnect()
}
