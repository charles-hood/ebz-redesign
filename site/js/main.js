// Ebenezer Church - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
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

    // Observe all sections and cards
    document.querySelectorAll('.section, .card, .staff-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add fade-in animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .card.fade-in,
        .staff-card.fade-in {
            transition-delay: calc(var(--index, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    // Set stagger delay for cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    document.querySelectorAll('.staff-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    // Parallax effect for hero
    const hero = document.querySelector('.hero-bg img');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Staff Data
    const staffData = {
        glenn: {
            name: 'Glenn Hannigan',
            title: 'Senior Pastor',
            image: 'images/staff/glenn-hannigan.jpg',
            imagePosition: 'center 15%',
            bio: 'Glenn has served as Senior Pastor since June 2010. Before answering the call to ministry, he spent 27 years at The Atlanta Journal-Constitution in editing and management roles, including Sports Editor and Olympics coordinator. Glenn has been married to Candi since 1987, and they have three adult children.',
            email: 'ghannigan1@yahoo.com'
        },
        robbie: {
            name: 'Robbie Underwood',
            title: 'Executive Minister',
            image: 'images/staff/robbie-underwood.jpg',
            imagePosition: 'center 20%',
            bio: 'Robbie joined the team in 2023 after serving as Catering & Events Director at Holbrook Life, bringing 23 years of experience in the events industry. He was ordained in the ministry at his long-time home church, Grace Baptist Church in Etowah, TN in 2024. Robbie has two children.',
            email: 'executive@ebzchurch.org'
        },
        greg: {
            name: 'Greg Millette',
            title: 'Music Minister & Pianist',
            image: 'images/staff/greg-millette.jpg',
            imagePosition: 'center 25%',
            bio: 'Greg joined Ebenezer in late 2017, bringing over 30 years of experience in Methodist churches. He has directed more than 30 musicals throughout his career. Greg has been married for 26 years and has one son in high school.',
            email: 'music@ebzchurch.org'
        },
        asa: {
            name: 'Asa Sellers',
            title: 'Worship Leader',
            image: 'images/staff/asa-sellers.jpg',
            bio: 'Asa brings five years of music ministry experience to Ebenezer. He holds a BA in Worship Leadership from Baptist University of Florida and has a background in teaching at private schools.',
            email: 'worship@ebzchurch.org'
        },
        lisa: {
            name: 'Lisa Coxworth',
            title: 'Administrative Assistant',
            image: 'images/staff/lisa-coxworth.jpg',
            bio: 'Lisa joined the Ebenezer team in November 2022. She brings nine years of experience in finance along with administrative experience from Jacksonville and Mississippi. Lisa has twin daughters who are 15 years old.',
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

    // Lazy load Juicer social feed with early trigger
    // Uses rootMargin to start loading before section is visible
    const socialFeed = document.querySelector('.social-feed');
    if (socialFeed) {
        const juicerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const script = document.createElement('script');
                script.src = 'https://www.juicer.io/embed/ebzmethodistchurch/embed-code.js';
                script.defer = true;
                document.body.appendChild(script);
                juicerObserver.disconnect();
            }
        }, {
            rootMargin: '1000px' // Load when within 1000px of viewport
        });
        juicerObserver.observe(socialFeed);

        // Hide skeleton placeholder when Juicer adds content
        const juicerFeed = document.querySelector('.juicer-feed');
        const placeholder = document.querySelector('.social-feed-placeholder');
        if (juicerFeed && placeholder) {
            const observer = new MutationObserver(() => {
                if (juicerFeed.children.length > 0) {
                    placeholder.style.display = 'none';
                    observer.disconnect();
                }
            });
            observer.observe(juicerFeed, { childList: true });
        }
    }

});
