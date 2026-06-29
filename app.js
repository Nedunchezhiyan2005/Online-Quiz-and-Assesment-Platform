/**
 * app.js - Comprehensive Site Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initClock();
    initCounters();
    initSlider();
    initNotifications();
    initScrollTop();
    initValidation();
});

// 1. Theme Switcher (Req #10)
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    toggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
        lucide.createIcons();
    }
}

// 2. Dynamic Clock (Req #9)
function initClock() {
    const clockEl = document.getElementById('current-time');
    if (!clockEl) return;

    const updateClock = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleString();
    };

    setInterval(updateClock, 1000);
    updateClock();
}

// 3. Dynamic Statistics Counters (Req #5)
function initCounters() {
    const counters = document.querySelectorAll('.value');
    const speed = 200;

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;
                const inc = target / speed;

                if (count < target) {
                    entry.target.innerText = Math.ceil(count + inc);
                    setTimeout(() => initCounters(), 1); // Simple recursion simulation for brevity
                } else {
                    entry.target.innerText = target;
                }
            }
        });
    };

    // More robust counter implementation
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = Math.max(1, target / speed);

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// 4. Image Slider (Req #8)
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    setInterval(nextSlide, 5000);
}

// 5. Notification Panel (Req #11)
function initNotifications() {
    const btn = document.getElementById('notif-btn');
    const panel = document.getElementById('notif-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('show');
    });

    document.addEventListener('click', () => panel.classList.remove('show'));
    panel.addEventListener('click', (e) => e.stopPropagation());
}

// 6. Scroll To Top (Req #16)
function initScrollTop() {
    const btn = document.getElementById('scroll-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 7. Form Validation (Req #13)
function initValidation() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const fields = [
            { id: 'reg-name', rule: val => val.length > 2 },
            { id: 'reg-email', rule: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) },
            { id: 'reg-phone', rule: val => val.length >= 10 },
            { id: 'reg-pass', rule: val => val.length >= 8 },
            { id: 'reg-gender', rule: val => val !== "" },
            { id: 'reg-dob', rule: val => val !== "" },
            { id: 'reg-address', rule: val => val.length > 5 }
        ];

        fields.forEach(field => {
            const el = document.getElementById(field.id);
            const parent = el.parentElement;
            if (!field.rule(el.value)) {
                parent.classList.add('error');
                isValid = false;
            } else {
                parent.classList.remove('error');
            }
        });

        if (isValid) {
            alert('Registration Successful!');
            form.reset();
        }
    });
}
