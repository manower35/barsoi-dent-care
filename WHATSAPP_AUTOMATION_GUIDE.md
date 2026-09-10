# WhatsApp Automation & Auto-Reply Setup Guide
## Barsoi Dent Care Clinic (Dr. Musarrat Parveen)

This guide provides instructions on how **Barsoi Dent Care Clinic** (+91 7631 272 422) can automate customer responses directly on WhatsApp using both:
1. **The Built-in Website Automated Triage Bot** (Already coded into `index.html` & `whatsapp-widget.js`).
2. **WhatsApp Business Automated Replies** (Free built-in auto-responder for Android & iPhone).
3. **Automated Server Webhook / Cloud API** (Optional 24/7 AI responder).

---

## 1. How the Website Triage Automation Works

Whenever a patient visits the website:
- A floating WhatsApp assistant button appears on screen.
- When clicked, it provides instant automated conversational options:
  * 📅 **Book an Appointment** -> prompts for service, preferred slot, and patient name.
  * 💰 **Treatment Pricing** -> gives transparent estimated guidance.
  * 🚨 **Emergency Tooth Pain** -> provides immediate first-aid tips & priority alert.
  * 📍 **Address, Map & Timings** -> gives SH98 Neemtala Chowk directions.
- The assistant automatically encodes all collected information into a clean WhatsApp link that immediately launches WhatsApp on the patient's phone/desktop with all fields filled:

```text
Hello Dr. Musarrat Parveen,

I would like to book a dental appointment at *Barsoi Dent Care Clinic*:
• Patient Name: [Patient Name]
• Treatment Required: [Selected Treatment]
• Preferred Slot: [Today Morning / Afternoon / Tomorrow]
• Location: Neemtala Chowk, Barsoi

Please confirm my appointment timing. Thank you!
```

---

## 2. Setting Up 100% Automated Instant Replies in WhatsApp Business (Free)

Dr. Musarrat Parveen can activate instant automated responses in the free **WhatsApp Business** app in 3 minutes:

### A. Greeting Message (Auto-Reply to every new patient message)
1. Open **WhatsApp Business** on your phone.
2. Tap **Settings** (or 3 dots in top right) -> **Business Tools** -> **Greeting message**.
3. Toggle **Send greeting message** to **ON**.
4. Set the message text to:
   ```text
   Namaskar! 🙏 Welcome to Barsoi Dent Care Clinic.

   We have received your appointment request. Dr. Musarrat Parveen or our clinic assistant will confirm your slot shortly.

   📍 Clinic Address: SH98, Neemtala Chowk, Barsoi, Katihar (855102)
   ⏰ Hours: Open Monday to Sunday, 9:00 AM – 4:00 PM
   📞 Direct Phone: +91 7631 272 422

   For urgent tooth pain, please call us directly!
   ```
5. Recipients: Select **Everyone**. Tap **Save**.

---

### B. Away Message (Auto-Reply after 4:00 PM or when clinic is closed)
1. In **Business Tools**, tap **Away message**.
2. Toggle **Send away message** to **ON**.
3. Set schedule to: **Outside of business hours** (9:00 AM – 4:00 PM).
4. Set the message text to:
   ```text
   Thank you for reaching out to Barsoi Dent Care Clinic! 🦷

   Our clinic hours are 9:00 AM – 4:00 PM daily. We are currently closed for the day, but we have noted your request and will prioritize your consultation when we open at 9:00 AM tomorrow.

   For severe dental emergencies, please call +91 7631272422.
   ```
5. Tap **Save**.

---

### C. Quick Replies (1-Tap Answers to Common Questions)
Save these quick shortcuts so you can respond in 1 tap:

1. Shortcut: `/fees`
   - **Text:** *"Our dental consultation starts at nominal clinic rates. Routine extractions and fillings are performed under painless anesthesia. Please visit for an exact diagnostic checkup."*
2. Shortcut: `/location`
   - **Text:** *"We are located on SH-98 at Neemtala Chowk, Barsoi, Katihar. Google Maps link: https://maps.google.com/?q=25.6195096,87.9281977"*
3. Shortcut: `/rct`
   - **Text:** *"Root Canal Treatment (RCT) at Barsoi Dent Care Clinic is gentle, nerve-preserving, and painless. It typically takes 2 to 3 sittings to eliminate infection and protect your natural tooth."*

---

## 3. Optional: 24/7 Cloud API Automated Bot Integration

If the clinic wishes to integrate an automated cloud backend (Node.js/Python) that automatically replies via the official WhatsApp Cloud API or Twilio WhatsApp API:

### Example Node.js Automated Webhook (`server.js`)
```javascript
const express = require('express');
const app = express();
app.use(express.json());

// Webhook endpoint
app.post('/whatsapp-webhook', (req, res) => {
  const incomingMsg = req.body.messages?.[0]?.text?.body?.toLowerCase();
  const fromNumber = req.body.messages?.[0]?.from;

  let replyText = "Welcome to Barsoi Dent Care Clinic! Please visit our clinic at Neemtala Chowk, SH98, Barsoi between 9 AM and 4 PM.";

  if (incomingMsg.includes("appointment")) {
    replyText = "Your appointment inquiry has been registered for Dr. Musarrat Parveen. We will confirm your timing within 15 minutes.";
  } else if (incomingMsg.includes("emergency") || incomingMsg.includes("pain")) {
    replyText = "EMERGENCY: Please call Dr. Musarrat directly at +917631272422 for immediate assistance.";
  }

  // Send message back using WhatsApp Cloud API
  console.log(`Auto-replying to ${fromNumber}: ${replyText}`);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('WhatsApp Bot running on port 3000'));
```

---

## 4. Website Launch Checklist
- [x] All 7 verified clinic photos connected to the interactive gallery.
- [x] Motorized operatory chair, clinic facade, and road access featured.
- [x] Live IST opening hours checker active (Mon-Sun 9 AM - 4 PM).
- [x] On-site automated WhatsApp assistant widget active.
- [x] Google Maps location pin linked to `25.6195096, 87.9281977`.
- [x] Contact numbers set to `+91 7631272422` and `+91 8589934604`.
