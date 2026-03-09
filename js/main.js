// Main Interactions
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navbar Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. Sticky Navbar Background
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            header.style.padding = '0';
        }
    });

    // 3. Reveal Animations on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in').forEach(element => {
        observer.observe(element);
    });

    // 4. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Smooth Scroll for Anchor Links (Skip on # alone)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    window.scrollTo({
                        top: targetEl.offsetTop - 80, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        mobileBtn.click();
                    }
                }
            }
        });
    });
    
    // 6. Lead Magnet Form Handler Example
    const leadForm = document.getElementById('leadCaptureForm');
    if(leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('leadEmail').value;
            // Simulated form submission UI switch
            leadForm.innerHTML = `
                <div style="background: rgba(212,163,59,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid var(--rich-gold);">
                    <h4 style="color: var(--primary-blue); margin-bottom: 0.5rem; font-family: var(--font-heading);">Success! Toolkit Sent.</h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Please check your inbox at <strong>${email}</strong>.</p>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 1rem;">Ready for your strategy session? <a href="https://calendly.com/" target="_blank" style="color: var(--rich-gold); font-weight: 600; text-decoration: underline;">Book it here.</a></p>
                </div>
            `;
        });
    }
});
