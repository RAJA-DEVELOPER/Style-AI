document.addEventListener('DOMContentLoaded', () => {

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Check if this is already active
            const isActive = this.classList.contains('active');

            // Close all currently open answers (optional: allows only one open at a time)
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                const answer = this.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Contact Form Submission (Simulation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Visual feedback
            btn.innerText = 'Message Sent';
            btn.style.backgroundColor = 'var(--primary)';
            btn.style.color = '#fff';
            
            // Reset form
            contactForm.reset();

            // Revert button after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = 'var(--text)';
            }, 3000);
        });
    }

});
