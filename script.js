// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    createParticles();
    initializeTypewriter();
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
    initializeSkillBars();
    initializeMobileMenu();
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Random size variation
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Typewriter effect
function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        'AI Operations Assistant',
        'Technical Support Specialist',
        'AI Trainer & Evaluator',
        'Automation Expert',
        'Data Workflow Optimizer'
    ];
    
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeSpeed = 100;
        }
        
        // If word is complete
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Handle scroll effects on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'transparent';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle hamburger to X
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const icon = mobileMenuBtn.querySelector('i');
    
    mobileMenu.classList.add('hidden');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

// Initialize scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in and timeline-item classes
    const animatedElements = document.querySelectorAll('.fade-in, .timeline-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 500);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form functionality with direct email sending
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Multiple email service endpoints for reliability
        const emailServices = [
            {
                name: 'FormSubmit',
                url: 'https://formsubmit.co/jaypeeconsuelo@gmail.com',
                prepare: () => {
                    const formData = new FormData();
                    formData.append('name', name);
                    formData.append('email', email);
                    formData.append('subject', `Portfolio Contact: ${subject}`);
                    formData.append('message', `From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`);
                    formData.append('_next', window.location.href);
                    formData.append('_captcha', 'false');
                    formData.append('_template', 'table');
                    return { body: formData, headers: {} };
                }
            },
            {
                name: 'Netlify',
                url: 'https://submit-form.app/portfolio-contact',
                prepare: () => {
                    return {
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            subject: `Portfolio Contact: ${subject}`,
                            message: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
                            _to: 'jaypeeconsuelo@gmail.com'
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                }
            },
            {
                name: 'Getform',
                url: 'https://getform.io/f/bpjjyqkb',
                prepare: () => {
                    const formData = new FormData();
                    formData.append('name', name);
                    formData.append('email', email);
                    formData.append('subject', `Portfolio Contact: ${subject}`);
                    formData.append('message', `From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`);
                    return { body: formData, headers: {} };
                }
            }
        ];
        
        // Try each service sequentially
        async function tryEmailServices() {
            for (let i = 0; i < emailServices.length; i++) {
                const service = emailServices[i];
                try {
                    const { body, headers } = service.prepare();
                    const response = await fetch(service.url, {
                        method: 'POST',
                        body: body,
                        headers: headers
                    });
                    
                    if (response.ok) {
                        showNotification('Message sent successfully! I will get back to you soon.', 'success');
                        contactForm.reset();
                        return true;
                    }
                } catch (error) {
                    console.log(`${service.name} failed:`, error);
                    continue;
                }
            }
            return false;
        }
        
        // Execute email sending
        tryEmailServices()
            .then(success => {
                if (!success) {
                    showNotification('Unable to send message right now. Please try again in a few moments.', 'error');
                }
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(`notification-${type}`);
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        minWidth: '300px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    });
    
    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type];
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recreate particles on resize to maintain proper distribution
    if (window.innerWidth !== this.lastWidth) {
        this.lastWidth = window.innerWidth;
        
        const particlesContainer = document.getElementById('particles');
        particlesContainer.innerHTML = '';
        createParticles();
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Navigate sections with arrow keys (when not in input fields)
    if (!document.activeElement.matches('input, textarea')) {
        const sections = ['home', 'about', 'skills', 'experience', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            scrollToSection(sections[currentIndex - 1]);
        }
    }
});

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    for (let section of sections) {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            return section.id;
        }
    }
    return 'home';
}

// Sequential video playback for AI Operations Assistant
function initializeSequentialVideoPlayback() {
    const video1 = document.getElementById('ai-video-1');
    const video2 = document.getElementById('ai-video-2');
    
    if (video1 && video2) {
        video1.addEventListener('ended', function() {
            video1.classList.add('hidden');
            video2.classList.remove('hidden');
            video2.play();
        });
        
        video2.addEventListener('ended', function() {
            video2.classList.add('hidden');
            video1.classList.remove('hidden');
            video1.play();
        });
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Initialize sequential video playback
    initializeSequentialVideoPlayback();
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#home .fade-in');
        heroElements.forEach(element => {
            element.classList.add('animate');
        });
    }, 500);
});
