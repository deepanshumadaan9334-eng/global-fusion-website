// GLOBAL FUSION site enhancements â€” contact details
// This file keeps the existing navigation and adds verified contact details.
const BUSINESS_EMAIL = "globalfusionhansi.25@gmail.com";
const PHONE_DISPLAY = "+91 87082 88160";
const PHONE_LINK = "tel:+918708288160";
const WHATSAPP_LINK = "https://wa.me/918708288160";

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === current) a.classList.add("active");
});
document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Configure existing enquiry forms to send to the business email.
document.querySelectorAll("form[data-mailto]").forEach(form => {
  form.dataset.email = BUSINESS_EMAIL;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(form.dataset.subject || "GLOBAL FUSION enquiry");
    const body = encodeURIComponent([...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n"));
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  });
});

// Add accurate contact details to the existing footer on every page.
document.querySelectorAll(".footer-grid").forEach(grid => {
  const contactColumn = [...grid.children].find(col =>
    col.querySelector("h4")?.textContent.toLowerCase().includes("get in touch")
  );
  if (contactColumn) {
    const footerLinks = contactColumn.querySelector(".footer-links");
    if (footerLinks) {
      footerLinks.innerHTML = `
        <a href="mailto:${BUSINESS_EMAIL}">Email: ${BUSINESS_EMAIL}</a>
        <a href="${PHONE_LINK}">Phone: ${PHONE_DISPLAY}</a>
        <a href="${WHATSAPP_LINK}" target="_blank" rel="noopener">WhatsApp: ${PHONE_DISPLAY}</a>
        <span class="small">Haryana, India</span>`;
    }
  }
});

// Floating WhatsApp contact shortcut.
if (!document.querySelector(".gf-whatsapp")) {
  const wa = document.createElement("a");
  wa.className = "gf-whatsapp";
  wa.href = WHATSAPP_LINK;
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "Chat with GLOBAL FUSION on WhatsApp");
  wa.textContent = "WhatsApp";
  wa.style.cssText = "position:fixed;right:20px;bottom:20px;z-index:50;background:#176b45;color:#fff;padding:13px 18px;border-radius:30px;font:600 14px Arial,sans-serif;box-shadow:0 5px 20px #0003";
  document.body.appendChild(wa);
}
