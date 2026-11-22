/**
 * Animations Module
 * IntersectionObserver scroll reveal, SVG route animations, and journey progress.
 */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll-triggered Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced motion or no observer support, show all immediately
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 2. Journey Experience Step Highlighting & Line Progress
  const journeyWrapper = document.querySelector('.journey-timeline-wrapper');
  const journeyProgressBar = document.querySelector('.journey-connecting-progress');
  const journeySteps = document.querySelectorAll('.journey-step-card');

  if (journeyWrapper && journeyProgressBar && !prefersReducedMotion) {
    const handleJourneyScroll = () => {
      const rect = journeyWrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75 && rect.bottom > 0) {
        // Calculate progress ratio
        const totalDistance = windowHeight * 0.5 + rect.height;
        const currentDistance = windowHeight * 0.75 - rect.top;
        const ratio = Math.min(Math.max(currentDistance / totalDistance, 0.1), 1);
        
        journeyProgressBar.style.width = `${ratio * 100}%`;

        // Highlight steps progressively
        journeySteps.forEach((step, index) => {
          const stepRatio = (index + 0.5) / journeySteps.length;
          if (ratio >= stepRatio) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', handleJourneyScroll, { passive: true });
    handleJourneyScroll();
  } else if (journeySteps.length) {
    journeySteps.forEach(s => s.classList.add('active'));
    if (journeyProgressBar) journeyProgressBar.style.width = '100%';
  }

  // 3. Subtle Parallax for Hero Graphic
  const heroImage = document.querySelector('.hero-image-frame');
  if (heroImage && !prefersReducedMotion && window.innerWidth > 992) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      heroImage.style.transform = `perspective(1000px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg) translateZ(0)`;
    }, { passive: true });
  }
});
