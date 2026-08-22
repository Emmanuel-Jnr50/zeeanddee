/* =====================================================================
   SHARED DRAG SLIDER
   Used by THREE sections that all work identically:
     1. .corner-wrapper   > .corner            > .spot        (tablet/mobile only)
     2. .meals-wrapper    > .meals              > .meal        (all screen sizes)
     3. .testimonials-section > .testimonials-wrapper > .testimonial (all screen sizes)

   Behavior: native scroll-snap track you can drag/swipe, progress dots
   that stretch in real time as you scroll (no debounce lag), autoplay
   that pauses on interaction and resumes after 5s.

   Only .corner is gated behind a media query (max-width: 1024px) since
   that section stays a static flex grid on desktop. The other two are
   sliders at every screen size, so they skip the matchMedia logic
   entirely and just init once on page load.
   ===================================================================== */

function createDragSlider(wrapper, track, cardSelector, dotsClass) {
    const cards = Array.from(track.querySelectorAll(cardSelector));
    if (cards.length <= 1) return null;

    // build dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = dotsClass;
    wrapper.appendChild(dotsContainer);
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);

    let autoplayTimer = null;
    let resumeTimer = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let ticking = false;
    let active = false; // only true once enable() has run (matters for corner's mq gating)

    // dots stretch proportionally to how centered each card is —
    // driven by requestAnimationFrame so there's no debounce delay
    function updateDotsProgress() {
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        const cardWidth = cards[0].getBoundingClientRect().width;
        const maxDist = trackRect.width / 2 + cardWidth / 2;

        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const dist = Math.abs((rect.left + rect.width / 2) - centerX);
            const progress = Math.max(0, 1 - dist / maxDist);
            const dot = dots[i];
            dot.style.width = (10 + 16 * progress) + 'px';
            dot.style.borderRadius = progress > 0.5 ? '6px' : '50%';
            dot.style.background = progress > 0.15 ? 'var(--gold, #c89948)' : 'rgba(0,0,0,0.15)';
            dot.style.opacity = 0.4 + 0.6 * progress;
        });
        ticking = false;
    }
    function requestDotsUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateDotsProgress);
            ticking = true;
        }
    }

    function getClosestIndex() {
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        let closest = 0, closestDist = Infinity;
        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const dist = Math.abs((rect.left + rect.width / 2) - centerX);
            if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        return closest;
    }

    function goToSlide(i) {
        if (i < 0) i = cards.length - 1;
        if (i >= cards.length) i = 0;
        track.scrollTo({ left: cards[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => goToSlide(getClosestIndex() + 1), 4000);
    }
    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
    function pauseThenResume() {
        stopAutoplay();
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { if (active) startAutoplay(); }, 5000);
    }

    function onPointerDown(e) {
        isDragging = true;
        track.classList.add('dragging');
        dragStartX = e.clientX;
        dragStartScroll = track.scrollLeft;
        pauseThenResume();
    }
    function onPointerMove(e) {
        if (!isDragging) return;
        track.scrollLeft = dragStartScroll + (dragStartX - e.clientX);
    }
    function onPointerUp() {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('dragging');
    }

    dots.forEach(dot => dot.addEventListener('click', () => {
        pauseThenResume();
        goToSlide(parseInt(dot.dataset.index, 10));
    }));

    function enable() {
        if (active) return;
        active = true;
        dotsContainer.style.display = 'flex';
        track.scrollTo({ left: 0 });
        track.addEventListener('scroll', requestDotsUpdate, { passive: true });
        track.addEventListener('touchstart', pauseThenResume, { passive: true });
        track.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        updateDotsProgress();
        startAutoplay();
    }

    function disable() {
        if (!active) return;
        active = false;
        stopAutoplay();
        clearTimeout(resumeTimer);
        dotsContainer.style.display = 'none';
        track.removeEventListener('scroll', requestDotsUpdate);
        track.removeEventListener('touchstart', pauseThenResume);
        track.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
    }

    return { enable, disable };
}

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. CORNER --------------------------------------------------
    // Slider only below 1024px; stays a static flex grid on desktop.
    const cornerWrapper = document.querySelector('.corner-wrapper');
    if (cornerWrapper) {
        const cornerTrack = cornerWrapper.querySelector('.corner');
        const cornerSlider = createDragSlider(cornerWrapper, cornerTrack, '.spot', 'corner-dots');
        if (cornerSlider) {
            const mq = window.matchMedia('(max-width: 1024px)');
            mq.addEventListener('change', e => e.matches ? cornerSlider.enable() : cornerSlider.disable());
            if (mq.matches) cornerSlider.enable();
        }
    }

    // --- 2. MEALS -----------------------------------------------------
    // Slider at ALL screen sizes. Auto-wraps .meals in .meals-wrapper
    // if that div wasn't added in the HTML.
    document.querySelectorAll('.meals').forEach(function (mealsTrack) {
        let mealsWrapper = mealsTrack.closest('.meals-wrapper');
        if (!mealsWrapper) {
            mealsWrapper = document.createElement('div');
            mealsWrapper.className = 'meals-wrapper';
            mealsWrapper.style.position = 'relative';
            mealsTrack.parentNode.insertBefore(mealsWrapper, mealsTrack);
            mealsWrapper.appendChild(mealsTrack);
        }
        const mealsSlider = createDragSlider(mealsWrapper, mealsTrack, '.meal', 'meals-dots');
        if (mealsSlider) mealsSlider.enable();
    });

    // --- 3. TESTIMONIALS ----------------------------------------------
    // Slider at ALL screen sizes.
    document.querySelectorAll('.testimonials-section').forEach(function (section) {
        const track = section.querySelector('.testimonials-wrapper');
        if (!track) return;
        const slider = createDragSlider(section, track, '.testimonial', 'testimonials-dots');
        if (slider) slider.enable();
    });

});


/* =====================================================================
   OUR SPACES — pill-fill + Ken Burns background slider
   .our-spaces > .info > .group > .cafe

   Different pattern from the drag sliders above: no dragging, no dots —
   instead numbered "01 02 03" pills that fill horizontally over 4s,
   the active card widens into view, and the section background
   crossfades + slowly zooms in sync with each pill's fill duration.
   Kept separate on purpose since nothing here overlaps with the
   drag-slider logic.
   ===================================================================== */

function restartCSSAnimation(el) {
    el.style.animation = 'none';
    void el.offsetWidth; // force reflow, resets the keyframe
    el.style.animation = '';
}

function initSpaces(section) {
    const group = section.querySelector('.info .group');
    const cards = Array.from(group.querySelectorAll('.cafe'));
    const layers = [section.querySelector('.bg-layer.bg-1'), section.querySelector('.bg-layer.bg-2')];
    const indicatorWrap = section.querySelector('.group-indicator');
    if (!cards.length) return;

    indicatorWrap.innerHTML = '';
    const indicators = cards.map((_, i) => {
        const item = document.createElement('span');
        item.className = 'ind-item';
        item.innerHTML = `<h4>${String(i + 1).padStart(2, '0')}</h4><i></i>`;
        indicatorWrap.appendChild(item);
        return item;
    });

    const state = { current: -1, layerIndex: 0 };

    function goToSlide(index) {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 30;
        group.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;

        indicators.forEach((ind, i) => {
            const bar = ind.querySelector('i');
            if (i === index) {
                ind.classList.add('active');
                restartCSSAnimation(bar);
            } else {
                ind.classList.remove('active');
                bar.style.animation = 'none';
                bar.style.width = '0%';
            }
        });

        const bgUrl = cards[index].dataset.bg;
        if (bgUrl) {
            const incoming = layers[state.layerIndex];
            const outgoing = layers[state.layerIndex === 0 ? 1 : 0];
            incoming.style.backgroundImage = `url(${bgUrl})`;
            restartCSSAnimation(incoming);
            incoming.classList.add('active');
            outgoing.classList.remove('active');
            state.layerIndex = state.layerIndex === 0 ? 1 : 0;
        }

        state.current = index;
    }

    // advance exactly when the active pill finishes filling — no drift
    indicators.forEach((ind, i) => {
        ind.querySelector('i').addEventListener('animationend', (e) => {
            if (e.animationName !== 'fillBar' || state.current !== i) return;
            goToSlide((i + 1) % cards.length);
        });
        ind.addEventListener('click', () => goToSlide(i));
    });

    goToSlide(0);
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.our-spaces').forEach(initSpaces);
});
