// Initialize EmailJS - NEW METHOD
(function() {
    emailjs.init("oprs5AFEGce91v8NP");
})();

// Customization functions (for deepsite integration)
window.portfolioCustomizer = {
    setProfileImage: function(imageUrl) {
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
            profileImage.src = imageUrl;
        }
    },
    setName: function(name) {
        const nameElement = document.querySelector('h2');
        if (nameElement) {
            nameElement.textContent = name;
        }
    },
    setTitle: function(title) {
        const titleElement = document.querySelector('.text-theme-sub');
        if (titleElement) {
            titleElement.textContent = title;
        }
    },
    setSubtitle: function(subtitle) {
        const subtitleElement = document.querySelector('.text-theme-muted.text-lg');
        if (subtitleElement) {
            subtitleElement.textContent = subtitle;
        }
    },
    setPortfolioTitle: function(title) {
        const portfolioTitle = document.querySelector('h1');
        if (portfolioTitle) {
            portfolioTitle.textContent = title;
        }
    },
    addNavItem: function(text, href) {
        const nav = document.querySelector('nav');
        if (nav) {
            const link = document.createElement('a');
            link.href = href;
            link.textContent = text;
            link.className = 'nav-link text-theme-accent text-lg font-semibold';
            nav.appendChild(link);
        }
    },
    setThemeColor: function(color) {
        document.documentElement.style.setProperty('--theme-accent', color);
    }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');

    // Download CV functionality
    const downloadCVBtn = document.getElementById('downloadCV');
    
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function() {
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = '/assets/flutter_cv.pdf'; 
            link.download = 'Villanueva_CV.pdf';
            link.target = '_blank';
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Show success message
            const originalText = downloadCVBtn.innerHTML;
            downloadCVBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Downloaded!</span>
            `;
            
            setTimeout(() => {
                downloadCVBtn.innerHTML = originalText;
            }, 2000);
        });
    }
    
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    if (mobileMenuBtn && mobileMenu && closeMenu) {
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking on a navigation link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside the menu content
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when pressing escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Tech icon hover effects
    document.querySelectorAll('.tech-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(11, 18, 34, 0.97)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
            }
        }
    });
    
       
        // Contact form handler - USING sendForm method
        const contactForm = document.querySelector('#contactForm');
        console.log('Contact form found:', contactForm);

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted');
                
                // Get form data
                const formData = new FormData(contactForm);
                const templateParams = {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    message: formData.get('message')
                };
                
                console.log('Sending data:', templateParams); // Debug log
                
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Using send method with template parameters
                emailjs.send('service_k8ztpfa', 'template_vu31f5c', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        alert('Message sent successfully!');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('EmailJS error:', error);
                        alert('Failed to send message. Please try again.');
                    })
                    .finally(function() {
                        // Reset button state
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    });
            });
        }
        // REPLACED: New, more advanced scroll animation logic
    const sections = document.querySelectorAll('.fade-in-element');
    let activeSection = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When a section becomes visible for the first time, mark it.
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }

            // Find the entry that is most visible in the viewport
            const mostVisible = entries.reduce((prev, current) => {
                return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
            });

            // If there's a new most-visible section, update the active state
            if (mostVisible.isIntersecting && mostVisible.target !== activeSection) {
                // Remove active class from the old section
                if (activeSection) {
                    activeSection.classList.remove('is-active');
                }
                // Add active class to the new section
                activeSection = mostVisible.target;
                activeSection.classList.add('is-active');
            }
        });
    }, {
        // Trigger when a section is 50% or 75% visible
        threshold: [0.5, 0.75]
    });

    // Observe all sections
    sections.forEach(section => observer.observe(section));
// Initialize Swiper for Agrolens
const agrolensSwiper = new Swiper('.agrolensSwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.agrolensSwiper .swiper-pagination',
        clickable: true,
    },
});

// Initialize Swiper for Vehicall
const vehicallSwiper = new Swiper('.vehicallSwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.vehicallSwiper .swiper-pagination',
        clickable: true,
    },
});
});
   