gsap.registerPlugin(ScrollTrigger);

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
gsap.from(".our-corner .corner", {
  scrollTrigger: {
    trigger: ".our-corner .corner-wrapper", // element to watch
    start: "top 80%", // when element hits 80% of viewport
    toggleActions: "play none none none",
    // play | pause | reverse | reset
  },
  y: 35,
  opacity: 0,
  stagger: 0.2,
  duration: 0.7,
  ease: "power2.out",
});
gsap.from(
  ".about-us .left span, .about-us .left h3, .about-us .left p",
  {
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
  },
);
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
gsap.from(".cafe-section .header span, .cafe-section .header h3, .cafe-section .header p",
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
gsap.fromTo(".cafe-menu .imgone", {
  y: 35, opacity: 0, duration: 0.7, scale: 0.8, ease: "power2.out" },
  { y: 0, opacity: 1, scale: 1,
    scrollTrigger: {
      trigger: ".cafe-menu", // element to watch
      start: "top 80%", // when element hits 80% of viewport
    },
  }
);
gsap.fromTo(".cafe-menu .imgtwo", {
  y: 35, opacity: 0, duration: 0.7, scale: 0.8, delay: 0.2, ease: "power2.out" },
  { y: 0, opacity: 1, scale: 1,
    scrollTrigger: {
      trigger: ".cafe-menu", // element to watch
      start: "top 80%", // when element hits 80% of viewport
    },
  }
);
gsap.from(".cafe-menu .menu span",
  {
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
  },
);