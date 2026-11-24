document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic footer year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile hamburger menu toggle
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (primaryNav.classList.contains("is-open")) {
          primaryNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // 3. Active navigation highlight on scroll
  const sections = document.querySelectorAll("main section[id]");
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (matchingLink) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((l) => l.classList.remove("active"));
          matchingLink.classList.add("active");
        }
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // 4. Copy email button
  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email");
      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = "Copied";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      } catch {
        copyBtn.textContent = "Select to copy";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }
    });
  }
});
