const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = Array.from(document.querySelectorAll('.reveal'));

if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        }
    );

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 80}ms`;
        observer.observe(item);
    });
}

// Highlight the nav link of the section currently in view.
const navLinks = Array.from(document.querySelectorAll('.site-header nav a'));
const linkById = new Map(
    navLinks.map((link) => [link.getAttribute('href').slice(1), link])
);
const trackedSections = Array.from(document.querySelectorAll('main section[id]'))
    .filter((section) => linkById.has(section.id));

const spy = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => link.classList.remove('active'));
            const active = linkById.get(entry.target.id);
            if (active) active.classList.add('active');
        });
    },
    {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0
    }
);

trackedSections.forEach((section) => spy.observe(section));

// Featured Projects horizontal slider controls.
const slider = document.getElementById('projectSlider');
if (slider) {
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    const cardStep = () => {
        const card = slider.querySelector('.xp');
        const gap = parseFloat(getComputedStyle(slider).columnGap) || 14;
        return card ? card.offsetWidth + gap : slider.clientWidth * 0.8;
    };

    const updateButtons = () => {
        const maxScroll = slider.scrollWidth - slider.clientWidth - 1;
        if (prevBtn) prevBtn.disabled = slider.scrollLeft <= 0;
        if (nextBtn) nextBtn.disabled = slider.scrollLeft >= maxScroll;
    };

    if (prevBtn) prevBtn.addEventListener('click', () => slider.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
    if (nextBtn) nextBtn.addEventListener('click', () => slider.scrollBy({ left: cardStep(), behavior: 'smooth' }));

    slider.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();

    // Project detail modal.
    const modal = document.getElementById('projectModal');
    if (modal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalTags = document.getElementById('modalTags');
        const closeEl = modal.querySelector('.modal-close');
        let lastFocused = null;

        const openModal = (card) => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const tags = card.querySelector('.tag-row');
            modalTitle.textContent = title ? title.textContent : '';
            modalDesc.textContent = desc ? desc.textContent : '';
            modalTags.innerHTML = tags ? tags.innerHTML : '';
            lastFocused = card;
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            closeEl.focus();
        };

        const closeModal = () => {
            modal.hidden = true;
            document.body.style.overflow = '';
            if (lastFocused) lastFocused.focus();
        };

        slider.querySelectorAll('.xp').forEach((card) => {
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.addEventListener('click', () => openModal(card));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openModal(card);
                }
            });
        });

        modal.querySelectorAll('[data-close]').forEach((el) =>
            el.addEventListener('click', closeModal)
        );
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modal.hidden) closeModal();
        });
    }
}
