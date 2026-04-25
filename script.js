/* ========================================
   AWS & GitHub Learning Hub - JavaScript
   ======================================== */

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ===== Smooth Scroll Enhancement =====
// Note: Modern browsers support scroll-behavior: smooth in CSS
// This is a fallback for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Highlighting =====
function highlightActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            link.style.fontWeight = '700';
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightActiveNavLink);

// ===== Intersection Observer for Fade-in Animation =====
function initFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to cards and sections
    const animationElements = document.querySelectorAll(
        '.card, .concept-box, .service-card, .path-card, .step-item, ' +
        '.resource-card, .tool-item, .creator-card, .book-card, .tip, ' +
        '.feature-card, .reason, .audience-item, .requirement, .step'
    );

    animationElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', initFadeInAnimation);

// ===== Form Enhancement (if forms are added) =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Show success message
    const form = e.target;
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.textContent = 'Thank you! Your message has been sent.';
    successMsg.style.cssText = `
        background-color: #28a745;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
    `;
    
    form.appendChild(successMsg);
    form.reset();
    
    // Remove message after 3 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// Attach to any forms on the page
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// ===== Scroll-to-Top Button =====
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollToTopBtn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Go to top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #FF9900;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show button when scrolled down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', initScrollToTop);

// ===== Code Copy Feature =====
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.command-block');
    
    codeBlocks.forEach(block => {
        const codeElements = block.querySelectorAll('code');
        if (codeElements.length > 0) {
            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy';
            copyBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: #61dafb;
                color: #282c34;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 600;
                transition: background-color 0.3s ease;
            `;
            
            copyBtn.addEventListener('mouseover', () => {
                copyBtn.style.backgroundColor = '#4db8d8';
            });
            
            copyBtn.addEventListener('mouseout', () => {
                copyBtn.style.backgroundColor = '#61dafb';
            });
            
            copyBtn.addEventListener('click', () => {
                const text = Array.from(codeElements)
                    .map(el => el.textContent)
                    .join('\n');
                
                navigator.clipboard.writeText(text).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 2000);
                });
            });
            
            block.style.position = 'relative';
            block.appendChild(copyBtn);
        }
    });
}

document.addEventListener('DOMContentLoaded', initCodeCopy);

// ===== Performance: Lazy Loading Images =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        if (menuToggle && navMenu) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    // Skip to main content (for accessibility)
    if (e.key === 's' && e.ctrlKey) {
        const mainContent = document.querySelector('main') || document.querySelector('.content-section');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ===== Utility: Log on load for debugging =====
console.log('AWS & GitHub Learning Hub - Ready!');
console.log('Mobile Menu: Click the menu button to toggle navigation');
