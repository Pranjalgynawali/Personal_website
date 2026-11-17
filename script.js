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


const certificateDialog = document.getElementById("certificate-dialog");

if (certificateDialog) {
  const certificateAlbums = {
    badhaiyatal: ["Badhaiyatal 1.jpg", "Badhaiyatal 2.jpg", "Badhaiyatal 3.jpg"],
    jagaruk: ["jagaruk 1.jpg"],
    kalika: ["Kalika 1.jpg", "Kalika 2.jpg", "Kalika 3.jpg", "Kalika 4.jpg", "Kalika 5.jpg", "Kalika 6.jpg", "Kalika 7.jpg"],
    mayur: ["Mayur yuba club 1.jpg", "Mayur yuba club 2.jpg", "Mayur yuba club 3.jpg"],
    stan: ["stan 1.jpg", "stan 2.jpeg", "Stan 3.jpg", "stan 4.jpg", "stan 5.jpg"],
    "shree-bhagawati-tech": [
      "shree bhagawati san and gen sec school  1.jpg",
      "shree bhagawati san and gen sec school  2.jpg",
      "shree bhagawati san and gen sec school  3.jpg",
    ],
  };
  const certificateImage = document.getElementById("certificate-dialog-image");
  const certificateTitle = document.getElementById("certificate-dialog-title");
  const certificateIssuer = document.getElementById("certificate-dialog-issuer");
  const certificateDescription = document.getElementById("certificate-dialog-description");
  const originalCertificate = document.getElementById("certificate-dialog-original");
  const certificateAlbum = document.getElementById("certificate-album");
  const certificateAlbumGrid = document.getElementById("certificate-album-grid");
  const closeCertificateDialog = certificateDialog.querySelector(".certificate-dialog-close");

  document.querySelector(".gallery-grid")?.addEventListener("click", (event) => {
    const card = event.target.closest(".gallery-card");
    const details = card?.querySelector(".certificate-details");
    if (!card || !details) return;

    event.preventDefault();
    certificateImage.src = card.querySelector("img").src;
    certificateImage.alt = card.querySelector("img").alt;
    certificateTitle.textContent = card.querySelector("h3").textContent;
    certificateIssuer.textContent = details.querySelector(".certificate-issuer").textContent;
    certificateDescription.replaceChildren(...Array.from(details.querySelectorAll("p:not(.certificate-issuer)"), (paragraph) => paragraph.cloneNode(true)));
    originalCertificate.href = card.href;
    const album = certificateAlbums[card.dataset.album] || [];
    certificateAlbumGrid.replaceChildren(...album.map((fileName, index) => {
      const photoUrl = new URL(`public/certificate/Certificate%20photo/${encodeURIComponent(fileName)}`, window.location.href);
      const link = document.createElement("a");
      const image = document.createElement("img");
      link.href = photoUrl.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Open ceremony photo ${index + 1}`);
      image.src = photoUrl.href;
      image.alt = `Ceremony photo ${index + 1}`;
      image.loading = "lazy";
      link.appendChild(image);
      return link;
    }));
    certificateAlbum.hidden = album.length === 0;
    certificateDialog.showModal();
  });

  closeCertificateDialog.addEventListener("click", () => certificateDialog.close());
  certificateDialog.addEventListener("click", (event) => {
    if (event.target === certificateDialog) certificateDialog.close();
  });
}


const youtubeGalleryGrid = document.getElementById("youtube-gallery-grid");

const openPhotoAlbum = document.getElementById("open-photo-album");
const photoAlbumDialog = document.getElementById("photo-album-dialog");

if (openPhotoAlbum && photoAlbumDialog) {
  const photoFiles = [
    "1.JPG", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg",
    "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg",
    "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.png",
    "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg",
  ];
  const photoAlbumGrid = document.getElementById("photo-album-grid");

  photoFiles.forEach((fileName, index) => {
    const photoUrl = `public/Photos/${encodeURIComponent(fileName)}`;
    const link = document.createElement("a");
    const image = document.createElement("img");
    link.href = photoUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Open photo ${index + 1}`);
    image.src = photoUrl;
    image.alt = `Photo ${index + 1}`;
    image.loading = "lazy";
    link.appendChild(image);
    photoAlbumGrid.appendChild(link);
  });

  openPhotoAlbum.addEventListener("click", () => {
    photoAlbumDialog.showModal();
  });

  photoAlbumDialog.querySelector(".photo-album-close").addEventListener("click", () => photoAlbumDialog.close());
  photoAlbumDialog.addEventListener("click", (event) => {
    if (event.target === photoAlbumDialog) photoAlbumDialog.close();
  });
}

if (youtubeGalleryGrid) {
  const fallbackVideos = [
    { id: "WrFw1UA8f7s", title: "आफन्तको खोजीमा हिँडेको मान्छे म" },
    { id: "_9WOGxBFYbs", title: "Picnic Vlog 2082 II PPNEPAL" },
    { id: "PtbQ8zpsSlg", title: "हरिबोधनी एकादशी २०८२ कर्णाली नदीमा स्नान कार्यक्रम सम्पन्न | PPNEPAL" },
    { id: "0TtcBl6oJ8w", title: "BRATABANDHA CEREMONY | PRANJAL, PRAJWOL, AND ANJAN | PPNEPAL" },
    { id: "XBjN-nNya6c", title: "Dakshinkali Temple Vlog | The ancient story of its origin | PPNEPAL" },
    { id: "sRRLAjzaFOs", title: "Sali Nadi Mela 2025 New Video | PPNEPAL" },
    { id: "JjcNJJRmTBE", title: "Picnic Vlog 2081 Barmelitol - Bardiya, Nepal | PPNEPAL" },
    { id: "MH3StJyfeIg", title: "Nainatal Vlog 2081 Nepal To India | PPNEPAL" },
    { id: "2yCRS5tMGGo", title: "Dashain 2081 | PPNEPAL" },
    { id: "vvSHX_-dMP0", title: "Welcome Programme Liverpool collage" },
    { id: "xLJjFI6Dqsg", title: "Dharahara Vlog 2081" },
  ];

  const renderVideos = (videos) => {
    youtubeGalleryGrid.replaceChildren();

    videos.forEach((video, index) => {
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

      if (index % 3 === 1) card.classList.add("reveal-delay");
      if (index % 3 === 2) card.classList.add("reveal-delay-two");
      youtubeGalleryGrid.appendChild(card);
      observer.observe(card);
    });
  };

  renderVideos(fallbackVideos);
  fetch(new URL("api/youtube-videos", window.location.href))
    .then((response) => {
      if (!response.ok) throw new Error("YouTube feed unavailable");
      return response.json();
    })
    .then((videos) => {
      if (!Array.isArray(videos) || videos.length === 0) {
        throw new Error("YouTube feed returned no videos");
      }
      const dharaharaIndex = videos.findIndex((video) => /dharahara vlog/i.test(video.title));
      if (dharaharaIndex >= 0) renderVideos(videos.slice(0, dharaharaIndex + 1));
    })
    .catch(() => {
      // Keep the last known videos visible if the feed is unavailable.
    });
}


revealElements.forEach(element => {

  observer.observe(element);

});


const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const formData = new FormData(contactForm);
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    contactStatus.textContent = "";
    contactStatus.removeAttribute("data-state");

    try {
      const response = await fetch(new URL("api/contact", window.location.href), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Unable to send your message.");

      contactForm.reset();
      contactStatus.textContent = "Thanks for reaching out. Your message has been sent.";
      contactStatus.dataset.state = "success";
    } catch (error) {
      contactStatus.textContent = error.message || "Something went wrong. Please try again.";
      contactStatus.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send message";
    }
  });
}


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
  }, { threshold: window.matchMedia("(max-width: 800px)").matches ? 0.15 : 0.55 });

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