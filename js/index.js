// CORNER SLIDER
(function () {
    const wrapper = document.querySelector('.corner-wrapper');
    const track = wrapper.querySelector('.corner');
    const spots = Array.from(track.querySelectorAll('.spot'));

    // build dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'corner-dots';
    wrapper.appendChild(dotsContainer);
    spots.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    });
    const dots = Array.from(dotsContainer.children);

    const mq = window.matchMedia('(max-width: 1024px)');
    let isSliderActive = false;
    let autoplayTimer = null;
    let resumeTimer = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let ticking = false;

    // smooth, real-time proportional dot fill (replaces the old
    // setTimeout-debounced binary active/inactive toggle)
    function updateDotsProgress() {
        const trackRect = track.getBoundingClientRect();
        const centerX = trackRect.left + trackRect.width / 2;
        const cardWidth = spots[0].getBoundingClientRect().width;
        const maxDist = trackRect.width / 2 + cardWidth / 2;

        spots.forEach((spot, i) => {
            const rect = spot.getBoundingClientRect();
            const dist = Math.abs((rect.left + rect.width / 2) - centerX);
            const progress = Math.max(0, 1 - dist / maxDist);
            const dot = dots[i];
            dot.style.width = (10 + 16 * progress) + 'px';
            dot.style.borderRadius = progress > 0.5 ? '6px' : '50%';
            dot.style.background = progress > 0.15 ? 'var(--gold, #c89948)' : 'rgba(0,0,0,0.2)';
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
        spots.forEach((spot, i) => {
            const rect = spot.getBoundingClientRect();
            const dist = Math.abs((rect.left + rect.width / 2) - centerX);
            if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        return closest;
    }

    function goToSlide(i) {
        if (i < 0) i = spots.length - 1;
        if (i >= spots.length) i = 0;
        track.scrollTo({ left: spots[i].offsetLeft - track.offsetLeft, behavior: 'smooth' });
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
        resumeTimer = setTimeout(() => { if (isSliderActive) startAutoplay(); }, 5000);
    }

    // manual drag support (mouse/trackpad — touch already works natively)
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

    function enableSlider() {
        if (isSliderActive) return;
        isSliderActive = true;
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

    function disableSlider() {
        if (!isSliderActive) return;
        isSliderActive = false;
        stopAutoplay();
        clearTimeout(resumeTimer);
        track.removeEventListener('scroll', requestDotsUpdate);
        track.removeEventListener('touchstart', pauseThenResume);
        track.removeEventListener('mousedown', onPointerDown);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
    }

    mq.addEventListener('change', e => e.matches ? enableSlider() : disableSlider());
    if (mq.matches) enableSlider();
})();




// MEALS SLIDER
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.meals').forEach(function (track) {
        let wrapper = track.closest('.meals-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'meals-wrapper';
            track.parentNode.insertBefore(wrapper, track);
            wrapper.appendChild(track);
        }
        initMealsSlider(wrapper, track);
    });

    function initMealsSlider(wrapper, track) {
        const cards = Array.from(track.querySelectorAll('.meal'));
        if (cards.length <= 1) return;

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'meals-dots';
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

        // smooth, real-time proportional dot fill (replaces the old
        // setTimeout-debounced binary active/inactive toggle)
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
                dot.style.background = progress > 0.15 ? 'var(--gold, #c89948)' : 'rgba(0,0,0,0.2)';
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

        track.addEventListener('scroll', requestDotsUpdate, { passive: true });

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
            resumeTimer = setTimeout(startAutoplay, 5000);
        }

        track.addEventListener('touchstart', pauseThenResume, { passive: true });

        track.addEventListener('mousedown', e => {
            isDragging = true;
            track.classList.add('dragging');
            dragStartX = e.clientX;
            dragStartScroll = track.scrollLeft;
            pauseThenResume();
        });
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            track.scrollLeft = dragStartScroll + (dragStartX - e.clientX);
        });
        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            track.classList.remove('dragging');
        });

        dots.forEach(dot => dot.addEventListener('click', () => {
            pauseThenResume();
            goToSlide(parseInt(dot.dataset.index, 10));
        }));

        updateDotsProgress();
        startAutoplay();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.our-spaces').forEach(initSpaces);
});

function restartCSSAnimation(el) {
    el.style.animation = 'none';
    void el.offsetWidth; // force reflow, resets the keyframe
    el.style.animation = '';
}

function initSpaces(section) {
    const group = section.querySelector('.info .group');
    const cards = Array.from(group.querySelectorAll('.card'));
    const layers = [section.querySelector('.bg-layer.bg-1'), section.querySelector('.bg-layer.bg-2')];
    const indicatorWrap = section.querySelector('.group-indicator');
    if (!cards.length) return;

    // build one pill per card, numbered 01, 02, 03...
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


// TESTIMONIALS SLIDER
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.testimonials-wrapper').forEach(function (track) {
        let section = track.closest('.testimonials-section');
        if (!section) {
            section = document.createElement('div');
            section.className = 'testimonials-section';
            section.style.position = 'relative';
            track.parentNode.insertBefore(section, track);
            section.appendChild(track);
        }

        const cards = Array.from(track.querySelectorAll('.testimonial'));
        if (cards.length <= 1) return;

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonials-dots';
        section.appendChild(dotsContainer);
        cards.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        });
        const dots = Array.from(dotsContainer.children);

        let autoplayTimer = null, resumeTimer = null;
        let isDragging = false, dragStartX = 0, dragStartScroll = 0;
        let ticking = false;

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
            if (!ticking) { requestAnimationFrame(updateDotsProgress); ticking = true; }
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

        track.addEventListener('scroll', requestDotsUpdate, { passive: true });

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(() => goToSlide(getClosestIndex() + 1), 4000);
        }
        function stopAutoplay() { if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; }
        function pauseThenResume() {
            stopAutoplay();
            clearTimeout(resumeTimer);
            resumeTimer = setTimeout(startAutoplay, 5000);
        }

        track.addEventListener('touchstart', pauseThenResume, { passive: true });
        track.addEventListener('mousedown', e => {
            isDragging = true;
            track.classList.add('dragging');
            dragStartX = e.clientX;
            dragStartScroll = track.scrollLeft;
            pauseThenResume();
        });
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            track.scrollLeft = dragStartScroll + (dragStartX - e.clientX);
        });
        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            track.classList.remove('dragging');
        });

        dots.forEach(dot => dot.addEventListener('click', () => {
            pauseThenResume();
            goToSlide(parseInt(dot.dataset.index, 10));
        }));

        updateDotsProgress();
        startAutoplay();
    });
});

const phoneNav = document.getElementById('phonenav');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', function () {
    phoneNav.classList.toggle('active');
});