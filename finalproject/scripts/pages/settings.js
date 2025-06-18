import {
  setThemePreference,
  getThemePreference,
} from "../utils/localStorageManager.js";

const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");
const currentThemeLabel = document.getElementById("current-theme-label");
// const clearDataBtn = document.getElementById('clear-local-data-btn'); // For future feature

function updateThemeUI(theme) {
  if (themeToggleCheckbox) {
    themeToggleCheckbox.checked = theme === "dark";
  }
  if (currentThemeLabel) {
    currentThemeLabel.textContent =
      theme === "dark" ? "Dark Mode" : "Light Mode";
  }
  document.documentElement.setAttribute("data-theme", theme);
}

function initializeSettings() {
  const currentTheme = getThemePreference(); // This also applies the theme initially
  updateThemeUI(currentTheme);

  if (themeToggleCheckbox) {
    themeToggleCheckbox.addEventListener("change", () => {
      const newTheme = themeToggleCheckbox.checked ? "dark" : "light";
      setThemePreference(newTheme); // Saves to LS and updates data-theme attribute
      updateThemeUI(newTheme);
    });
  }

  // if (clearDataBtn) {
  //     clearDataBtn.addEventListener('click', () => {
  //         if (confirm("Are you sure you want to clear all locally stored data? This action cannot be undone.")) {
  //             localStorage.clear(); // Clears EVERYTHING for this domain
  //             alert("All local data has been cleared. The application will now behave as a first-time use.");
  //             // Optionally redirect or refresh
  //             window.location.reload();
  //         }
  //     });
  // }
}

if (document.body.id === "settings-page") {
  initializeSettings();
}
