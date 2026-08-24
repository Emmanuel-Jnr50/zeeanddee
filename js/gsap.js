gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

gsap.from(
  ".phone-hero .hero-text span, .phone-hero .hero-text h1, .phone-hero .hero-text p",
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
  ".our-corner .header span, .our-corner .header h3, .our-corner .header p",
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
  gsap.from(".our-corner .corner", {
    scrollTrigger: {
      trigger: ".our-corner .corner-wrapper",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    y: 20,
    opacity: 0,
    stagger: 0.12,
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
gsap.from(".about-us .left span, .about-us .left h3, .about-us .left p", {
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
  ".cafe-section .header span, .cafe-section .header h3, .cafe-section .header p",
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
gsap.from(".cafe-section .main > h3", {
  scrollTrigger: {
    trigger: ".cafe-section .main > h3", // element to watch
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
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
    ease: "power2.out",
  });
});
gsap.from(".gallery .header span, .gallery .header h3, .gallery .header p", {
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
