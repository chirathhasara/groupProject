// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navLinks = document.getElementById('navLinks');
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  if (openMenu) {
      openMenu.addEventListener('click', function() {
          navLinks.classList.add('active');
      });
  }
  
  if (closeMenu) {
      closeMenu.addEventListener('click', function() {
          navLinks.classList.remove('active');
      });
  }

  // Image Slider Functionality
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  
  // Initialize slider
  function initSlider() {
      // Hide all slides first
      slides.forEach(slide => {
          slide.style.display = 'none';
      });
      
      // Show only the current slide
      slides[currentSlide].style.display = 'block';
      
      // Update dots
      dots.forEach((dot, index) => {
          dot.classList.remove('active');
          if (index === currentSlide) {
              dot.classList.add('active');
          }
      });
  }
  
  // Next slide function
  function nextSlide() {
      currentSlide++;
      if (currentSlide >= slides.length) {
          currentSlide = 0;
      }
      initSlider();
  }
  
  // Previous slide function
  function prevSlide() {
      currentSlide--;
      if (currentSlide < 0) {
          currentSlide = slides.length - 1;
      }
      initSlider();
  }
  
  // Set up event listeners for slider controls
  if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);
  }
  
  // Set up event listeners for dots
  dots.forEach(dot => {
      dot.addEventListener('click', function() {
          currentSlide = parseInt(this.getAttribute('data-index'));
          initSlider();
      });
  });
  
  // Automatic slide change
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause automatic slide change when hovering over slider
  const slider = document.querySelector('.slider');
  if (slider) {
      slider.addEventListener('mouseenter', function() {
          clearInterval(slideInterval);
      });
      
      slider.addEventListener('mouseleave', function() {
          slideInterval = setInterval(nextSlide, 5000);
      });
  }
  
  // Initialize slider on page load
  initSlider();

  // Scroll Animations
  function checkScroll() {
      const elements = document.querySelectorAll('.animate__animated');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  }
  
  // Set initial style for animated elements
  document.querySelectorAll('.animate__animated').forEach(element => {
      if (!element.classList.contains('animate__fadeIn')) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      }
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', checkScroll);
  
  // Initial check on page load
  checkScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href').substring(1);
          if (targetId) {
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop - 80,
                      behavior: 'smooth'
                  });
              }
          }
      });
  });
});