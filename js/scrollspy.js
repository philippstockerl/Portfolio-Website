// Spotlight effect (keep your nice cursor glow)
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", `${e.clientX}px`);
  document.body.style.setProperty("--y", `${e.clientY}px`);
});

// Sidebar highlighting with IntersectionObserver
export function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".content-sidebar a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.content-sidebar a[href="#${id}"]`);
        if (entry.isIntersecting && link) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // active when near middle 20% of screen
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// Auto-highlight content boxes with IntersectionObserver
export function initBoxSpy() {
  const boxes = Array.from(document.querySelectorAll(".experience-carousel-track .experience-box"));
  const wrap = document.querySelector(".experience-carousel-wrap");
  if (!boxes.length || !wrap) return;

  const updateActive = () => {
    const wrapRect = wrap.getBoundingClientRect();
    const centerX = wrapRect.left + wrapRect.width / 2;
    let bestBox = null;
    let bestDist = Infinity;
    boxes.forEach((box) => {
      const rect = box.getBoundingClientRect();
      const boxCenter = rect.left + rect.width / 2;
      const dist = Math.abs(boxCenter - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        bestBox = box;
      }
    });
    if (!bestBox) return;
    boxes.forEach((b) => b.classList.toggle("active", b === bestBox));
  };

  const observer = new IntersectionObserver(updateActive, {
    root: wrap,
    rootMargin: "0px -40% 0px -40%",
    threshold: 0,
  });

  boxes.forEach((box) => observer.observe(box));
  window.addEventListener("resize", updateActive, { passive: true });
  updateActive();
}
