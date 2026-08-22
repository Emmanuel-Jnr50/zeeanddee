/* =====================================================================
   GSAP ANIMATIONS — simplified

   Requires GSAP core + ScrollTrigger loaded before this file:
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
   <script src="gsap-animations.js"></script>

   Two moves used throughout the whole site, nothing else:
     - TEXT  (spans, headings, paragraphs, buttons) → slides in from the left
     - CARDS/IMAGES (anything visual) → fades upward

   Hero runs once on page load. Everything else fires on scroll via
   ScrollTrigger the first time each section enters the viewport.
   ===================================================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

    // shared animation defaults
    const textFrom = { x: -40, opacity: 0, duration: 0.7, ease: 'power2.out' };
    const cardFrom = { y: 35, opacity: 0, duration: 0.7, ease: 'power2.out' };

    /* =================================================================
       1. PAGE LOAD — hero (mobile + desktop variants)
       ================================================================= */

    function heroIntro(root) {
        if (!root) return;
        const logo = root.querySelector('.logo');
        const links = root.querySelectorAll('.links a');
        const navBtn = root.querySelector('nav button');
        const heroSpan = root.querySelector('.hero-text span');
        const heroH1 = root.querySelector('.hero-text h1');
        const heroP = root.querySelector('.hero-text p');
        const heroBtn = root.querySelector('.hero-text div button');
        const rotorImg = root.querySelector('.rotor');

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        if (logo) tl.from(logo, { ...textFrom, duration: 0.6 }, 0);
        if (links.length) tl.from(links, { ...textFrom, duration: 0.5, stagger: 0.06 }, 0.1);
        if (navBtn) tl.from(navBtn, { ...textFrom, duration: 0.5 }, 0.15);

        if (heroSpan) tl.from(heroSpan, textFrom, 0.25);
        if (heroH1) tl.from(heroH1, { ...textFrom, duration: 0.8 }, 0.35);
        if (heroP) tl.from(heroP, textFrom, 0.5);
        if (heroBtn) tl.from(heroBtn, textFrom, 0.6);

        // image slides up instead of popping
        if (rotorImg) tl.from(rotorImg, { ...cardFrom, duration: 0.8 }, 0.4);

        return tl;
    }

    heroIntro(document.querySelector('.phone-hero'));
    heroIntro(document.querySelector('.hero'));


    /* =================================================================
       2. SCROLL REVEALS — same two moves, every section
       ================================================================= */

    // reusable helper: text elements slide in from left, staggered
    function revealText(selector, triggerEl) {
        const els = document.querySelectorAll(selector);
        if (!els.length) return;
        gsap.from(els, {
            ...textFrom,
            stagger: 0.1,
            scrollTrigger: { trigger: triggerEl || els[0], start: 'top 80%' }
        });
    }

    // reusable helper: cards/images fade upward, staggered
    function revealCards(selector, triggerEl) {
        const els = document.querySelectorAll(selector);
        if (!els.length) return;
        gsap.from(els, {
            ...cardFrom,
            stagger: 0.1,
            scrollTrigger: { trigger: triggerEl || els[0], start: 'top 70%' }
        });
    }

    // ---- OUR CORNER ----
    revealText('.our-corner > span, .our-corner > h3, .our-corner > p', '.our-corner');
    revealCards('.corner', '.corner-wrapper');

    // ---- ABOUT US ----
    revealText('.about-us span, .about-us h3, .about-us p' , '.about-us');
    revealCards('.about-img > div, .about-us button', '.about-us .about-img');

    // ---- CAFE SECTION ----
    revealText('.cafe-section .main > span, .cafe-section .main > h3, .cafe-section .main > p', '.cafe-section');
    revealCards('.cafe-menu .imgone, .cafe-menu .imgtwo', '.cafe-menu');
    revealText('.cafe-menu .menu span, .cafe-menu .menu button', '.cafe-menu .menu');

    const mealsHeading = Array.from(document.querySelectorAll('.cafe-section h3'))
        .find(h => h.textContent.includes('Café Favourites'));
    if (mealsHeading) revealText('.cafe-section h3', mealsHeading); // falls back to broad selector if title text changes
    revealCards('.meals .meal', '.meals');

    // ---- GALLERY ----
    // each image gets its OWN trigger (via batch) so they fade in
    // one by one as they individually enter view, not all together
    // off a single shared trigger
    revealText('.gallery > span, .gallery > h3, .gallery > p', '.gallery');

    const galleryImages = document.querySelectorAll('.image-grid .img');
    if (galleryImages.length) {
        gsap.set(galleryImages, cardFrom); // start hidden immediately, no flash of visible content
        ScrollTrigger.batch(galleryImages, {
            start: 'top 85%',
            onEnter: (batch) => gsap.to(batch, {
                y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.1, overwrite: true
            })
        });
    }

    // ---- OUR SPACES ----
    revealText('.our-spaces .main > span, .our-spaces .main > h3, .our-spaces .main > p', '.our-spaces');
    revealCards('.our-spaces .info .group', '.our-spaces .info');

    const indicatorWrap = document.querySelector('.our-spaces .group-indicator');
    if (indicatorWrap) {
        // pills are built dynamically by the spaces slider script, so wait
        // for the section to enter view before animating whatever's inside
        ScrollTrigger.create({
            trigger: '.our-spaces',
            start: 'top 70%',
            once: true,
            onEnter: () => {
                gsap.from(indicatorWrap.querySelectorAll('.ind-item'), {
                    ...cardFrom, duration: 0.5, stagger: 0.08, delay: 0.3
                });
            }
        });
    }

    // ---- WHY US ----
    revealText('.why-us > span, .why-us > h3, .why-us > p', '.why-us');
    revealCards('.reasons .card', '.reasons .card');

    // ---- TESTIMONIALS ----
    revealText('.testimonials .main > span, .testimonials .main > h3, .testimonials .main > p', '.testimonials');
    revealCards('.testimonial', '.testimonials-wrapper');

    // ---- VISIT US ----
    revealText('.visit-us .main > span, .visit-us .main > h3, .visit-us .main > p', '.visit-us');
    revealText('.left > div', '.visit-container');
    revealCards('.contact-btns button', '.contact-btns');
    revealCards('.map', '.map');


    /* =================================================================
       3. RECALCULATE TRIGGER POSITIONS AFTER EVERYTHING FINISHES LOADING
       ================================================================= */
    // Trigger positions (e.g. "top 78%") are calculated against page
    // height at the moment each ScrollTrigger is created. Images and the
    // Google Maps iframe load asynchronously and can shift page height
    // afterward — which silently moves every trigger below them out of
    // sync, and for elements near the bottom of the page (contact
    // buttons, the "Get Directions" button) can push their start point
    // past the maximum scrollable distance entirely, so they never fire
    // and stay stuck at opacity: 0. Refreshing once everything has
    // actually loaded fixes their positions for good.
    window.addEventListener('load', () => ScrollTrigger.refresh());

});
