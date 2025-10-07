// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-section .nav');
    const navLinks = document.querySelectorAll('.nav-section .nav a');
    const body = document.body;

    // Check if hamburger exists before adding event listener
    if (hamburger && nav) {
        // Toggle menu when hamburger is clicked
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Toggle body scroll lock and blur
            body.classList.toggle('lock-scroll');
            body.classList.toggle('menu-active');
        });

        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('lock-scroll');
                body.classList.remove('menu-active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('lock-scroll');
                body.classList.remove('menu-active');
            }
        });
    }

    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            // Close hamburger menu and remove blur
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('lock-scroll');
                body.classList.remove('menu-active');
            }
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (nameInput && emailInput && messageInput) {
                const name = nameInput.value;
                const email = emailInput.value;
                const message = messageInput.value;
                
                // Basic validation
                if (name && email && message) {
                    // Show success message
                    alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // You can replace this with actual form submission to a backend
                    // Example:
                    // fetch('/your-endpoint', {
                    //     method: 'POST',
                    //     body: JSON.stringify({ name, email, message }),
                    //     headers: { 'Content-Type': 'application/json' }
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     alert('Message sent successfully!');
                    //     contactForm.reset();
                    // })
                    // .catch(error => {
                    //     alert('Error sending message. Please try again.');
                    // });
                } else {
                    alert('Please fill in all fields.');
                }
            }
        });
    }

    // Optional: Add active nav link highlight on scroll
    const sections = document.querySelectorAll('div[id]');
    const navLinksArray = Array.from(navLinks);

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });
});