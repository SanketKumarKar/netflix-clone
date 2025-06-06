// Netflix Clone - Enhanced JavaScript Functionality

// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      // Remove loading screen from DOM after animation
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 1500); // Show loading screen for 1.5 seconds minimum
  }
});

// Enhanced Performance: Preload critical images
const preloadImages = [
  'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920&h=1080&fit=crop',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// Navbar scroll behavior
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbarNav = document.getElementById('navbarNav');

if (mobileMenuBtn && navbarNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navbarNav.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navbarNav.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      navbarNav.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    }
  });
}

// Search functionality
const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');
const searchContainer = document.querySelector('.search-container');

if (searchIcon && searchInput && searchContainer) {
  searchIcon.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
    if (searchContainer.classList.contains('active')) {
      searchInput.focus();
    } else {
      searchInput.blur();
      searchInput.value = '';
    }
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
      searchInput.value = '';
    }
  });

  // Handle search input
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
      // Here you could implement actual search functionality
      console.log('Searching for:', query);
    }
  });
}

// Profile dropdown toggle
const profileMenu = document.querySelector('.profile-menu');
const profileIcon = document.querySelector('.profile-icon');
const profileDropdown = document.querySelector('.profile-dropdown');

if (profileMenu && profileIcon && profileDropdown) {
  profileIcon.addEventListener('click', (e) => {
    e.preventDefault();
    profileMenu.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!profileMenu.contains(e.target)) {
      profileMenu.classList.remove('active');
    }
  });
}

// Video Preview Modal
const videoModal = document.getElementById('videoModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const previewVideo = document.getElementById('previewVideo');

function openVideoModal(title, description, videoSrc = '') {
  if (videoModal) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Set video source if provided
    if (videoSrc && previewVideo) {
      previewVideo.src = videoSrc;
    }
    
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  if (videoModal) {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Pause video if playing
    if (previewVideo) {
      previewVideo.pause();
      previewVideo.currentTime = 0;
    }
  }
}

// Modal event listeners
if (modalClose) {
  modalClose.addEventListener('click', closeVideoModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', closeVideoModal);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
    closeVideoModal();
  }
});

// Enhanced Content Cards with Modal Integration
const contentCards = document.querySelectorAll('.content-card');
contentCards.forEach((card) => {
  // Enhanced hover effect with better performance
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.05) translateZ(0)';
    card.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1) translateZ(0)';
    card.style.zIndex = '1';
  });

  // Click handling for content cards - Open modal
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const img = card.querySelector('img');
    const title = img?.getAttribute('alt') || 'Unknown Title';
    const description = `Experience the ${title} like never before. Join millions of viewers in this thrilling adventure that will keep you on the edge of your seat.`;
    
    openVideoModal(title, description);
  });
});

// Enhanced Play buttons functionality
const playBtns = document.querySelectorAll('.btn-play');
playBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const title = btn.closest('.hero-content')?.querySelector('.hero-title')?.textContent || 
                  btn.closest('.modal-info')?.querySelector('.modal-title')?.textContent ||
                  btn.closest('.content-card')?.querySelector('img')?.getAttribute('alt') || 
                  'Unknown Title';
    
    // Simulate video playing
    console.log('Playing:', title);
    
    // If in modal, start the video
    if (btn.closest('.modal-info') && previewVideo) {
      previewVideo.play();
    } else {
      // Open modal for content cards
      const description = `Watch ${title} now. Experience the story that has captivated audiences worldwide.`;
      openVideoModal(title, description);
    }
  });
});

// Enhanced Info buttons functionality
const infoBtns = document.querySelectorAll('.btn-info');
infoBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const title = btn.closest('.hero-content')?.querySelector('.hero-title')?.textContent || 
                  btn.closest('.content-card')?.querySelector('img')?.getAttribute('alt') || 
                  'Unknown Title';
    
    const description = `Get more information about ${title}. Discover cast, crew, ratings, and detailed plot information.`;
    openVideoModal(title, description);
  });
});

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// My List functionality with notifications
const myListBtns = document.querySelectorAll('.btn-my-list');
myListBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const icon = btn.querySelector('i');
    const isAdded = btn.classList.contains('added');
    const title = btn.closest('.content-card')?.querySelector('img')?.getAttribute('alt') ||
                  btn.closest('.hero-content')?.querySelector('.hero-title')?.textContent ||
                  btn.closest('.modal-info')?.querySelector('.modal-title')?.textContent ||
                  'Item';
    
    if (isAdded) {
      btn.classList.remove('added');
      icon.className = 'fas fa-plus';
      btn.setAttribute('aria-label', 'Add to My List');
      showNotification(`Removed "${title}" from My List`, 'info');
    } else {
      btn.classList.add('added');
      icon.className = 'fas fa-check';
      btn.setAttribute('aria-label', 'Remove from My List');
      showNotification(`Added "${title}" to My List`, 'success');
    }
  });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Lazy loading for images
const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    }
  });
}, observerOptions);

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach((img) => {
  imageObserver.observe(img);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Escape key to close dropdowns and search
  if (e.key === 'Escape') {
    // Close mobile menu
    if (mobileMenuBtn?.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      navbarNav?.classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Close search
    if (searchContainer?.classList.contains('active')) {
      searchContainer.classList.remove('active');
      searchInput.value = '';
    }
    
    // Close profile dropdown
    if (profileMenu?.classList.contains('active')) {
      profileMenu.classList.remove('active');
    }
    
    // Close video modal
    if (videoModal?.classList.contains('active')) {
      closeVideoModal();
    }
  }
});

// Performance optimization: Throttle scroll events
let ticking = false;
function updateScrollBehavior() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollBehavior);
    ticking = true;
  }
});

// Initialize tooltips and accessibility features
document.addEventListener('DOMContentLoaded', () => {
  // Add focus indicators for keyboard navigation
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((element) => {
    element.addEventListener('focus', () => {
      element.classList.add('keyboard-focus');
    });
    
    element.addEventListener('blur', () => {
      element.classList.remove('keyboard-focus');
    });
  });
  
  // Set up ARIA labels for better accessibility
  const playButtons = document.querySelectorAll('.btn-play');
  playButtons.forEach((btn) => {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', 'Play video');
    }
  });
  
  const infoButtons = document.querySelectorAll('.btn-info');
  infoButtons.forEach((btn) => {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', 'More information');
    }
  });
});
