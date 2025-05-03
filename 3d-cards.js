// 3D card effect for pricing and service cards
document.addEventListener("DOMContentLoaded", () => {
    init3DCards()
  })
  
  function init3DCards() {
    // Apply 3D effect to featured cards
    const featuredCards = document.querySelectorAll(".pricing-card.featured, .service-card.featured")
  
    featuredCards.forEach((card) => {
      // Add 3D perspective container
      card.style.transform = "perspective(1000px)"
      card.style.transformStyle = "preserve-3d"
  
      // Create shine overlay
      const shineOverlay = document.createElement("div")
      shineOverlay.classList.add("shine-overlay")
      shineOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
        z-index: 1;
      `
  
      // Make sure card has position relative
      card.style.position = "relative"
      card.style.overflow = "hidden"
  
      // Add shine overlay to card
      card.appendChild(shineOverlay)
  
      // Add 3D effect on mouse move
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const centerX = rect.width / 2
        const centerY = rect.height / 2
  
        // Calculate rotation based on mouse position
        const rotateY = ((x - centerX) / centerX) * 10 // Max 10 degrees
        const rotateX = ((centerY - y) / centerY) * 10 // Max 10 degrees
  
        // Apply 3D rotation
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  
        // Update shine effect
        const shineX = (x / rect.width) * 100
        const shineY = (y / rect.height) * 100
        shineOverlay.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 80%)`
        shineOverlay.style.opacity = "1"
      })
  
      // Reset on mouse leave
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
        shineOverlay.style.opacity = "0"
      })
  
      // Add floating animation
      const keyframes = `
        @keyframes float-${Math.random().toString(36).substring(7)} {
          0% { transform: translateY(0) rotate3d(0, 0, 0, 0deg); }
          50% { transform: translateY(-10px) rotate3d(1, 2, 0, 2deg); }
          100% { transform: translateY(0) rotate3d(0, 0, 0, 0deg); }
        }
      `
  
      const style = document.createElement("style")
      style.textContent = keyframes
      document.head.appendChild(style)
  
      card.style.animation = `float-${Math.random().toString(36).substring(7)} 6s ease-in-out infinite`
    })
  }
  