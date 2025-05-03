// Futuristic Animations for BluLite Web Solutions
document.addEventListener("DOMContentLoaded", () => {
    // Initialize all animations
    initParticleBackground()
    initHoverEffects()
    initScrollAnimations()
    initTextAnimations()
    initLogoAnimation()
    initServiceCardAnimations()
  })
  
  // ===== PARTICLE BACKGROUND =====
  function initParticleBackground() {
    // Create canvas for hero section
    const heroSection = document.querySelector(".hero")
    if (!heroSection) return
  
    const canvas = document.createElement("canvas")
    canvas.classList.add("particle-canvas")
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.4;
    `
  
    // Insert canvas as first child of hero section
    heroSection.style.position = "relative"
    heroSection.style.overflow = "hidden"
    heroSection.insertBefore(canvas, heroSection.firstChild)
  
    // Make sure content is above canvas
    const heroContainer = heroSection.querySelector(".container")
    if (heroContainer) {
      heroContainer.style.position = "relative"
      heroContainer.style.zIndex = "1"
    }
  
    // Initialize particles
    const ctx = canvas.getContext("2d")
    let particles = []
    const particleCount = 50
  
    // Set canvas dimensions
    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth
      canvas.height = heroSection.offsetHeight
    }
  
    // Create particles
    function createParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: "#0066cc",
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }
  
    // Draw particles
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 102, 204, ${particle.opacity})`
        ctx.fill()
  
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
  
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
  
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
  
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 102, 204, ${0.2 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
  
      requestAnimationFrame(drawParticles)
    }
  
    // Initialize
    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })
  
    resizeCanvas()
    createParticles()
    drawParticles()
  }
  
  // ===== HOVER EFFECTS =====
  function initHoverEffects() {
    // Add hover effect to service cards
    const cards = document.querySelectorAll(".service-card, .feature-card, .pricing-card, .maintenance-card")
  
    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 240, 255, 0.8) 0%, rgba(255, 255, 255, 1) 50%)`
        card.style.boxShadow = "0 15px 30px rgba(0, 102, 204, 0.2)"
        card.style.transform = "translateY(-10px) scale(1.02)"
      })
  
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 240, 255, 0.8) 0%, rgba(255, 255, 255, 1) 50%)`
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.background = ""
        card.style.boxShadow = ""
        card.style.transform = ""
      })
    })
  
    // Add hover effect to buttons
    const buttons = document.querySelectorAll(".btn")
  
    buttons.forEach((button) => {
      if (!button.querySelector(".btn-background")) {
        const background = document.createElement("span")
        background.classList.add("btn-background")
        background.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          border-radius: inherit;
        `
  
        button.style.position = "relative"
        button.style.overflow = "hidden"
        button.appendChild(background)
  
        button.addEventListener("mouseenter", () => {
          background.style.opacity = "1"
        })
  
        button.addEventListener("mousemove", (e) => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
  
          background.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`
        })
  
        button.addEventListener("mouseleave", () => {
          background.style.opacity = "0"
        })
      }
    })
  }
  
  // ===== SCROLL ANIMATIONS =====
  function initScrollAnimations() {
    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero")
    const heroImage = document.querySelector(".hero-image img")
  
    if (heroSection && heroImage) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
  
        if (scrollPosition <= heroBottom) {
          const parallaxValue = scrollPosition * 0.3
          heroImage.style.transform = `translateY(${parallaxValue}px) scale(${1 + scrollPosition * 0.0005})`
        }
      })
    }
  
    // Reveal elements on scroll (beyond AOS)
    const revealElements = document.querySelectorAll(".service-item, .process-step, .pricing-card, .maintenance-card")
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight
      const revealPoint = 150
  
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
  
        if (elementTop < windowHeight - revealPoint) {
          if (!element.classList.contains("active")) {
            element.classList.add("active")
            element.style.transition = "transform 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67), opacity 0.8s ease"
            element.style.transform = "translateY(0)"
            element.style.opacity = "1"
          }
        }
      })
    }
  
    // Set initial state
    revealElements.forEach((element) => {
      element.style.transform = "translateY(50px)"
      element.style.opacity = "0"
    })
  
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll() // Check on initial load
  }
  
  // ===== TEXT ANIMATIONS =====
  function initTextAnimations() {
    // Animate section titles with a typing effect
    const sectionTitles = document.querySelectorAll(".section-title")
  
    sectionTitles.forEach((title) => {
      const text = title.textContent
      title.textContent = ""
      title.style.borderRight = "2px solid var(--primary-color)"
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let i = 0
              const typing = setInterval(() => {
                if (i < text.length) {
                  title.textContent += text.charAt(i)
                  i++
                } else {
                  clearInterval(typing)
                  title.style.borderRight = "none"
                }
              }, 50)
  
              observer.unobserve(title)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(title)
    })
  
    // Animate numbers in achievement cards
    const achievementNumbers = document.querySelectorAll(".achievement-number")
  
    achievementNumbers.forEach((number) => {
      const finalValue = Number.parseInt(number.textContent)
      number.textContent = "0"
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let currentValue = 0
              const increment = Math.ceil(finalValue / 50)
  
              const counter = setInterval(() => {
                currentValue += increment
                if (currentValue >= finalValue) {
                  number.textContent = finalValue + (number.textContent.includes("+") ? "+" : "")
                  clearInterval(counter)
                } else {
                  number.textContent = currentValue
                }
              }, 30)
  
              observer.unobserve(number)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(number)
    })
  }
  
  // ===== LOGO ANIMATION =====
  function initLogoAnimation() {
    const logo = document.querySelector(".logo h1")
    if (!logo) return
  
    // Add a subtle pulse animation to the logo
    logo.style.animation = "logoPulse 3s infinite alternate"
  
    // Create the keyframes
    const style = document.createElement("style")
    style.textContent = `
      @keyframes logoPulse {
        0% {
          text-shadow: 0 0 0 rgba(0, 102, 204, 0);
        }
        100% {
          text-shadow: 0 0 10px rgba(0, 102, 204, 0.5);
        }
      }
    `
    document.head.appendChild(style)
  }
  
  // ===== SERVICE CARD ANIMATIONS =====
  function initServiceCardAnimations() {
    // Add 3D tilt effect to service cards
    const cards = document.querySelectorAll(".service-card, .pricing-card")
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const centerX = rect.width / 2
        const centerY = rect.height / 2
  
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20
  
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
      })
    })
  }
  