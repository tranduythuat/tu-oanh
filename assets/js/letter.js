// // Kích hoạt ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);
// // Gọi các hiệu ứng có sẵn
// document.addEventListener("DOMContentLoaded", () => {
//   gsapFlipIn(".animate-flip");
//   gsapFlipInThenYoyo(".animate-flip-yoyo");
//   gsapFadeIn(".fade-in");
//   gsapFadeInForEnd(".fade-in-end");
//   gsapFadeInThenYoyo(".fade-in-yoyo");
//   gsapFadeRight(".fade-right");
//   gsapFadeLeft(".fade-left");
//   gsapFadeUp(".fade-up");
//   gsapFadeDown(".fade-down");
//   gsapRotateBottomLeft(".rotate-bl");
//   gsapRotateBottomRight(".rotate-br");
//   gsapRotateBottomLeftThenYoyo(".rotate-bl-yoyo");
//   gsapRotateBottomRightThenYoyo(".rotate-br-yoyo");
//   gsapFlipVerticalLeft(".flip-vertical-left");
//   gsapRollInLeft(".roll-in-left");
//   gsap_rotate_bl__float(".rotate-bl--float");

//   const tl = gsap.timeline({
//     repeatDelay: 0,  // delay giữa các lần lặp
//     defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
//     scrollTrigger: {
//       trigger: ".letter-section",
//       start: "top 85%", // khi phần tử xuất hiện 80% trong viewport
//     }
//   });

//   // Thêm các animation theo thứ tự
//   tl.from(".couple-names", { x: 80, opacity: 0 }, "=0.8")        
//     .from(".date", { x: -80, opacity: 0 }, "-=0.5")       
//     tl.fromTo(
//       ".loveanyway",
//       {
//         rotation: -120,
//         scale: 0,
//         opacity: 0
//       },
//       {
//         rotation: 0,
//         scale: 1,
//         opacity: 1,
//         duration: 1.2,
//         ease: "back.out(1.6)",
//         transformOrigin: "50% 50%"
//       },
//       "-=0.4"
//     );    
// });

(() => {
  "use strict";
    function initTimeline() {
      const section = document.querySelector(".letter-section");
      if (!section) return;
    
      const content = section.querySelector(".content");
      const names = section.querySelector(".names");
      const letter = section.querySelector(".letter-img");
      const date = section.querySelector(".date");
    
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none none",
        }
      });
    
      // =========================
      // Section intro
      // =========================
      tl.fromTo(
        content,
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          clearProps: "filter"
        }
      );
    
      tl.from(
        names,
        {
          rotateY: -180,
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
          transformOrigin: "center center"
        },
        "-=0.5"
      );

      tl.fromTo(
        letter,
        {
          rotation: -120,
          scale: 0,
          opacity: 0
        },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.6)",
          transformOrigin: "50% 50%"
        },
        "-=0.4"
      )    
      .from(date, { y: 100, opacity: 0 }, "-=0.4");
    }

  function initAnimations() {
    const animationMap = {
        flip: gsapFlipIn,
        "flip-yoyo": gsapFlipInThenYoyo,

        "fade-in": gsapFadeIn,
        "fade-in-end": gsapFadeInForEnd,
        "fade-in-yoyo": gsapFadeInThenYoyo,
        "fade-in-pulse": gsapFadeInThenPulse,

        "fade-right": gsapFadeRight,
        "fade-left": gsapFadeLeft,
        "fade-up": gsapFadeUp,
        "fade-down": gsapFadeDown,

        "rotate-bl": gsapRotateBottomLeft,
        "rotate-br": gsapRotateBottomRight,
        "rotate-bl-yoyo": gsapRotateBottomLeftThenYoyo,
        "rotate-br-yoyo": gsapRotateBottomRightThenYoyo,

        "flip-vertical-left": gsapFlipVerticalLeft,
        "flip-vertical-bottom": gsapFlipVerticalBottom,

        "roll-in-left": gsapRollInLeft,
        "rotate-bl--float": gsap_rotate_bl__float,
    };

    document.querySelectorAll("[data-animate]").forEach((el) => {
        const type = el.dataset.animate;
        const fn = animationMap[type];

        if (!fn) {
            console.warn(`Animation "${type}" not found.`);
            return;
        }

        const options = {
            delay: parseFloat(el.dataset.animateDelay) || 0,
            duration: parseFloat(el.dataset.animateDuration) || 1,
            scrollStart: el.dataset.animateScrollStart || "top 85%",
        };

        fn(el, options);
    });
  }

  /* ======================================================
       BOOTSTRAP
    ====================================================== */

  function init() {
      gsap.registerPlugin(ScrollTrigger);
      initAnimations();
      initTimeline();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
