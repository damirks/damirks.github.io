
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        const toggle = document.getElementById('menu-toggle');
        if (toggle) toggle.checked = false;
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0) * 150;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.beneficio-card').forEach(card => cardObserver.observe(card));

const productoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.producto-img-wrap, .producto-texto').forEach((el, i) => {
                setTimeout(() => el.classList.add('visible'), i * 200);
            });
            productoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const productoSection = document.querySelector('.section-producto');
if (productoSection) {
    productoSection.querySelectorAll('.producto-img-wrap, .producto-texto').forEach(el => {
        el.classList.add('reveal');
    });
    productoObserver.observe(productoSection);
}

document.querySelectorAll('.creador-card').forEach((card, i) => {
    card.classList.add('reveal');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => card.classList.add('visible'), i * 200);
                obs.unobserve(card);
            }
        });
    }, { threshold: 0.2 });
    obs.observe(card);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--naranja)';
        }
    });
});

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${y * 0.3}px)`;
    }
});

console.log('🥕 HeladoCarrot — página cargada correctamente');
