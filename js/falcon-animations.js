document.addEventListener('DOMContentLoaded', () => {
    // 1. PRELOADER (Idea 9)
    // Pulse the logo
    anime({
        targets: '.preloader-logo',
        scale: [0.9, 1.1],
        opacity: [0.8, 1],
        duration: 800,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // Animate progress bar
    anime({
        targets: '.loading-progress',
        width: '100%',
        duration: 1500,
        easing: 'easeInOutQuad',
        complete: function() {
            // Fade out preloader
            anime({
                targets: '#preloader',
                opacity: 0,
                translateY: -50,
                duration: 800,
                easing: 'easeOutExpo',
                complete: function() {
                    const preloader = document.querySelector('#preloader');
                    if (preloader) preloader.style.display = 'none';
                    // Trigger Hero Animations after preloader is done
                    animateHero();
                }
            });
        }
    });

    // 2. HERO ANIMATIONS
    function animateHero() {
        // Typewriter Effect for Title (Idea 1) - implied as part of user selection context or standard
        // But specifically asked for Scroll Indicator (Idea 5) and others.
        // Let's add the Typewriter effect anyway as it was discussed, or just fade in.
        // The user selected "5,8,9,11,12,13,14,15,16,19,20".
        // Idea 1 (Typewriter) was NOT in the user's specific selection list "5,8,9,11,12,13,14,15,16,19,20",
        // so I will skip Typewriter to respect the explicit choice, but ensure the title appears.

        anime({
            targets: '.hero h1, .hero-company h1, .service-hero h1, .service-hero-content h1',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
            easing: 'easeOutCubic'
        });

        // 3. SCROLL INDICATOR (Idea 5)
        anime({
            targets: '.scroll-indicator',
            translateY: [0, 10],
            direction: 'alternate',
            loop: true,
            duration: 800,
            easing: 'easeInOutSine'
        });
    }

    // 4. RIPPLE EFFECT (Idea 8)
    const buttons = document.querySelectorAll('.btn, .nav-menu li a');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only for visual effect, let links work normally
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;

            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Append to button (make sure button is relative/overflow hidden)
            // .btn already has this. Nav links might need it.
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 5. SECTION TITLES LINE DRAWING (Idea 11)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate Line
                const line = entry.target.querySelector('.title-line');
                if (line) {
                    anime({
                        targets: line,
                        width: ['0px', '80px'],
                        duration: 800,
                        easing: 'easeOutCubic'
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title').forEach(title => {
        sectionObserver.observe(title);
    });

    // 6. SERVICE CARDS STAGGER (Idea 12)
    // We can use a separate observer for the grid to trigger stagger
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.service-card',
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(150), // 150ms delay between each
                        duration: 800,
                        easing: 'easeOutCubic'
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        gridObserver.observe(servicesGrid);
    }

    // 7. SERVICE CARD HOVER LEVITATION & BG ZOOM (Idea 13 & 15)
    document.querySelectorAll('.service-card').forEach(card => {
        const bg = card.querySelector('.service-card-bg');

        card.addEventListener('mouseenter', () => {
            // Levitation
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                duration: 400,
                easing: 'easeOutCubic'
            });
            // Bg Zoom
            if (bg) {
                anime({
                    targets: bg,
                    scale: 1.1,
                    duration: 6000, // Slow continuous zoom? Or just on hover?
                    // User asked for "Zoom Lento". Typically implies continuous or slow on hover.
                    // Let's do a slow zoom in on hover.
                    easing: 'linear'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            // Reset Levitation
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                duration: 400,
                easing: 'easeOutCubic'
            });
            // Reset Bg Zoom
            if (bg) {
                anime({
                    targets: bg,
                    scale: 1,
                    duration: 400,
                    easing: 'easeOutQuad'
                });
            }
        });
    });

    // 8. ABOUT TABS ELASTIC TRANSITION (Idea 14)
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Override existing click listeners if needed, or work with them.
    // The existing script in index.html handles the class toggling.
    // We need to intercept or augment it.
    // Since we are defer loading, we can re-attach.

    tabLinks.forEach(link => {
        // Clone node to remove old listeners? No, that breaks things.
        // Just add a new listener that runs AFTER the class change (or we handle logic here).
        // Let's replace the logic from index.html here for full control.
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop default anchor behavior
            e.stopImmediatePropagation(); // Stop the inline script from running if we can, or just overwrite visual state.

            // Remove active class from all links
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);

            // Hide all contents with animation?
            // Simple approach: Hide all, Show Target with Elastic Enter
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            if (targetContent) {
                targetContent.style.display = 'block';
                targetContent.classList.add('active');

                // Elastic Entrance
                anime({
                    targets: targetContent,
                    opacity: [0, 1],
                    translateX: [20, 0],
                    duration: 800,
                    easing: 'easeOutElastic(1, .6)'
                });
            }
        });
    });

    // 9. STATS COUNTERS (Idea 16)
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = document.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const originalText = counter.innerText;
                        let targetValue = parseInt(counter.getAttribute('data-target'));
                        let suffix = '';
                        let prefix = '';

                        // If data-target is missing or invalid, parse from text
                        if (isNaN(targetValue)) {
                            // Regex to find the number.
                            // Matches: optional prefix (non-digits), number (digits with optional decimal), any suffix (even with digits like /7)
                            const match = originalText.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
                            if (match) {
                                prefix = match[1];
                                targetValue = parseFloat(match[2]);
                                suffix = match[3];
                            } else {
                                // Fallback: try to just parse float
                                targetValue = parseFloat(originalText);
                                if (!isNaN(targetValue)) {
                                    suffix = originalText.replace(targetValue.toString(), '').trim();
                                }
                            }
                        } else {
                            // If data-target exists, preserve suffix/prefix
                            const match = originalText.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
                            if (match) {
                                prefix = match[1];
                                suffix = match[3];
                            } else {
                                suffix = originalText.includes('%') ? '%' : (originalText.includes('+') ? '+' : '');
                            }
                        }

                        if (isNaN(targetValue)) return;

                        // Use a dummy object to animate the value
                        let dummy = { val: 0 };
                        // Determine decimal places for rounding
                        const isFloat = !Number.isInteger(targetValue);

                        let animeConfig = {
                            targets: dummy,
                            val: targetValue,
                            easing: 'easeOutExpo',
                            duration: 2000,
                            update: function() {
                                // For floats, we might need to fix precision to avoid floating point errors
                                let displayVal = dummy.val;
                                if (isFloat) {
                                    displayVal = parseFloat(dummy.val.toFixed(1));
                                }
                                counter.innerHTML = prefix + displayVal + suffix;
                            }
                        };

                        // Only apply rounding for integers
                        if (!isFloat) {
                            animeConfig.round = 1;
                        }

                        anime(animeConfig);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // 10. FORM FOCUS LASER (Idea 19)
    const formInputs = document.querySelectorAll('.anime-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const border = input.nextElementSibling; // .focus-border
            if (border) {
                anime({
                    targets: border,
                    width: '100%',
                    duration: 400,
                    easing: 'easeOutCubic'
                });
            }
        });

        input.addEventListener('blur', () => {
            const border = input.nextElementSibling;
            if (border && input.value === '') { // Collapse if empty? Or always? standard is always on blur
                anime({
                    targets: border,
                    width: '0%',
                    duration: 400,
                    easing: 'easeOutCubic'
                });
            }
        });
    });

    // 11. SUBMIT BUTTON TAKEOFF (Idea 20)
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent actual form submit for demo

            // Animation
            anime({
                targets: submitBtn,
                scale: [1, 0.1],
                translateX: [0, 200],
                translateY: [0, -200],
                opacity: 0,
                duration: 800,
                easing: 'easeInBack',
                complete: () => {
                    // Reset or show success message
                    submitBtn.style.display = 'none';
                    const form = submitBtn.closest('.contact-form');
                    const successMsg = document.createElement('div');
                    successMsg.innerHTML = '<h3 style="color: var(--primary-red); text-align: center;">Message Sent!</h3>';
                    form.appendChild(successMsg);

                    anime({
                        targets: successMsg,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600
                    });
                }
            });
        });
    }
});
