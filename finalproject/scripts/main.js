import {
  getThemePreference,
  setThemePreference,
} from "./utils/localStorageManager.js";

// --- Responsive Navigation (Hamburger Menu) ---
const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isExpanded =
      menuButton.getAttribute("aria-expanded") === "true" || false;
    menuButton.setAttribute("aria-expanded", !isExpanded);
    navMenu.classList.toggle("open");
    menuButton.innerHTML = navMenu.classList.contains("open") ? "×" : "☰";
  });
}

// --- Dynamic Footer Year ---
const currentYearSpan = document.getElementById("currentYear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// --- Wayfinding (Active Nav Link) ---
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];
navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// --- Modal Functionality (Basic) ---
const detailsModal = document.getElementById("details-modal");
const closeModalBtn = document.getElementById("close-modal-btn");

if (closeModalBtn && detailsModal) {
  closeModalBtn.addEventListener("click", () => {
    detailsModal.close();
  });
}
// Close modal on backdrop click
if (detailsModal) {
  detailsModal.addEventListener("click", (event) => {
    if (event.target === detailsModal) {
      detailsModal.close();
    }
  });
  // Close modal on ESC key
  detailsModal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      detailsModal.close();
    }
  });
}

// --- Initialize modules or page-specific scripts ---
// Determine current page and load specific modules.
// This example loads them directly in HTML for simplicity with type="module"
// but you could have a router-like logic here if it were a single-page app.

if (document.body.id === "dashboard-page") {
  import("./pages/dashboard.js").catch((err) =>
    console.error("Failed to load dashboard script:", err)
  );
} else if (document.body.id === "patient-detail-page") {
  import("./pages/patientDetail.js").catch((err) =>
    console.error("Failed to load patient detail script:", err)
  );
} else if (document.body.id === "log-session-page") {
  import("./pages/logSessionForm.js").catch((err) =>
    console.error("Failed to load log session form script:", err)
  );
} else if (document.body.id === "thank-you-page") {
  import("./pages/thankYou.js").catch((err) =>
    console.error("Failed to load thank you script:", err)
  );
} else if (document.body.id === 'add-patient-page') {
    import('../pages/addPatientForm.js').catch(err => console.error("Failed to load add patient form script:", err));
} else if (document.body.id === 'add-patient-thank-you-page') {
    import('../pages/addPatientThankYou.js').catch(err => console.error("Failed to load add patient thank you script:", err));
}

// Initialize theme (example of another LS use)
getThemePreference();
// You could add a theme toggle button that calls setThemePreference
// e.g. document.getElementById('theme-toggle').addEventListener('click', () => {
//    const currentTheme = getThemePreference();
//    setThemePreference(currentTheme === 'light' ? 'dark' : 'light');
// });
