document.addEventListener("DOMContentLoaded", () => {
  // === Mobile Menu Toggle ===
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      const spans = this.querySelectorAll("span");
      spans.forEach((span) => span.classList.toggle("active"));

      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    });
  }

  // === Close Mobile Menu on Outside Click ===
  document.addEventListener("click", (event) => {
    if (navLinks && navLinks.classList.contains("active") && !event.target.closest("nav")) {
      navLinks.classList.remove("active");
      document.body.style.overflow = "";

      const spans = mobileMenuBtn.querySelectorAll("span");
      spans.forEach((span) => span.classList.remove("active"));
    }
  });

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          document.body.style.overflow = "";

          const spans = mobileMenuBtn.querySelectorAll("span");
          spans.forEach((span) => span.classList.remove("active"));
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // === Contact Form Basic Validation (Allow Actual Submission) ===
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      const requiredFields = contactForm.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("error");
          isValid = false;
        } else {
          field.classList.remove("error");
        }
      });

      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          emailField.classList.add("error");
          isValid = false;
        } else {
          emailField.classList.remove("error");
        }
      }

      if (!isValid) {
        e.preventDefault(); // Prevent form submission only if invalid
      }
    });
  }
});
