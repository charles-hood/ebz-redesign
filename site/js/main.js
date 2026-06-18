// Ebenezer Church - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Seasonal/Regular mode toggle via URL parameter
    // Add ?regular to URL to show non-seasonal hero (for demos)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('regular')) {
        // Swap to regular hero content
        const heroContent = document.querySelector('.hero-content-seasonal');
        if (heroContent) {
            heroContent.classList.remove('hero-content-seasonal');
            heroContent.innerHTML = `
                <p class="hero-tagline">Welcome to Ebenezer</p>
                <h1>Growing in Grace, Perfected in Love</h1>
                <p class="hero-subtitle">Sundays at 8:30, 10:00 & 11:15 AM</p>
                <div class="hero-ctas">
                    <a href="#visit" class="btn btn-primary btn-lg">Plan Your Visit</a>
                    <a href="#watch" class="btn btn-outline-light btn-lg">Watch Online</a>
                </div>
            `;
        }
        // Swap video back to regular
        const heroBg = document.querySelector('.hero-bg-seasonal');
        if (heroBg) {
            heroBg.classList.remove('hero-bg-seasonal');
            heroBg.innerHTML = `
                <video class="hero-video-desktop" autoplay loop muted playsinline poster="images/church-hero.jpg">
                    <source src="images/hero-slideshow.mp4?v=20260617" type="video/mp4">
                </video>
                <video class="hero-video-mobile" autoplay loop muted playsinline poster="images/church-hero.jpg">
                    <source src="images/hero-slideshow-mobile.mp4?v=20260617" type="video/mp4">
                </video>
            `;
        }
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards only (not sections - they're too large and cause render delays)
    document.querySelectorAll('.card, .staff-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Set stagger delay for cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    document.querySelectorAll('.staff-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    // Staff Data
    const staffData = {
        glenn: {
            name: 'Glenn Hannigan',
            title: 'Senior Pastor',
            image: 'images/staff/glenn-hannigan.jpg',
            imagePosition: 'center 15%',
            bio: 'Glenn has served as Senior Pastor since 2010. Before answering the call to ministry, he spent 27 years at The Atlanta Journal-Constitution, including Sports Editor and Olympics coordinator. He and Candi have been married since 1987.',
            email: 'ghannigan1@yahoo.com'
        },
        lisa: {
            name: 'Lisa Coxworth',
            title: 'Administrative Assistant',
            image: 'images/staff/lisa-coxworth.jpg',
            bio: 'Lisa joined the Ebenezer team in 2022 with nine years of finance and administrative experience. Proud mom of twin 16-year-old daughters.',
            email: 'office@ebzchurch.org'
        }
    };

    // Staff Modal
    const staffModal = document.getElementById('staffModal');
    const staffCards = document.querySelectorAll('.staff-card[data-staff]');

    if (staffModal && staffCards.length) {
        const modalImage = document.getElementById('staffModalImage');
        const modalName = document.getElementById('staffModalName');
        const modalTitle = document.getElementById('staffModalTitle');
        const modalBio = document.getElementById('staffModalBio');
        const modalEmail = document.getElementById('staffModalEmail');
        const modalClose = staffModal.querySelector('.modal-close');

        const openModal = (staffKey) => {
            const staff = staffData[staffKey];
            if (!staff) return;

            modalImage.src = staff.image;
            modalImage.alt = staff.name;
            modalImage.style.objectPosition = staff.imagePosition || 'center center';
            modalName.textContent = staff.name;
            modalTitle.textContent = staff.title;
            modalBio.textContent = staff.bio;
            modalEmail.href = `mailto:${staff.email}`;

            staffModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            staffModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        staffCards.forEach(card => {
            card.addEventListener('click', () => {
                const staffKey = card.dataset.staff;
                openModal(staffKey);
            });
        });

        modalClose.addEventListener('click', closeModal);

        staffModal.addEventListener('click', (e) => {
            if (e.target === staffModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && staffModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Event Modal (Host an Event)
    const eventModal = document.getElementById('eventModal');
    const hostEventBtn = document.getElementById('hostEventBtn');

    if (eventModal && hostEventBtn) {
        const modalClose = eventModal.querySelector('.modal-close');

        const openEventModal = () => {
            eventModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeEventModal = () => {
            eventModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        hostEventBtn.addEventListener('click', openEventModal);

        modalClose.addEventListener('click', closeEventModal);

        eventModal.addEventListener('click', (e) => {
            if (e.target === eventModal) {
                closeEventModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && eventModal.classList.contains('active')) {
                closeEventModal();
            }
        });
    }

    // Wedding Modal (Plan Your Wedding)
    const weddingModal = document.getElementById('weddingModal');
    const planWeddingBtn = document.getElementById('planWeddingBtn');

    if (weddingModal && planWeddingBtn) {
        const modalClose = weddingModal.querySelector('.modal-close');

        const openWeddingModal = () => {
            weddingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeWeddingModal = () => {
            weddingModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        planWeddingBtn.addEventListener('click', openWeddingModal);

        modalClose.addEventListener('click', closeWeddingModal);

        weddingModal.addEventListener('click', (e) => {
            if (e.target === weddingModal) {
                closeWeddingModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && weddingModal.classList.contains('active')) {
                closeWeddingModal();
            }
        });
    }

    // Christmas Eve Modal
    const christmasModal = document.getElementById('christmasModal');
    const christmasBtn = document.getElementById('christmasBtn');

    if (christmasModal) {
        const modalClose = christmasModal.querySelector('.modal-close');

        const openChristmasModal = (e) => {
            e.preventDefault();
            e.stopPropagation();
            christmasModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeChristmasModal = () => {
            christmasModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Bind button click
        if (christmasBtn) {
            christmasBtn.addEventListener('click', openChristmasModal);
            christmasBtn.addEventListener('touchend', openChristmasModal);
        }

        // Close handlers
        if (modalClose) {
            modalClose.addEventListener('click', closeChristmasModal);
        }

        christmasModal.addEventListener('click', (e) => {
            if (e.target === christmasModal) {
                closeChristmasModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && christmasModal.classList.contains('active')) {
                closeChristmasModal();
            }
        });
    }

});
