// Custom cursor effect for a futuristic feel
document.addEventListener("DOMContentLoaded", () => {
    initCustomCursor()
  })
  
  function initCustomCursor() {
    // Create cursor elements
    const cursorOuter = document.createElement("div")
    const cursorInner = document.createElement("div")
  
    cursorOuter.classList.add("cursor-outer")
    cursorInner.classList.add("cursor-inner")
  
    // Style the cursors
    cursorOuter.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(0, 102, 204, 0.5);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, transform 0.1s;
      z-index: 9999;
      mix-blend-mode: difference;
    `
  
    cursorInner.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background-color: rgba(0, 102, 204, 0.8);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s;
      z-index: 9999;
      mix-blend-mode: difference;
    `
  
    // Add cursors to the DOM
    document.body.appendChild(cursorOuter)
    document.body.appendChild(cursorInner)
  
    // Track mouse movement
    document.addEventListener("mousemove", (e) => {
      cursorInner.style.left = e.clientX + "px"
      cursorInner.style.top = e.clientY + "px"
  
      // Add slight delay to outer cursor for effect
      setTimeout(() => {
        cursorOuter.style.left = e.clientX + "px"
        cursorOuter.style.top = e.clientY + "px"
      }, 50)
    })
  
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .service-card, .pricing-card, .feature-card, input, textarea",
    )
  
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursorOuter.style.width = "60px"
        cursorOuter.style.height = "60px"
        cursorOuter.style.borderColor = "rgba(0, 102, 204, 0.8)"
        cursorInner.style.width = "12px"
        cursorInner.style.height = "12px"
      })
  
      element.addEventListener("mouseleave", () => {
        cursorOuter.style.width = "40px"
        cursorOuter.style.height = "40px"
        cursorOuter.style.borderColor = "rgba(0, 102, 204, 0.5)"
        cursorInner.style.width = "8px"
        cursorInner.style.height = "8px"
      })
    })
  
    // Hide default cursor
    document.body.style.cursor = "none"
  
    // Add option to disable custom cursor for accessibility
    const style = document.createElement("style")
    style.textContent = `
      @media (prefers-reduced-motion: reduce) {
        .cursor-outer, .cursor-inner {
          display: none !important;
        }
        body {
          cursor: auto !important;
        }
      }
    `
    document.head.appendChild(style)
  
    // Add toggle button in footer
    const footerBottom = document.querySelector(".footer-bottom")
    if (footerBottom) {
      const toggleButton = document.createElement("button")
      toggleButton.textContent = "Toggle Custom Cursor"
      toggleButton.style.cssText = `
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.7);
        padding: 5px 10px;
        border-radius: 4px;
        margin-top: 10px;
        cursor: pointer;
        font-size: 0.8rem;
      `
  
      toggleButton.addEventListener("click", () => {
        if (cursorOuter.style.display === "none") {
          cursorOuter.style.display = "block"
          cursorInner.style.display = "block"
          document.body.style.cursor = "none"
        } else {
          cursorOuter.style.display = "none"
          cursorInner.style.display = "none"
          document.body.style.cursor = "auto"
        }
      })
  
      footerBottom.appendChild(toggleButton)
    }
  }
  