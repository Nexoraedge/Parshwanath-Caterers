// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Function to update AOS attributes based on screen width
function updateAOSAttributes() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        if (window.innerWidth < 480) {
            // Change fade-left to fade-right or fade-up
            if (element.getAttribute('data-aos') === 'fade-left') {
                element.setAttribute('data-aos', 'fade-right'); // Change to fade-right
            }
        } else {
            // Optionally revert back to fade-left if above 480px
            if (element.getAttribute('data-aos') === 'fade-right') {
                element.setAttribute('data-aos', 'fade-left'); // Change back to fade-left
            }
        }
    });
}

// Update AOS attributes on load and resize
window.addEventListener('load', updateAOSAttributes);
window.addEventListener('resize', updateAOSAttributes);

// Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle between menu and close icons
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth scroll for anchor links
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

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const loadImage = (image) => {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, imageOptions);

        images.forEach(img => imageObserver.observe(img));
    } else {
        images.forEach(img => loadImage(img));
    }
});

// Gallery Image Modal
const galleryItems = document.querySelectorAll('.gallery-item img');
const body = document.body;

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('image-modal');

        const modalImg = document.createElement('img');
        modalImg.src = item.src;

        modal.appendChild(modalImg);
        body.appendChild(modal);

        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic form validation
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const message = contactForm.querySelector('textarea[name="message"]');

        let isValid = true;

        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }

        if (isValid) {
            // Submit form
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Helper Functions
function showError(input, message) {
    const formControl = input.parentElement;
    const errorDiv = formControl.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    if (!formControl.querySelector('.error-message')) {
        formControl.appendChild(errorDiv);
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let currentSlide = 0;
    const testimonials = [
        {
            text: "Exceptional service and absolutely delicious food. Our wedding was perfect thanks to Parshwanath Catering!",
            author: "Rahul jain"
        },
        {
            text: "Delicious food, beautifully presented, and the staff was so attentive.  Made our event perfect!",
            author: "Rohan Sharma"
        },
        {
            text: "The food was amazing, and the service was top-notch! Our guests loved everything. Highly recommend!",
            author: "Anika Joshi"
        }
    ];

    function updateTestimonial() {
        const testimonial = testimonials[currentSlide];
        testimonialSlider.innerHTML = `
            <div class="testimonial" data-aos="fade-up">
                <p>"${testimonial.text}"</p>
                <cite>- ${testimonial.author}</cite>
            </div>
        `;
        currentSlide = (currentSlide + 1) % testimonials.length;
    }

    updateTestimonial();
    setInterval(updateTestimonial, 5000);
}
