const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
// scripts/skills.js — animate segmented neon progress bars on scroll
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.skill-card');

  if (!('IntersectionObserver' in window)) {
    // Fallback: immediately fill all bars
    cards.forEach(card => fillBar(card));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fillBar(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.4
    }
  );

  cards.forEach(card => observer.observe(card));
});

function fillBar(card) {
  const fill = card.querySelector('.skill-progress-fill');
  const label = card.querySelector('.skill-progress-label');
  const target = parseInt(fill.getAttribute('data-target'), 10) || 0;

  // Animate width via CSS transition
  requestAnimationFrame(() => {
    fill.style.width = target + '%';
  });

  // Optional: numeric count-up for label
  let current = 0;
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    current = Math.round(progress * target);
    label.textContent = current + '%';
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
// scripts/projects.js — IntersectionObserver "Upside-Down" entry
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card.observed');

  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.35
    }
  );

  cards.forEach(card => observer.observe(card));
});
// scripts/education.js — animated energy path + node activation
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.timeline-node.observed');
  const lineFill = document.querySelector('.timeline-line-fill');

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(node => node.classList.add('in-view'));
    if (lineFill) lineFill.style.height = '100%';
    return;
  }

  const nodeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          nodeObserver.unobserve(entry.target);
          growLineToNode(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.4
    }
  );

  nodes.forEach(node => nodeObserver.observe(node));

  function growLineToNode(node) {
    if (!lineFill) return;
    const timelineRect = document
      .getElementById('timeline')
      .getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const offset = nodeRect.top - timelineRect.top + nodeRect.height * 0.3;
    const height = Math.max(offset, parseFloat(lineFill.style.height || 0));
    lineFill.style.height = height + 'px';
  }
});
