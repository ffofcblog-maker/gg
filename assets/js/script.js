// JavaScript for WM Conteúdos Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Age verification modal
    const ageModal = new bootstrap.Modal(document.getElementById('ageModal'));
    const confirmAgeBtn = document.getElementById('confirmAge');
    const denyAgeBtn = document.getElementById('denyAge');
    
    // Check if user has already verified age
    if (!localStorage.getItem('ageVerified')) {
        ageModal.show();
    }
    
    // Handle age confirmation
    confirmAgeBtn.addEventListener('click', function() {
        localStorage.setItem('ageVerified', 'true');
        ageModal.hide();
        document.body.classList.add('loading');
    });
    
    // Handle age denial
    denyAgeBtn.addEventListener('click', function() {
        alert('Este site é destinado apenas para maiores de 18 anos.');
        window.location.href = 'https://www.google.com';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .content-feature, .preview-card').forEach(el => {
        observer.observe(el);
    });
    
    // WhatsApp button click tracking
    document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]').forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track click (you can add analytics here)
            console.log('WhatsApp button clicked');
        });
    });
    
    // Price highlight animation
    const priceBox = document.querySelector('.price-box');
    if (priceBox) {
        setInterval(() => {
            priceBox.style.transform = 'scale(1.02)';
            setTimeout(() => {
                priceBox.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Image hover effects
    document.querySelectorAll('.image-card img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
    
    // Feature cards hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #fff 0%, #fff8f0 100%)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // Countdown timer (optional feature)
    function createCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;
            
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
            
            if (distance < 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "OFERTA EXPIRADA";
            }
        }, 1000);
    }
    
    // Initialize countdown if element exists
    createCountdown();
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Form validation (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Here you would typically send the form data to a server
            alert('Mensagem enviada com sucesso!');
            this.reset();
        });
    }
    
    // Mobile menu improvements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    const debouncedScroll = debounce(() => {
        // Scroll-based animations can go here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Add loading class to body for smooth transitions
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
});

// Additional CSS for animations
const additionalStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background-color: rgba(0, 0, 0, 0.95) !important;
        backdrop-filter: blur(10px);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

