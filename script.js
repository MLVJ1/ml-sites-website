// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            // Toggle Tailwind's 'hidden' class to show/hide the menu
            mobileMenu.classList.toggle('hidden');
            // Toggle aria-expanded for accessibility
            menuBtn.setAttribute('aria-expanded', !isHidden); 
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate scroll position, accounting for fixed nav height
                // Ensure your main navigation has an ID, e.g., <nav id="main-nav"> or just select 'nav'
                const navElement = document.querySelector('nav'); 
                const navHeight = navElement ? navElement.offsetHeight : 0; 
                // Added extra padding (-20px) to ensure content isn't directly under the nav
                const offsetTop = targetElement.offsetTop - navHeight - 20; 

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open after clicking a link
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (menuBtn) { 
                        menuBtn.setAttribute('aria-expanded', false);
                    }
                }
            }
        });
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form'); // Ensure your form has this ID

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If all validations pass
            alert('Thank you for your message! We will get back to you soon.');
            this.reset(); // Clear the form
        });
    }
});