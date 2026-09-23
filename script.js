/* =========================
   SUB-NAVIGATION MOBILE MENU
========================= */

const menuToggleSub = document.querySelector(".menu-toggle-sub");
const subNavLinks = document.querySelector(".sub-nav-links");

if (menuToggleSub && subNavLinks) {
  menuToggleSub.addEventListener("click", () => {
    const isOpen = subNavLinks.classList.toggle("open");
    menuToggleSub.setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll(".sub-nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      subNavLinks.classList.remove("open");
      menuToggleSub.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================
   PANORAMIC HERO 3D PARALLAX
========================= */

const heroSection = document.querySelector(".panoramic-hero");
const heroBg = document.querySelector(".hero-landscape-bg");
const heroBrand = document.querySelector(".hero-brand-center");

if (heroSection && heroBg && heroBrand) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroBg.style.transform = `scale(1.05) translate(${x * -22}px, ${y * -16}px)`;
    heroBrand.style.transform = `translate(${x * 24}px, ${y * 18}px)`;
  });

  heroSection.addEventListener("mouseleave", () => {
    heroBg.style.transform = "";
    heroBrand.style.transform = "";
  });
}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.15
  }
);


revealElements.forEach(element => {

  observer.observe(element);

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================
   CAMERA VIEWFINDER TIMECODE (24 FPS)
========================= */

const timecodeElement = document.querySelector(".cam-timecode");

if (timecodeElement) {
  let hours = 0;
  let minutes = 4;
  let seconds = 18;
  let frames = 0;

  setInterval(() => {
    frames++;
    if (frames >= 24) {
      frames = 0;
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
    }

    const pad = (n) => String(n).padStart(2, "0");
    timecodeElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
  }, 1000 / 24);
}


/* =========================
   CINEMATIC SPOTLIGHT TRACKER
========================= */

window.addEventListener("mousemove", (e) => {
  const x = Math.round((e.clientX / window.innerWidth) * 100);
  const y = Math.round((e.clientY / window.innerHeight) * 100);
  document.documentElement.style.setProperty("--mouse-x", `${x}%`);
  document.documentElement.style.setProperty("--mouse-y", `${y}%`);
});


/* =========================
   CINEMATIC DUST MOTES & BOKEH PARTICLES
========================= */

const liveCanvas = document.getElementById("live-canvas");

if (liveCanvas) {
  const ctx = liveCanvas.getContext("2d");
  let width, height, dpr;
  let particles = [];
  const particleCount = Math.min(window.innerWidth < 768 ? 24 : 48, 55);

  const colors = [
    { fill: "rgba(200, 109, 61,", glow: "rgba(200, 109, 61, 0.4)" }, // warm orange
    { fill: "rgba(242, 198, 109,", glow: "rgba(242, 198, 109, 0.5)" }, // golden light
    { fill: "rgba(255, 235, 205,", glow: "rgba(255, 235, 205, 0.4)" }, // warm white bokeh
    { fill: "rgba(135, 100, 78,", glow: "rgba(135, 100, 78, 0.3)" }   // terracotta
  ];

  const mouse = {
    x: null,
    y: null,
    radius: 130
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    liveCanvas.width = width * dpr;
    liveCanvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  class DustMote {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 15;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.45 + 0.18);
      this.radius = Math.random() < 0.2 ? Math.random() * 2.5 + 2.2 : Math.random() * 1.5 + 1.0;
      this.palette = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.4 + 0.18;
      this.angle = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.angle += this.wobbleSpeed;
      this.x += this.vx + Math.sin(this.angle) * 0.25;
      this.y += this.vy;

      // Subtle mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy);

        if (distance < mouse.radius && distance > 0) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x += (dx / distance) * force * 2.2;
          this.y += (dy / distance) * force * 2.2;
        }
      }

      // Wrap boundaries
      if (this.y < -15) this.reset();
      if (this.x < -15) this.x = width + 15;
      if (this.x > width + 15) this.x = -15;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.palette.fill} ${this.alpha})`;
      ctx.shadowColor = this.palette.glow;
      ctx.shadowBlur = this.radius * 2.5;
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new DustMote());
    }
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle golden connection lines between close dust motes
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 80) {
          const lineAlpha = (1 - dist / 80) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(242, 198, 109, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  init();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animate();
  }

  window.addEventListener("resize", () => {
    resize();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }
  });
}