/* ═══════════════════════════════════════════
   ARISEL OS v2.0 — script.js
   ═══════════════════════════════════════════ */

/* ── Tema değiştirici ── */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');
const themeIcon    = themeToggle.querySelector('.theme-icon');

let darkMode = localStorage.getItem('arisel-tema') !== 'aydinlik';

function applyTheme() {
    html.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    themeIcon.textContent = darkMode ? '☀️' : '🌙';
    localStorage.setItem('arisel-tema', darkMode ? 'karanlik' : 'aydinlik');
}
applyTheme();

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    applyTheme();
});

/* ── Hamburger menü ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

/* ── Navbar scroll efekti ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 48);
}, { passive: true });

/* ── Yazı animasyonu (Typing Effect) ── */
const yazilar = [
    'whoami',
    'Bilgisayar Mühendisi',
    'AI Meraklısı',
    'Dünya Gezgini',
    'Hayalci',
    'Yazılım Geliştirici'
];

let yaziIndex   = 0;
let karakterIdx = 0;
let siliyor     = false;
const yaziEl    = document.getElementById('typingText');

function yazEfekti() {
    const metin = yazilar[yaziIndex];

    if (!siliyor) {
        yaziEl.textContent = metin.substring(0, karakterIdx + 1);
        karakterIdx++;
        if (karakterIdx === metin.length) {
            siliyor = true;
            setTimeout(yazEfekti, 2000);
            return;
        }
    } else {
        yaziEl.textContent = metin.substring(0, karakterIdx - 1);
        karakterIdx--;
        if (karakterIdx === 0) {
            siliyor = false;
            yaziIndex = (yaziIndex + 1) % yazilar.length;
        }
    }

    setTimeout(yazEfekti, siliyor ? 55 : 95);
}

/* Boot animasyonu bittikten sonra yazı efektini başlat */
setTimeout(yazEfekti, 2600);

/* ── Scroll reveal (Intersection Observer) ── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 75);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Dil progress barları ── */
const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.lang-fill').forEach(bar => {
                setTimeout(() => {
                    bar.style.width = bar.dataset.width + '%';
                }, 350);
            });
            langObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const langWrapper = document.querySelector('.languages-wrapper');
if (langWrapper) langObserver.observe(langWrapper);

/* ── Accordion ── */
document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const item   = trigger.closest('.acc-item');
        const acikMi = item.classList.contains('open');

        /* Açık olanı kapat */
        document.querySelectorAll('.acc-item.open').forEach(ac => {
            ac.classList.remove('open');
            ac.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
        });

        /* Tıklanan kapalıysa aç */
        if (!acikMi) {
            item.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        }
    });
});

/* ── Parçacık (Particle) sistemi ── */
function parcaciklariOlustur() {
    const kap = document.getElementById('particles');
    if (!kap) return;

    const sayi = window.innerWidth < 600 ? 15 : 30;

    for (let i = 0; i < sayi; i++) {
        const p = document.createElement('div');
        const mor = Math.random() > 0.5;
        p.style.cssText = `
            position:absolute;
            width:${Math.random() * 2.5 + 1}px;
            height:${Math.random() * 2.5 + 1}px;
            background:${mor ? 'rgba(167,139,250,0.45)' : 'rgba(6,182,212,0.4)'};
            border-radius:50%;
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            animation:particleFloat ${6 + Math.random() * 10}s ease-in-out infinite;
            animation-delay:${Math.random() * 6}s;
            pointer-events:none;
        `;
        kap.appendChild(p);
    }
}
parcaciklariOlustur();

/* ── Aktif nav linki (scroll takibi) ── */
const bolumler  = document.querySelectorAll('section[id]');
const navAnkors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnkors.forEach(a => a.classList.remove('active'));
            const aktif = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (aktif) aktif.classList.add('active');
        }
    });
}, { threshold: 0.45 });

bolumler.forEach(b => navObserver.observe(b));

/* ── Glass card hafif 3D hover efekti ── */
document.querySelectorAll('.glass-card').forEach(kart => {
    kart.addEventListener('mousemove', (e) => {
        const r = kart.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 6;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * 6;
        kart.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });
    kart.addEventListener('mouseleave', () => {
        kart.style.transform = '';
    });
});

/* ── Düzgün kaydırma (smooth scroll) — eski tarayıcı desteği ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const hedef = document.querySelector(link.getAttribute('href'));
        if (!hedef) return;
        e.preventDefault();
        const offset = hedef.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});
