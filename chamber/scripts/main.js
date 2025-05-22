// Hamburger Menu Toggle
const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    // Optional: Change button text/icon (e.g., to 'X')
    if (navMenu.classList.contains("open")) {
      menuButton.innerHTML = "×"; // 'X' icon
      menuButton.setAttribute("aria-expanded", "true");
    } else {
      menuButton.innerHTML = "☰"; // Hamburger icon
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer - Current Year
const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
  const currentYear = new Date().getFullYear();
  currentYearSpan.textContent = currentYear;
}

// Footer - Last Modified Date
const lastModifiedParagraph = document.getElementById("lastModified");
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = "Last Modified: " + document.lastModified;
}
