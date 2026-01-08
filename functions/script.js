// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Nav CTA click
document.querySelector('.nav-cta').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Add scroll-based nav background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, var(--bg-primary), transparent)';
        nav.style.backdropFilter = 'none';
    }
});

// Contact Form Handler
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const project = formData.get('project');
    const message = formData.get('message');
    
    // Create a unique ID for each submission
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Create a nicely formatted message with unique subject
    const formattedData = new FormData();
    formattedData.append('name', name);
    formattedData.append('email', email);
    formattedData.append('_replyto', email);
    formattedData.append('_subject', `New ${project} inquiry from ${name} [#${uniqueId}]`);
    formattedData.append('Project Type', project);
    formattedData.append('message', message);
    
    try {
        const response = await fetch('https://formspree.io/f/xpqwvlrq', {
            method: 'POST',
            body: formattedData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = '✓ Message sent! We\'ll get back to you soon.';
            formStatus.className = 'form-status success';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.textContent = 'Oops! Something went wrong. Try emailing us directly.';
        formStatus.className = 'form-status error';
    } finally {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});