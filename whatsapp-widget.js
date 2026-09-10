/**
 * ==========================================================================
 * BARSOI DENT CARE CLINIC - AUTOMATED WHATSAPP ASSISTANT
 * Real Verified Phone: +91 7631 272 422
 * Doctor: Dr. Musarrat Parveen | Location: SH98, Neemtala Chowk, Barsoi
 * ==========================================================================
 */

(function () {
  const CLINIC_WHATSAPP = "917631272422";
  const CLINIC_PHONE_DISPLAY = "+91 7631 272 422";
  const DOCTOR_NAME = "Dr. Musarrat Parveen";
  const CLINIC_NAME = "Barsoi Dent Care Clinic";
  const CLINIC_ADDRESS = "SH98, Neemtala Chowk, Barsoi, Katihar - 855102, Bihar";

  let conversationStep = "root";
  let bookingData = {
    patientName: "",
    service: "",
    date: ""
  };
  let lastSubmitTimestamp = 0;

  function initWidget() {
    const container = document.createElement("div");
    container.className = "wa-widget-container";
    container.innerHTML = `
      <button class="wa-launch-btn" id="waLaunchBtn" title="Chat on WhatsApp" aria-label="Open WhatsApp Assistant">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="wa-pulse-dot"></span>
      </button>

      <div class="wa-chat-window" id="waChatWindow">
        <!-- Header -->
        <div class="wa-chat-header">
          <div class="wa-header-profile">
            <div class="wa-header-avatar">
              <i class="fa-solid fa-tooth"></i>
              <span class="wa-live-dot"></span>
            </div>
            <div class="wa-header-text">
              <h4>${CLINIC_NAME}</h4>
              <p>${DOCTOR_NAME} • Automated Assistant</p>
            </div>
          </div>
          <button class="wa-close-btn" id="waCloseBtn" aria-label="Close Chat">&times;</button>
        </div>

        <!-- Chat History -->
        <div class="wa-chat-body" id="waChatBody">
          <div class="wa-bubble wa-bubble-bot">
            👋 <strong>Welcome to ${CLINIC_NAME}!</strong><br/>
            Clinic Owner: <strong>${DOCTOR_NAME}</strong><br/><br/>
            How can we assist you today? Select an option below or type a query:
            <div class="wa-time">${getFormattedTime()}</div>
          </div>

          <div class="wa-options-box" id="waRootChips">
            <button class="wa-chip" data-action="book">
              <span>📅 Book Appointment</span>
              <i class="fa-solid fa-angle-right"></i>
            </button>
            <button class="wa-chip" data-action="pricing">
              <span>💰 Treatment Fee Inquiry</span>
              <i class="fa-solid fa-angle-right"></i>
            </button>
            <button class="wa-chip" data-action="pain">
              <span>🚨 Severe Tooth Pain</span>
              <i class="fa-solid fa-angle-right"></i>
            </button>
            <button class="wa-chip" data-action="timing_loc">
              <span>📍 Address & Timings</span>
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </div>
        </div>

        <!-- Footer Input -->
        <div class="wa-chat-footer">
          <form class="wa-input-box" onsubmit="event.preventDefault(); window.submitWaInput();">
            <input type="text" id="waInputText" class="wa-input" placeholder="Type your message..." maxlength="200" autocomplete="off" />
            <button type="submit" class="btn btn-whatsapp btn-sm" style="padding: 0 14px; border-radius: 50%;" aria-label="Send Message">
              <i class="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const launchBtn = document.getElementById("waLaunchBtn");
    const closeBtn = document.getElementById("waCloseBtn");
    const chatWindow = document.getElementById("waChatWindow");

    launchBtn.addEventListener("click", () => chatWindow.classList.toggle("active"));
    closeBtn.addEventListener("click", () => chatWindow.classList.remove("active"));

    document.getElementById("waChatBody").addEventListener("click", (e) => {
      const chip = e.target.closest(".wa-chip");
      if (!chip) return;

      const action = chip.getAttribute("data-action");
      const service = chip.getAttribute("data-service");
      const slot = chip.getAttribute("data-slot");

      if (action) handleAction(action, chip.innerText.trim());
      else if (service) handleServicePicked(service);
      else if (slot) handleSlotPicked(slot);
    });
  }

  function getFormattedTime() {
    const d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m} ${ampm}`;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function addBubble(type, text, extraHtml = "") {
    const body = document.getElementById("waChatBody");
    if (!body) return;
    const div = document.createElement("div");
    div.className = `wa-bubble ${type === "bot" ? "wa-bubble-bot" : "wa-bubble-user"}`;
    const safeText = type === "user" ? escapeHtml(text) : text;
    div.innerHTML = `
      ${safeText}
      ${extraHtml}
      <div class="wa-time">${getFormattedTime()}</div>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function handleAction(action, label) {
    addBubble("user", label);

    setTimeout(() => {
      if (action === "book") {
        conversationStep = "pick_service";
        addBubble(
          "bot",
          "Please select the dental treatment you require:",
          `
          <div class="wa-options-box" style="margin-top:8px;">
            <button class="wa-chip" data-service="Root Canal Treatment (RCT)">🦷 Root Canal (RCT)</button>
            <button class="wa-chip" data-service="Tooth Extraction">🩺 Tooth Extraction / Pain</button>
            <button class="wa-chip" data-service="Teeth Cleaning & Scaling">✨ Teeth Cleaning & Scaling</button>
            <button class="wa-chip" data-service="Cavity & Dental Filling">🛡️ Dental Filling</button>
            <button class="wa-chip" data-service="Dental Wiring & Alignment">📐 Dental Wiring / Braces</button>
            <button class="wa-chip" data-service="General Consultation">📋 General Checkup</button>
          </div>
          `
        );
      } else if (action === "pricing") {
        addBubble(
          "bot",
          `<strong>Treatment Cost Inquiry:</strong><br/><br/>
          Fees are based on standard clinical checkup with ${DOCTOR_NAME}.<br/>
          • Checkup & Consultation: Affordable clinic rates<br/>
          • Extractions & Root Canal: Tailored to case severity<br/><br/>
          Connect directly on WhatsApp for an exact estimate:`,
          `
          <div style="margin-top:10px;">
            <a href="https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent("Hello Dr. Musarrat Parveen, I would like to inquire about treatment fees at Barsoi Dent Care Clinic.")}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="width:100%;">
              <i class="fa-brands fa-whatsapp"></i> Chat for Quote (${CLINIC_PHONE_DISPLAY})
            </a>
          </div>
          `
        );
        addRestartOption();
      } else if (action === "pain") {
        addBubble(
          "bot",
          `🚨 <strong>Urgent Tooth Pain Support:</strong><br/><br/>
          Rinse with warm water. Avoid extreme hot or cold foods. Dr. Musarrat Parveen prioritizes urgent dental pain consultations during clinic hours (9 AM – 4 PM).`,
          `
          <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
            <a href="https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent("URGENT: Hello Dr. Musarrat Parveen, I have severe tooth pain and need an appointment at Barsoi Dent Care Clinic.")}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="width:100%;">
              <i class="fa-brands fa-whatsapp"></i> Send Urgent WhatsApp
            </a>
            <a href="tel:+${CLINIC_WHATSAPP}" class="btn btn-outline btn-sm" style="width:100%;">
              <i class="fa-solid fa-phone"></i> Call: ${CLINIC_PHONE_DISPLAY}
            </a>
          </div>
          `
        );
        addRestartOption();
      } else if (action === "timing_loc") {
        addBubble(
          "bot",
          `📍 <strong>Location & Hours:</strong><br/><br/>
          • <strong>Address:</strong> ${CLINIC_ADDRESS}<br/>
          • <strong>Landmark:</strong> Neemtala Chowk, SH98<br/>
          • <strong>Timings:</strong> Mon – Sun (9:00 AM – 4:00 PM)<br/>
          • <strong>Phone:</strong> ${CLINIC_PHONE_DISPLAY}`,
          `
          <div style="margin-top:10px; display:flex; flex-direction:column; gap:6px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=25.6195096,87.9281977" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width:100%;">
              <i class="fa-solid fa-location-dot"></i> Open Google Maps Directions
            </a>
            <a href="https://www.google.com/search?q=barsoi+dent+care+clinic+photos" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width:100%;">
              <i class="fa-brands fa-google" style="color:#ea4335;"></i> Google Reviews & Photos
            </a>
            <a href="https://www.facebook.com/search/top?q=Barsoi%20Dent%20Care%20Clinic" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width:100%;">
              <i class="fa-brands fa-facebook" style="color:#1877f2;"></i> Facebook Page
            </a>
          </div>
          `
        );
        addRestartOption();
      }
    }, 300);
  }

  function handleServicePicked(service) {
    bookingData.service = service;
    addBubble("user", service);

    setTimeout(() => {
      conversationStep = "pick_slot";
      addBubble(
        "bot",
        `Selected: <strong>${service}</strong>.<br/>When would you like to visit?`,
        `
        <div class="wa-options-box" style="margin-top:8px;">
          <button class="wa-chip" data-slot="Today (Morning 9 AM - 1 PM)">🌅 Today (Morning)</button>
          <button class="wa-chip" data-slot="Today (Afternoon 1 PM - 4 PM)">☀️ Today (Afternoon)</button>
          <button class="wa-chip" data-slot="Tomorrow">📅 Tomorrow</button>
          <button class="wa-chip" data-slot="Sunday Consultation">🗓️ Sunday</button>
        </div>
        `
      );
    }, 300);
  }

  function handleSlotPicked(slot) {
    bookingData.date = slot;
    addBubble("user", slot);

    setTimeout(() => {
      conversationStep = "enter_patient_name";
      addBubble(
        "bot",
        `Please type the <strong>Patient's Name</strong> in the message box below and click send:`
      );
      document.getElementById("waInputText").focus();
    }, 300);
  }

  window.submitWaInput = function () {
    const input = document.getElementById("waInputText");
    if (!input) return;

    // Anti-spam rate limiting protection
    const now = Date.now();
    if (now - lastSubmitTimestamp < 600) return;
    lastSubmitTimestamp = now;

    // String length boundary protection
    const val = input.value.trim().substring(0, 200);
    if (!val) return;

    addBubble("user", val);
    input.value = "";

    setTimeout(() => {
      if (conversationStep === "enter_patient_name") {
        bookingData.patientName = val;
        finishBooking();
      } else {
        // Keyword parsing
        const lower = val.toLowerCase();
        if (lower.includes("price") || lower.includes("cost") || lower.includes("fee")) {
          handleAction("pricing", "Pricing Inquiry");
        } else if (lower.includes("pain") || lower.includes("emergency") || lower.includes("dard")) {
          handleAction("pain", "Tooth Pain");
        } else if (lower.includes("time") || lower.includes("open") || lower.includes("address") || lower.includes("location")) {
          handleAction("timing_loc", "Location & Hours");
        } else {
          const directMsg = `Hello Dr. Musarrat Parveen, I have an inquiry regarding Barsoi Dent Care Clinic: ${val}`;
          addBubble(
            "bot",
            `Forwarding your message to <strong>${DOCTOR_NAME}</strong>:`,
            `
            <div style="margin-top:8px;">
              <a href="https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(directMsg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="width:100%;">
                <i class="fa-brands fa-whatsapp"></i> Send to WhatsApp (${CLINIC_PHONE_DISPLAY})
              </a>
            </div>
            `
          );
          addRestartOption();
        }
      }
    }, 300);
  };

  function finishBooking() {
    const name = escapeHtml(bookingData.patientName || "Patient").substring(0, 50);
    const srv = escapeHtml(bookingData.service || "Consultation").substring(0, 60);
    const slot = escapeHtml(bookingData.date || "Next Available Slot").substring(0, 60);

    const msg = `Hello Dr. Musarrat Parveen,%0A%0AI would like to book a dental appointment at *Barsoi Dent Care Clinic*:%0A• *Patient Name:* ${encodeURIComponent(name)}%0A• *Treatment:* ${encodeURIComponent(srv)}%0A• *Preferred Slot:* ${encodeURIComponent(slot)}%0A• *Clinic:* SH98, Neemtala Chowk, Barsoi%0A%0APlease confirm my appointment. Thank you!`;

    const waUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${msg}`;

    addBubble(
      "bot",
      `✅ <strong>Appointment Summary Ready:</strong><br/><br/>
      • <strong>Patient:</strong> ${name}<br/>
      • <strong>Service:</strong> ${srv}<br/>
      • <strong>Slot:</strong> ${slot}<br/><br/>
      Click below to send this directly to ${DOCTOR_NAME}:`,
      `
      <div style="margin-top:10px;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width:100%; font-size:0.92rem;">
          <i class="fa-brands fa-whatsapp"></i> Confirm on WhatsApp Now
        </a>
      </div>
      `
    );

    addRestartOption();
    conversationStep = "root";
  }

  function addRestartOption() {
    setTimeout(() => {
      const body = document.getElementById("waChatBody");
      const restartDiv = document.createElement("div");
      restartDiv.style.marginTop = "8px";
      restartDiv.innerHTML = `
        <button class="wa-chip" style="justify-content:center; background:#f8fafc; color:#64748b;" onclick="window.restartChat()">
          <i class="fa-solid fa-rotate-left" style="margin-right:6px;"></i> Main Menu
        </button>
      `;
      body.appendChild(restartDiv);
      body.scrollTop = body.scrollHeight;
    }, 500);
  }

  window.restartChat = function () {
    const body = document.getElementById("waChatBody");
    bookingData = { patientName: "", service: "", date: "" };
    conversationStep = "root";
    body.innerHTML = `
      <div class="wa-bubble wa-bubble-bot">
        👋 <strong>Welcome back!</strong><br/>
        How else can we assist you with Barsoi Dent Care Clinic?
        <div class="wa-time">${getFormattedTime()}</div>
      </div>
      <div class="wa-options-box" id="waRootChips">
        <button class="wa-chip" data-action="book">
          <span>📅 Book Appointment</span>
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button class="wa-chip" data-action="pricing">
          <span>💰 Treatment Fee Inquiry</span>
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button class="wa-chip" data-action="pain">
          <span>🚨 Severe Tooth Pain</span>
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button class="wa-chip" data-action="timing_loc">
          <span>📍 Address & Timings</span>
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    `;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWidget);
  } else {
    initWidget();
  }
})();
