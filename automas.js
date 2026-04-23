// Enhanced dropdown functionality
const dropdowns = document.querySelectorAll('.dropdown');
const searchBox = document.querySelector('.search-box');
const articles = document.querySelectorAll('article');
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Toggle dropdowns
dropdowns.forEach(drop => {
  const btn = drop.querySelector('.dropbtn');
  
  // Click toggle
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAllDropdowns();
    drop.classList.toggle('open');
  });
});

// Close dropdowns on outside click
document.addEventListener('click', closeAllDropdowns);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllDropdowns();
  }
});

function closeAllDropdowns() {
  dropdowns.forEach(d => d.classList.remove('open'));
}

// Functional search
searchBox.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  
  // Filter sidebar links
  sidebarLinks.forEach(link => {
    const text = link.textContent.toLowerCase();
    link.style.display = text.includes(query) || !query ? '' : 'none';
  });
  
  // Filter articles
  articles.forEach(article => {
    const text = article.textContent.toLowerCase();
    const isVisible = text.includes(query) || !query;
    article.style.display = isVisible ? '' : 'none';
    if (isVisible) {
      article.style.animation = 'none';
      article.offsetHeight; // Trigger reflow
      article.style.animation = 'fadeIn 0.3s ease-out';
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Make articles expandable
document.querySelectorAll('.read-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const article = this.closest('article');
    const content = article.querySelector('p');
    
    if (content.style.maxHeight) {
      // Collapse
      content.style.maxHeight = null;
      content.style.overflow = null;
      this.textContent = this.dataset.originalText || 'Read More →';
    } else {
      // Expand
      const originalText = this.textContent;
      this.dataset.originalText = originalText;
      this.textContent = 'Show Less ↑';
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.3s ease';
    }
  });
});

// Focus management for accessibility
document.querySelectorAll('.dropbtn, .read-btn, .search-box, .sidebar a').forEach(el => {
  el.addEventListener('focus', () => {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease-out';
    }
  });
}, { threshold: 0.1 });

articles.forEach(article => observer.observe(article));

// Keyboard navigation for dropdowns
dropdowns.forEach(drop => {
  const links = drop.querySelectorAll('a');
  const btn = drop.querySelector('.dropbtn');
  
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      drop.classList.add('open');
      links[0].focus();
    }
  });
  
  links.forEach((link, index) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        drop.classList.remove('open');
        btn.focus();
      } else if (e.key === 'ArrowUp' && index === 0) {
        drop.classList.remove('open');
        btn.focus();
      }
    });
  });
});

// Active Sidebar Link Highlighter
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      sidebarLinks.forEach(link => {
        // Matches hash in link (#id) to the article ID
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isActive);
      });
    }
  });
}, { rootMargin: '-20% 0px -60% 0px' }); // Triggers when article is near top of viewport

articles.forEach(article => {
  if (article.id) sectionObserver.observe(article);
});

// Dynamic Back to Top Button
const toTopBtn = document.createElement('button');
toTopBtn.className = 'back-to-top';
toTopBtn.innerHTML = '&#8679;'; // Up arrow
toTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(toTopBtn);

window.addEventListener('scroll', () => {
  toTopBtn.classList.toggle('visible', window.scrollY > 500);
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Dark/Light Mode Toggle
const navLinks = document.querySelector('.nav-links');
if (navLinks) {
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
  
  // Icons
  const sunIcon = '☀️';
  const moonIcon = '🌙';
  
  // Check saved preference
  const savedTheme = localStorage.getItem('automas-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeBtn.textContent = moonIcon;
  } else {
    themeBtn.textContent = sunIcon;
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    themeBtn.textContent = isLight ? moonIcon : sunIcon;
    localStorage.setItem('automas-theme', isLight ? 'light' : 'dark');
  });

  navLinks.appendChild(themeBtn);
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const btn = contactForm.querySelector('button');
    
    let isValid = true;
    
    // Simple Validation
    if (name.value.trim() === '') {
      name.style.borderColor = '#ff5252';
      isValid = false;
    } else {
      name.style.borderColor = '';
    }

    if (!email.value.includes('@') || !email.value.includes('.')) {
      email.style.borderColor = '#ff5252';
      isValid = false;
    } else {
      email.style.borderColor = '';
    }

    if (isValid) {
      btn.classList.add('loading');
      btn.disabled = true;
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.textContent = 'Message Sent!';
        contactForm.reset();
        setTimeout(() => { 
          btn.disabled = false; 
          btn.textContent = 'Send Message'; 
        }, 2000);
      }, 1500);
    }
  });
}
