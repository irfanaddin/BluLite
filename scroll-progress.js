// Scroll progress indicator
document.addEventListener("DOMContentLoaded", () => {
    initScrollProgress()
  })
  
  function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement("div")
    progressBar.classList.add("scroll-progress")
  
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #0066cc, #3498db);
      z-index: 1001;
      transition: width 0.1s;
    `
  
    document.body.appendChild(progressBar)
  
    // Update progress on scroll
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / scrollHeight) * 100
  
      progressBar.style.width = scrollPercentage + "%"
  
      // Add glow effect when scrolling
      progressBar.style.boxShadow = "0 0 10px rgba(0, 102, 204, 0.7)"
  
      // Remove glow after scrolling stops
      clearTimeout(window.scrollTimeout)
      window.scrollTimeout = setTimeout(() => {
        progressBar.style.boxShadow = "none"
      }, 300)
    })
  }
  