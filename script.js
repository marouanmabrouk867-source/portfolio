document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Navbar Hide/Show on Scroll Logic
    let lastScroll = 0;
    const navbar = document.getElementById('main-navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background and fixed position after scrolling 100px
        if (currentScroll > 100) {
            navbar.classList.add('fixed-active');
        } else {
            navbar.classList.remove('fixed-active');
        }

        // Hide on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // 3. Section Reveal Animation (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    document.querySelectorAll('.reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // 4. Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Contact Form Interaction
    const contactForm = document.getElementById('portfolio-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            // Visual Feedback
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";

            setTimeout(() => {
                submitBtn.innerText = "Message Sent";
                submitBtn.style.background = "#27ae60";
                submitBtn.style.opacity = "1";
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = "var(--text-dark)";
                }, 3000);
            }, 1500);
        });
    }
});