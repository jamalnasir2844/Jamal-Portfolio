// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// --- Navbar Sticky Event ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- Mobile Menu Toggle ---
navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    // Change icon between bars and times
    const icon = navToggle.querySelector('i');
    if(navList.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on clicking a link & Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        navList.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }

        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// --- Active Nav Link on Scroll ---
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // When we hit a section, assign its ID to 'current'
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- Scroll Reveal Animations utilizing Intersection Observer ---
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});




var typed = new Typed(".text",{
    strings:["Frontend Developer", "Youtuber", "Web Developer"],
    typeSpeed:100 ,
    backSpeed:100,
    backDelay:1000,
    loop:true
})

// --- Preloader ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// --- EmailJS Integration ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');
        
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        
        emailjs.sendForm('service_w3c9rjz', 'template_z8n3ljw', this)
            .then(function() {
                submitBtn.innerText = 'Send Message';
                submitBtn.disabled = false;
                formStatus.innerText = 'Message sent successfully!';
                formStatus.style.color = '#10b981';
                formStatus.style.display = 'block';
                contactForm.reset();
                setTimeout(() => formStatus.style.display = 'none', 5000);
            }, function(error) {
                console.log(error);
                submitBtn.innerText = 'Send Message';
                submitBtn.disabled = false;
                formStatus.innerText = 'Failed to send message. Please try again.';
                formStatus.style.color = '#ef4444';
                formStatus.style.display = 'block';
                setTimeout(() => formStatus.style.display = 'none', 5000);
            });
    });
}

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    }
});
