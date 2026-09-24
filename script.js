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


const revealElements =
  document.querySelectorAll(".reveal");


const youtubeGalleryGrid = document.getElementById("youtube-gallery-grid");

if (youtubeGalleryGrid) {
  const youtubeVideoIds = [
    { id: "WrFw1UA8f7s", title: "आफन्तको खोजीमा हिँडेको मान्छे म" },
    { id: "_9WOGxBFYbs", title: "Picnic Vlog 2082 II PPNEPAL" },
    { id: "PtbQ8zpsSlg", title: "हरिबोधनी एकादशी २०८२ कर्णाली नदीमा स्नान कार्यक्रम सम्पन्न" },
    { id: "0TtcBl6oJ8w", title: "Bratabandha Ceremony | Pranjal, Prajwol and Anjan" },
    { id: "XBjN-nNya6c", title: "Dakshinkali Temple Vlog | The Ancient Story" },
    { id: "sRRLAjzaFOs", title: "Sali Nadi Mela 2025 New Video" },
    { id: "JjcNJJRmTBE", title: "Picnic Vlog 2081 Barmelitol | Bardiya, Nepal" },
    { id: "MH3StJyfeIg", title: "Nainatal Vlog 2081 | Nepal to India" },
    { id: "2yCRS5tMGGo", title: "Dashain 2081" },
    { id: "vvSHX_-dMP0", title: "Welcome Programme Liverpool College" },
    { id: "xLJjFI6Dqsg", title: "Dharahara Vlog 2081" },
    { id: "_qw7xkyooY0", title: "Lucknow Vlog" },
    { id: "MTxnK3D0FCo", title: "Farewell of Grade 12 | Liverpool International College" },
    { id: "6TsXMzwKHik", title: "Holi 2080 | Huge Crowd at Basantapur" },
    { id: "gzW1B7gg3ig", title: "2nd Milton Music and Food Fest" },
    { id: "b52fgnTaUGI", title: "Panauti Hydropower Excursion Trip" },
    { id: "N8K1Ey0FccE", title: "Rote Ping | Nepali Indigenous Swing" },
    { id: "jNVbejXsopE", title: "Welcome Programme 2080 | Liverpool International College" },
    { id: "X6r8R7k9l60", title: "Shivapuri Nagarjun National Park" },
    { id: "7olYu3vY2DA", title: "Ghintang Song Group Dance" },
    { id: "rThbX5hzu00", title: "Oi Maicha Song Dance" },
    { id: "aAotF_b1Nh8", title: "Teachers Day Celebration 2080" },
    { id: "WS5JAnP0fwQ", title: "Bardiya District Football Competition" },
    { id: "eh1eWdQ1t6Y", title: "TAG Project Training Completed" },
    { id: "mCjrE9RUq8A", title: "51st Anniversary of Shree Bhagawati School" },
    { id: "zcXqT7O7fcU", title: "Aircraft Museum Opens in Nepalgunj" },
    { id: "GsF1VpAP77Q", title: "Bardiya District League Final Game" },
    { id: "6bprapzD-GI", title: "Public Holiday on the Occasion of Tamu Lhosar" },
    { id: "V6xSriuLzNY", title: "Gaidakot Municipality Child Talent Visit" },
    { id: "9RU248Vh6Xg", title: "Lions Club Bardiya Food Feeding Program" }
  ];

  youtubeVideoIds.forEach((video, index) => {
    const card = document.createElement("a");
    card.className = "gallery-card reveal";
    card.href = `https://www.youtube.com/watch?v=${video.id}`;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
      <div class="gallery-media">
        <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" />
      </div>
      <div class="gallery-meta">
        <span class="gallery-tag">Video</span>
        <h3>${video.title}</h3>
      </div>
    `;

    youtubeGalleryGrid.appendChild(card);
  });

  const generatedCards = youtubeGalleryGrid.querySelectorAll(".gallery-card");
  generatedCards.forEach((card, index) => {
    if (index % 3 === 1) card.classList.add("reveal-delay");
    if (index % 3 === 2) card.classList.add("reveal-delay-two");
  });

  const cardsForObserver = youtubeGalleryGrid.querySelectorAll(".reveal");
  cardsForObserver.forEach((element) => observer.observe(element));
}


revealElements.forEach(element => {

  observer.observe(element);

});


/* =========================
   GEAR DEVICE ACTIVE STATE
========================= */

const gearPanels = document.querySelectorAll(".gear-panel");
const gearDevices = document.querySelectorAll(".gear-device");

if (gearPanels.length && gearDevices.length) {
  const activateGear = (gearName) => {
    gearDevices.forEach(device => {
      device.classList.toggle("is-active", device.classList.contains(`gear-${gearName}`));
    });
  };

  const gearObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateGear(entry.target.dataset.gear);
      }
    });
  }, { threshold: 0.55 });

  gearPanels.forEach(panel => gearObserver.observe(panel));
}


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