document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Countdown timer
    function updateCountdown() {
        const eventDate = new Date('2025-06-27T09:00:00-05:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-timer').innerHTML = '<div class="event-started">¡El evento ha comenzado!</div>';
        }
    }
    
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    
    // Modal functionality
    const contactModal = document.getElementById('contactModal');
    const successModal = document.getElementById('successModal');
    const openFormBtn = document.querySelector('.open-form');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const closeSuccessBtn = document.querySelector('.close-success');
    const contactForm = document.getElementById('contactForm');
    
    openFormBtn.addEventListener('click', () => {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            contactModal.style.display = 'none';
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically send the form data to your backend or Firebase
        // For this example, we'll just show the success modal
        
        // Simulate form submission
        setTimeout(() => {
            contactModal.style.display = 'none';
            successModal.style.display = 'block';
            contactForm.reset();
        }, 1000);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to sections on scroll
    function checkScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.setAttribute('data-animate', 'fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on page load
});