(() => {
    "use strict";

    /* ======================================================
         CONSTANTS
      ====================================================== */
    const GOOGLE_SCRIPT_URL = "?sheet=confirm";

    /* ======================================================
         HELPERS
      ====================================================== */
    const qs = (selector, parent = document) => parent.querySelector(selector);

    const qsa = (selector, parent = document) =>
        parent.querySelectorAll(selector);

    /* ======================================================
         SWIPER
      ====================================================== */

    function initSwiper() {
        new Swiper(".main-swiper", {
            spaceBetween: 10,
            navigation: {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
            },
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            loop: true,
            effect: "fade",
            fadeEffect: { crossFade: true },
            speed: 1000,
        });
    }

    /* ======================================================
         MUSIC
      ====================================================== */

    function initMusic() {
        const audio = qs("#audio");
        const icon = qs("#iconSvg");
        const btn = qs("#player-btn");

        if (!audio || !icon || !btn) return;

        btn.addEventListener("click", () => {
            if (!audio.src) return;
            audio.paused ? audio.play() : audio.pause();
        });

        audio.addEventListener("play", () => icon.classList.add("spin"));
        audio.addEventListener("pause", () => icon.classList.remove("spin"));
    }

    /* ======================================================
         DRESSCODE ANIMATION
      ====================================================== */

    function initDresscodeAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".colors-grid",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(".color1", { x: -100, opacity: 0,  duration: 0.8 })
            .from(".color2", { x: -100, opacity: 0, duration: 0.8}, "-=0.4")
            .from(".color3", { x: -100, opacity: 0, duration: 0.8 }, "-=0.4");
    }

    /* ======================================================
         TIMELINE ANIMATION
      ====================================================== */

      function initTimeline() {
        const section = document.querySelector(".timeline");
        if (!section) return;
      
        const content = section.querySelector(".timeline-content");
        const bg = section.querySelector(".cover-bg");
        const divider = section.querySelector(".divider-flower");
        const title = section.querySelector(".timeline-title");
        const items = section.querySelectorAll(".timeline-item");
      
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
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
          bg,
          {
            rotateY: -180,
            scale: 0.8,
            opacity: 0,
            duration: 1.8,
            ease: "back.out(1.2)",
            transformOrigin: "center center"
          },
          "-=0.5"
        );
      
        tl.from([divider, title], {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out"
        }, "-=1.5");
      
        // =========================
        // Animate từng item theo thứ tự
        // =========================
        items.forEach((item, index) => {
          const icon = item.querySelector(".icon-animate");
          const time = item.querySelector(".time");
          const overlap = index === 0 ? 0 : 0.2 + index * 0.1;
      
          // Item fade
          tl.from(
            item,
            {
              opacity: 0,
              y: 60,
              duration: 0.6,
              ease: "power2.out"
            },
            `-=1.2`
          );
      
          // Icon pop
          if (icon) {
            tl.from(
              icon,
              {
                scale: 0,
                rotation: -120,
                opacity: 0,
                duration: 0.7,
                ease: "back.out(1.6)"
              },
              "<0.2"
            );
          }
      
          // Time fade
          if (time) {
            tl.from(
              time,
              {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power2.out"
              },
              "<0.4"
            );
          }
        });
      }

    /* ======================================================
         FAQ
      ====================================================== */

    function initFAQ() {
        const items = qsa(".faq-item");

        function openItem(el) {
            const content = qs(".faq-content", el);
            const icon = qs(".icon", el);
            if (!content || !icon) return;

            el.classList.add("active");

            gsap.to(content, { height: "auto", duration: 0.4, ease: "power2.out" });
            gsap.to(icon, {
                rotate: 180,
                duration: 0.3,
                onComplete: () => (icon.textContent = "−"),
            });
        }

        function closeItem(el) {
            const content = qs(".faq-content", el);
            const icon = qs(".icon", el);
            if (!content || !icon) return;

            el.classList.remove("active");

            gsap.to(content, { height: 0, duration: 0.3, ease: "power2.inOut" });
            gsap.to(icon, {
                rotate: 0,
                duration: 0.3,
                onComplete: () => (icon.textContent = "+"),
            });
        }

        items.forEach((item) => {
            const header = qs(".faq-header", item);
            const content = qs(".faq-content", item);
            if (!header) return;

            if (item.classList.contains("active")) {
                gsap.set(content, { height: "auto" });
            }

            header.addEventListener("click", () => {
                const isOpen = item.classList.contains("active");

                items.forEach((el) => {
                    if (el !== item) closeItem(el);
                });

                isOpen ? closeItem(item) : openItem(item);
            });
        });
    }

    /* ======================================================
         COUNTDOWN
      ====================================================== */

    function startCountdown(targetDate) {
        const daysEl = qs("#days");
        const hoursEl = qs("#hours");
        const minsEl = qs("#mins");
        const secsEl = qs("#secs");

        if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

        const timer = setInterval(update, 1000);
        update();

        function update() {
            const distance = targetDate - Date.now();

            if (distance <= 0) {
                clearInterval(timer);
                daysEl.textContent =
                    hoursEl.textContent =
                    minsEl.textContent =
                    secsEl.textContent =
                    "00";
                return;
            }

            const days = Math.floor(distance / 86400000);
            const hours = Math.floor((distance % 86400000) / 3600000);
            const mins = Math.floor((distance % 3600000) / 60000);
            const secs = Math.floor((distance % 60000) / 1000);

            daysEl.textContent = String(days).padStart(2, "0");
            hoursEl.textContent = String(hours).padStart(2, "0");
            minsEl.textContent = String(mins).padStart(2, "0");
            secsEl.textContent = String(secs).padStart(2, "0");
        }
    }

    /* ======================================================
         RSVP
      ====================================================== */

    function initRSVP() {
        const form = document.forms["rsvpForm"];
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const data = Object.fromEntries(formData.entries());

            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams(data),
                });

                form.reset();
                Swal.fire("Success!", "Information sent.", "success");
            } catch (err) {
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        });
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
        initSwiper();
        initMusic();
        initDresscodeAnimation();
        initTimeline();
        initFAQ();
        initRSVP();
        // startCountdown(new Date("2026-03-06T16:00:00"));
    }

    document.addEventListener("DOMContentLoaded", init);
})();
