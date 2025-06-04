// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
}

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Testimonials Slider
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current testimonial and activate corresponding dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;

    if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    }

    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1;
    showTestimonial(currentTestimonialIndex);
}

// Auto-advance testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateForm(data)) {
        return;
    }

    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = `
        <svg class="btn-icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Enviando...
    `;
    submitButton.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        event.target.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Brazilian phone number validation (basic)
    const phoneRegex = /^($$?\d{2}$$?\s?)?(\d{4,5}[-\s]?\d{4})$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
        field.style.borderColor = '#e53e3e';

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e53e3e';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }
}

function clearErrorMessages() {
    // Reset field borders
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '';
    });

    // Remove error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.remove();
    });
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: #f0fff4;
            border: 1px solid #9ae6b4;
            color: #276749;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        ">
            <svg style="width: 20px; height: 20px; color: #38a169;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
            </svg>
            <div>
                <strong>Mensagem enviada com sucesso!</strong><br>
                Entrarei em contato em até 24 horas para agendarmos sua consulta.
            </div>
        </div>
    `;

    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form);

    // Remove success message after 8 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 8000);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Phone number formatting (Brazilian format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 6) {
                value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
            } else if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }

        e.target.value = value;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.specialty-card, .step, .feature-card, .contact-method, .testimonial-card'
    );
    animatedElements.forEach(el => observer.observe(el));
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Arrow keys for testimonial navigation
    if (e.key === 'ArrowLeft') {
        changeTestimonial(-1);
    } else if (e.key === 'ArrowRight') {
        changeTestimonial(1);
    }
});

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

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

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show first testimonial
    showTestimonial(0);

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--therapy-accent)';
            element.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
});