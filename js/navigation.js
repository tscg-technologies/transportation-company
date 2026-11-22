/**
 * Navigation Module
 * Handles sticky navbar scroll state, mobile menu drawer, and active links.
 */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.nav-link');

  // 1. Sticky Navigation Scroll Effect
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on load

  // 2. Mobile Drawer Open / Close
  const openMenu = () => {
    if (!mobileDrawer || !toggleBtn) return;
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    if (!mobileDrawer || !toggleBtn) return;
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // 3. Active Page Link Detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const markActive = (links) => {
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkFile = href.split('/').pop();
      if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  markActive(desktopLinks);
  markActive(mobileLinks);
});
