gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

gsap.from(
  ".phone-hero .hero-text > span, .phone-hero .hero-text h1, .phone-hero .hero-text p, .phone-hero .hero-text div",
  {
    scrollTrigger: {
      trigger: ".phone-hero", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  },
);
gsap.from(".hero .hero-text span, .hero .hero-text h1, .hero .hero-text p", {
  scrollTrigger: {
    trigger: "hero", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  x: -100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});
gsap.from(".phone-hero .rotor", {
  scrollTrigger: {
    trigger: ".phone-hero", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  x: 300,
  y: 300,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out",
});
gsap.from(
  ".our-corner .header span, .our-corner .header h2, .our-corner .header p",
  {
    scrollTrigger: {
      trigger: ".our-corner .header", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
mm.add("(min-width: 320px) and (max-width: 700px)", () => {
  gsap.from(".our-corner .corner-wrapper", {
    scrollTrigger: {
      trigger: ".our-corner .corner-wrapper",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
});
mm.add("(min-width: 800px) and (max-width: 1920px)", () => {
  gsap.from(".our-corner .corner .spot", {
    scrollTrigger: {
      trigger: ".our-corner .corner",
      start: "top 70%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    // stagger: 0.12,
    duration: 0.5,
    ease: "power2.out",
  });
});
gsap.from(".about-us .left span, .about-us .left h2, .about-us .left p, .about-us .left button", {
  scrollTrigger: {
    trigger: ".about-us .left", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  x: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: "power2.out",
});
gsap.from(".about-us .about-img .imgone", {
  scrollTrigger: {
    trigger: ".about-img", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  y: 35,
  scale: 0.8,
  opacity: 0,
  stagger: 0.2,
  duration: 0.7,
  ease: "power2.out",
});
gsap.from(
  ".cafe-section .header span, .cafe-section .header h2, .cafe-section .header p",
  {
    scrollTrigger: {
      trigger: ".cafe-section .header", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
gsap.fromTo(
  ".cafe-menu .imgone",
  {
    y: 35,
    opacity: 0,
    duration: 0.7,
    scale: 0.8,
    ease: "power2.out",
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cafe-menu .imgone", // element to watch
      start: "top 80%", // when element hits 80% of viewport
    },
  },
);
gsap.fromTo(
  ".cafe-menu .imgtwo",
  {
    y: 35,
    opacity: 0,
    duration: 0.7,
    scale: 0.8,
    ease: "power2.out",
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cafe-menu .imgtwo", // element to watch
      start: "top 80%", // when element hits 80% of viewport
    },
  },
);
gsap.from(".cafe-menu .menu span", {
  scrollTrigger: {
    trigger: ".cafe-menu .menu", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  x: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.2,
  ease: "power2.out",
});
gsap.from(".cafe-section .main > h2", {
  scrollTrigger: {
    trigger: ".cafe-section .main > h2", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  x: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: "power2.out",
});
mm.add("(min-width: 320px) and (max-width: 700px)", () => {
  gsap.from(".cafe-section .meals .meal", {
    scrollTrigger: {
      trigger: ".cafe-section .meals",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 30,
    opacity: 0,
    // stagger: 0.12,
    duration: 0.5,
    ease: "power2.out",
  });
});
mm.add("(min-width: 800px) and (max-width: 1920px)", () => {
  gsap.from(".cafe-section .meals .meal", {
    scrollTrigger: {
      trigger: ".cafe-section .meals",
      start: "top 70%",
      toggleActions: "play none none none",
    },
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: "power2.out",
  });
});
gsap.from(".gallery .header span, .gallery .header h2, .gallery .header p", {
  scrollTrigger: {
    trigger: ".gallery .header", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  x: -40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: "power2.out",
});
gsap.from(".gallery .image-grid .img", {
  scrollTrigger: {
    trigger: ".gallery .image-grid",
    start: "top 60%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  stagger: 0.3,
  duration: 0.5,
  ease: "power3.out",
});
gsap.from(
  ".our-spaces .header span, .our-spaces .header h2, .our-spaces .header p",
  {
    scrollTrigger: {
      trigger: ".our-spaces .header", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
gsap.from(
  ".why-us .header span, .why-us .header h2, .why-us .header p",
  {
    scrollTrigger: {
      trigger: ".why-us .header", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
mm.add("(min-width: 800px) and (max-width: 1920px)", () => {
  gsap.from(".why-us .reasons .card", {
    scrollTrigger: {
      trigger: ".why-us .reasons",
      start: "top 60%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: "power3.out",
  });
});

/* ---- WHY US — mobile-only spotlight scale effect on cards ---- */
mm.add({
    isMobile: '(max-width: 768px)',
    isDesktop: '(min-width: 769px)'
}, (context) => {
    const { isMobile } = context.conditions;
    const cards = document.querySelectorAll('.why-us .reasons .card');
    if (!cards.length) return;

    if (isMobile) {
        cards.forEach((card) => {
            gsap.set(card, {
                scale: 0.85,
                transformOrigin: 'center center',
                boxShadow: '0 0px 0px rgba(39, 23, 17, 0)'
            });

            ScrollTrigger.create({
                trigger: card,
                start: 'top 90%',   // card just entering from below
                end: 'bottom 10%',  // card fully exited above
                scrub: true,
                onUpdate: (self) => {
                    // bell curve: 0 at both ends, peaks at 1 in the middle
                    // (progress 0.5 = card roughly centered in viewport)
                    const bump = Math.sin(self.progress * Math.PI);
                    const scale = 0.85 + (0.15 * bump);       // 0.85 → 1.0 → 0.85
                    const shadowStrength = bump;                // 0 → 1 → 0

                    gsap.set(card, {
                        scale,
                        boxShadow: `0 ${5 * shadowStrength}px ${15 * shadowStrength}px rgba(60, 33, 23, ${0.03 * shadowStrength})`
                    });
                }
            });
        });
    } else {
        gsap.from(cards, {
            y: 35, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
            scrollTrigger: { trigger: '.reasons', start: 'top 78%' }
        });
    }
});
gsap.from(
  ".testimonials .header span, .testimonials .header h2, .testimonials .header p",
  {
    scrollTrigger: {
      trigger: ".testimonials .header", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
gsap.from(".testimonials .testimonials-wrapper .testimonial", {
  scrollTrigger: {
    trigger: ".testimonials .testimonials-wrapper",
    start: "top 60%",
    toggleActions: "play none none none",
  },
  y: 20,
  opacity: 0,
  stagger: 0.3,
  duration: 0.5,
  ease: "power3.out",
});
gsap.from(
  ".visit-us .header span, .visit-us .header h2, .visit-us .header p",
  {
    scrollTrigger: {
      trigger: ".visit-us .header", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
gsap.from(".visit-content .left div>span", {
  scrollTrigger: {
    trigger: ".visit-content",
    start: "top 60%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5,
  ease: "power3.out",
})
gsap.from(
  ".visit-container .location p, visit-container .opening-hours .hours span, .visit-container .contact p",
  {
    scrollTrigger: {
      trigger: ".visit-container div", // element to watch
      start: "top 80%", // when element hits 80% of viewport
      toggleActions: "play none none none",
      // play | pause | reverse | reset
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out",
  },
);
gsap.from(".visit-content .map", {
  scrollTrigger: {
    trigger: ".visit-content .map",
    start: "top 60%",
    toggleActions: "play none none none",
  },
  y: 50,
  opacity: 0,
  duration: 0.5,
  ease: "power2.out",
})