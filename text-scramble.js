// Text scramble effect for headings
document.addEventListener("DOMContentLoaded", () => {
    initTextScramble()
  })
  
  function initTextScramble() {
    // Apply to main headings
    const headings = document.querySelectorAll("h1, .hero-content h1, .page-header h1")
  
    class TextScramble {
      constructor(el) {
        this.el = el
        this.chars = "!<>-_\\/[]{}—=+*^?#________"
        this.update = this.update.bind(this)
      }
  
      setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => (this.resolve = resolve))
        this.queue = []
  
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || ""
          const to = newText[i] || ""
          const start = Math.floor(Math.random() * 40)
          const end = start + Math.floor(Math.random() * 40)
          this.queue.push({ from, to, start, end })
        }
  
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
      }
  
      update() {
        let output = ""
        let complete = 0
  
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i]
  
          if (this.frame >= end) {
            complete++
            output += to
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar()
              this.queue[i].char = char
            }
            output += `<span class="scramble-char" style="color: var(--primary-color);">${char}</span>`
          } else {
            output += from
          }
        }
  
        this.el.innerHTML = output
  
        if (complete === this.queue.length) {
          this.resolve()
        } else {
          this.frameRequest = requestAnimationFrame(this.update)
          this.frame++
        }
      }
  
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
      }
    }
  
    // Apply to each heading when it comes into view
    headings.forEach((heading) => {
      const originalText = heading.innerText
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const fx = new TextScramble(heading)
              fx.setText(originalText)
              observer.unobserve(heading)
            }
          })
        },
        { threshold: 0.5 },
      )
  
      observer.observe(heading)
    })
  }
  