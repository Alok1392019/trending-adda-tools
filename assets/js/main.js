/**
 * TRENDING ADDA TOOLS - CORE CLIENT LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initHoverEffects();
  initFAQ();
  initNewsletter();
  initShareButtons();
  initCopyButtons();
});

/**
 * Theme Manager (Dark/Light Mode)
 */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.body.classList.add('light-theme');
  }

  // Toggle Theme Click Event
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    showToast(`Switched to ${currentTheme} mode!`, 'info');
  });
}

/**
 * Sticky Header Scroll & Mobile Hamburger Navigation
 */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Change header styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      // Hamburger lines rotation
      const spans = hamburger.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
}

/**
 * Premium 3D Light trail card cursor lighting tracking
 */
function initHoverEffects() {
  const cards = document.querySelectorAll('.tool-card, .glass-panel');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
}

/**
 * Schema-friendly FAQ Accordions
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQs first
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Newsletter Validation & Success toast
 */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (!input || !input.value) return;

      const email = input.value.trim();
      if (validateEmail(email)) {
        showToast('Successfully subscribed to our newsletter!', 'success');
        input.value = '';
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Copy to Clipboard Functionality
 */
function initCopyButtons() {
  // Select all copy-btn inside outputs
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
      const targetId = e.target.getAttribute('data-target');
      let textToCopy = '';
      
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          textToCopy = targetEl.value || targetEl.innerText;
        }
      } else {
        // Fallback to output element in the same container
        const outputBox = e.target.closest('.tool-output-box');
        if (outputBox) {
          const content = outputBox.querySelector('.tool-output-content');
          if (content) textToCopy = content.innerText;
        }
      }
      
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            const originalText = e.target.innerText;
            e.target.innerText = 'Copied!';
            e.target.style.backgroundColor = '#10b981';
            showToast('Copied to clipboard!', 'success');
            
            setTimeout(() => {
              e.target.innerText = originalText;
              e.target.style.backgroundColor = '';
            }, 2000);
          })
          .catch(err => {
            showToast('Failed to copy text.', 'error');
            console.error('Error copying text: ', err);
          });
      }
    }
  });
}

/**
 * Share Social Media Trigger Buttons
 */
function initShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  if (shareButtons.length === 0) return;

  const currentUrl = encodeURIComponent(window.location.href);
  const currentTitle = encodeURIComponent(document.title);

  shareButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let shareUrl = '';
      if (btn.classList.contains('share-facebook')) {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
      } else if (btn.classList.contains('share-twitter')) {
        shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`;
      } else if (btn.classList.contains('share-whatsapp')) {
        shareUrl = `https://api.whatsapp.com/send?text=${currentTitle}%20${currentUrl}`;
      } else if (btn.classList.contains('share-linkedin')) {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

/**
 * Central Toast Notification System
 * @param {string} msg 
 * @param {string} type ('success', 'error', 'info')
 */
function showToast(msg, type = 'info') {
  // Remove existing toast if it exists
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create Toast element
  const toast = document.createElement('div');
  toast.className = `toast`;
  
  // Custom icons based on toast level
  let icon = 'ℹ️';
  if (type === 'success') {
    icon = '✅';
    toast.style.borderLeftColor = '#10b981'; // Green
  } else if (type === 'error') {
    icon = '❌';
    toast.style.borderLeftColor = '#ef4444'; // Red
  } else if (type === 'info') {
    icon = '🔔';
    toast.style.borderLeftColor = '#3b82f6'; // Blue
  }

  toast.innerHTML = `<span style="font-size: 1.25rem;">${icon}</span><span>${msg}</span>`;
  document.body.appendChild(toast);

  // Trigger browser animation reflow
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
