// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile Menu ──────────────────────────────────────────────────────────
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    function toggleMobileMenu() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle && mobileMenu && overlay) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ── Typing Animation ─────────────────────────────────────────────────────
    const typingText = document.getElementById('typing-text');
    const texts = [
        "Software Engineer",
        "Technical Solutions",   // FIXED: missing comma was here
        "Product & UX"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!typingText) return;
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
            charIndex--;
        } else {
            typingText.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ── Floating Particles ───────────────────────────────────────────────────
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ── Smooth Scrolling ─────────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Scroll Animations ────────────────────────────────────────────────────
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Staggered animation delays for project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ── Theme Toggle ─────────────────────────────────────────────────────────
    const themeToggle = document.querySelector('.theme-toggle');
    let isDarkMode = false;

    function updateThemeButton() {
        if (themeToggle) {
            themeToggle.textContent = isDarkMode ? '☀️ Light' : '🌙 Dark';
        }
    }

    function toggleTheme() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark', isDarkMode);
        try {
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        } catch (e) { /* storage unavailable, ignore */ }
        updateThemeButton();
    }

    try {
        if (localStorage.getItem('theme') === 'dark') {
            isDarkMode = true;
            document.body.classList.add('dark');
        }
    } catch (e) { /* storage unavailable, ignore */ }
    updateThemeButton();

    // The HTML uses onclick="toggleTheme()", so it must be global
    window.toggleTheme = toggleTheme;

    // ── Media Modal (images, local videos, YouTube) ──────────────────────────
    const mediaModal = document.getElementById('mediaModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');

    function openModal(type, src) {
        if (!mediaModal || !modalContent) return;
        modalContent.innerHTML = '';

        if (type === 'image') {
            const img = document.createElement('img');
            img.className = 'modal-image';
            img.src = src;
            img.alt = 'Project preview';
            modalContent.appendChild(img);

        } else if (type === 'video') {
            const video = document.createElement('video');
            video.className = 'modal-video';
            video.src = src;
            video.controls = true;
            video.autoplay = true;
            modalContent.appendChild(video);

        } else if (type === 'youtube') {
            const iframe = document.createElement('iframe');
            iframe.className = 'modal-video';
            iframe.src = `https://www.youtube.com/embed/${src}?autoplay=1`;
            iframe.allow = 'autoplay; fullscreen';
            iframe.allowFullscreen = true;
            modalContent.appendChild(iframe);
        }

        mediaModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!mediaModal || !modalContent) return;
        mediaModal.classList.remove('show');
        document.body.style.overflow = '';
        modalContent.innerHTML = ''; // stops video/iframe playback
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (mediaModal) {
        mediaModal.addEventListener('click', function (e) {
            if (e.target === mediaModal) closeModal();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    document.querySelectorAll('.media-trigger').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            openModal(this.dataset.type, this.dataset.media);
        });
    });

    window.openModal = openModal;
    window.closeModal = closeModal;

    // ── Contact Form (only runs if a #contactForm exists) ────────────────────
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formObject = {};
            new FormData(this).forEach((value, key) => {
                formObject[key] = value;
            });

            if (!formObject.name || !formObject.email || !formObject.message) {
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulated submission; replace with a real backend or a service like Formspree
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ── Navbar Scroll Effect + Active Link Highlighting ──────────────────────
    const navbar = document.querySelector('nav');
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNavigation() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }

    function onScroll() {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }
        highlightNavigation();
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    // ── Scroll To Top Button ─────────────────────────────────────────────────
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 18px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', function () {
            const show = window.scrollY > 300;
            scrollBtn.style.opacity = show ? '1' : '0';
            scrollBtn.style.visibility = show ? 'visible' : 'hidden';
        });

        scrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    createScrollToTop();

    console.log("Welcome to Faiza Mutesi's Portfolio! Feel free to explore the code and reach out if you have any questions!");
});

// Global helper, in case any HTML calls it directly
window.closeMobileMenu = function () {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    if (mobileToggle) mobileToggle.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};
