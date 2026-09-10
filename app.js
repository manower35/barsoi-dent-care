/**
 * ==========================================================================
 * BARSOI DENT CARE CLINIC - CLIENT APPLICATION
 * Doctor: Dr. Musarrat Parveen | Mobile: +91 7631 272 422
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveHours();
  initEstimator();
  initGallery();
  initFaq();
  initMobileDrawer();
  initImageProtection();
});

/* 1. Live IST Operating Status (9:00 AM - 4:00 PM IST) */
function initLiveHours() {
  const badge = document.getElementById("liveStatusBadge");
  if (!badge) return;

  function checkHours() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 3600000 * 5.5);

    const hours = ist.getHours();
    const mins = ist.getMinutes();
    const decTime = hours + mins / 60;

    // 09:00 to 16:00 Mon-Sun
    const isOpen = decTime >= 9.0 && decTime < 16.0;

    if (isOpen) {
      badge.className = "badge badge-open";
      badge.innerHTML = `<span>Open Now • 9:00 AM – 4:00 PM</span>`;
    } else {
      badge.className = "badge badge-closed";
      if (decTime < 9.0) {
        badge.innerHTML = `<span>Closed • Opens today at 9:00 AM</span>`;
      } else {
        badge.innerHTML = `<span>Closed • Opens tomorrow at 9:00 AM</span>`;
      }
    }
  }

  checkHours();
  setInterval(checkHours, 60000);
}

/* 2. Treatment Care & Procedure Estimator */
const PROCEDURES = {
  rct: {
    name: "Root Canal Treatment (RCT)",
    sittings: "2 – 3 Sittings",
    duration: "Approx. 45 mins",
    detail: "Removes infected pulp tissue to save your natural tooth from extraction."
  },
  extraction: {
    name: "Tooth Extraction",
    sittings: "1 Sitting",
    duration: "20 – 30 mins",
    detail: "Safe, sterile removal of severely damaged, decayed, or painful teeth under local numbing."
  },
  scaling: {
    name: "Teeth Cleaning & Scaling",
    sittings: "1 Sitting",
    duration: "30 – 40 mins",
    detail: "Ultrasonic cleaning to remove tartar, plaque, and surface stains from teeth and gum line."
  },
  filling: {
    name: "Dental Filling & Restoration",
    sittings: "1 Sitting",
    duration: "25 – 35 mins",
    detail: "Seals cavities with durable composite tooth-colored material to prevent decay spread."
  },
  wiring: {
    name: "Dental Wiring & Alignment",
    sittings: "Diagnostic Consultation",
    duration: "Comprehensive Assessment",
    detail: "Evaluation and orthodontic wiring plan for alignment of irregular or crowded teeth."
  },
  whitening: {
    name: "Teeth Whitening & Polish",
    sittings: "1 – 2 Sittings",
    duration: "40 mins",
    detail: "Enamel-safe stain removal and polishing to brighten discolored teeth."
  }
};

function initEstimator() {
  const sel = document.getElementById("treatmentSelect");
  if (!sel) return;

  function update(key) {
    const item = PROCEDURES[key] || PROCEDURES.rct;
    document.getElementById("estName").textContent = item.name;
    document.getElementById("estSittings").textContent = item.sittings;
    document.getElementById("estDuration").textContent = item.duration;
    document.getElementById("estDetail").textContent = item.detail;

    const btn = document.getElementById("estWaBtn");
    if (btn) {
      const text = `Hello Dr. Musarrat Parveen, I would like to inquire about *${item.name}* at Barsoi Dent Care Clinic.`;
      btn.href = `https://wa.me/917631272422?text=${encodeURIComponent(text)}`;
    }
  }

  sel.addEventListener("change", (e) => update(e.target.value));
  update("rct");
}

/* 3. Photo Gallery Filtering & Lightbox */
function initGallery() {
  const filterBtns = document.querySelectorAll(".gallery-nav-btn");
  const cards = document.querySelectorAll(".gallery-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      cards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-cat") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

window.openLightbox = function (src, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (!modal || !img) return;

  img.src = src;
  cap.textContent = caption || "Barsoi Dent Care Clinic";
  modal.classList.add("active");
};

window.closeLightbox = function () {
  const modal = document.getElementById("lightboxModal");
  if (modal) modal.classList.remove("active");
};

/* 4. Symptom Click Trigger */
window.triageSymptom = function (symp) {
  const msg = `Hello Dr. Musarrat Parveen, I am experiencing *${symp}*. Please advise when I can visit Barsoi Dent Care Clinic for a checkup.`;
  window.open(`https://wa.me/917631272422?text=${encodeURIComponent(msg)}`, "_blank");
};

/* 5. FAQ Accordion */
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-question");
    if (!q) return;
    q.addEventListener("click", () => {
      const active = item.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("active"));
      if (!active) item.classList.add("active");
    });
  });
}

/* 6. Mobile Drawer Sidebar & Category Navigation */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("menuToggleBtn");
  const closeBtn = document.getElementById("drawerCloseBtn");
  const overlay = document.getElementById("drawerOverlay");
  const drawer = document.getElementById("mobileDrawer");

  if (!drawer || !toggleBtn) return;

  function openDrawer() {
    drawer.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);

  // Close on link click and optionally pre-select treatment in estimator
  document.querySelectorAll(".drawer-service-item, .drawer-cat-btn").forEach((link) => {
    link.addEventListener("click", () => {
      const treatment = link.getAttribute("data-treatment");
      if (treatment) {
        const sel = document.getElementById("treatmentSelect");
        if (sel) {
          sel.value = treatment;
          sel.dispatchEvent(new Event("change"));
        }
      }
      closeDrawer();
    });
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("active")) {
      closeDrawer();
    }
  });
}

/* 7. Protection Layer: Image Fallback & Runtime Error Guard */
window.addEventListener("error", (e) => {
  console.warn("Clinic UI guarded against runtime exception:", e.message);
});

function initImageProtection() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      this.onerror = null;
      this.src =
        "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22400%22%20viewBox%3D%220%200%20600%20400%22%3E%3Crect%20fill%3D%22%23f1f5f9%22%20width%3D%22600%22%20height%3D%22400%22%2F%3E%3Ctext%20fill%3D%22%230284c7%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2248%25%22%20text-anchor%3D%22middle%22%3EBarsoi%20Dent%20Care%20Clinic%3C%2Ftext%3E%3Ctext%20fill%3D%22%2364748b%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20x%3D%2250%25%22%20y%3D%2255%25%22%20text-anchor%3D%22middle%22%3EDr.%20Musarrat%20Parveen%20%E2%80%A2%20Barsoi%2C%20Katihar%3C%2Ftext%3E%3C%2Fsvg%3E";
      this.alt = "Barsoi Dent Care Clinic - Dr. Musarrat Parveen";
    });
  });
}


