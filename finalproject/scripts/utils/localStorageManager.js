const LAST_VIEWED_PATIENT_KEY = "therapyTrackPro_lastViewedPatientId";

export function setLastViewedPatientId(patientId) {
  try {
    localStorage.setItem(LAST_VIEWED_PATIENT_KEY, patientId);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function getLastViewedPatientId() {
  try {
    return localStorage.getItem(LAST_VIEWED_PATIENT_KEY);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

// Example of another LS item: theme preference
const THEME_KEY = "therapyTrackPro_theme";
export function setThemePreference(theme) {
  // 'light' or 'dark'
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}
export function getThemePreference() {
  const theme = localStorage.getItem(THEME_KEY);
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
  return theme || "light"; // Default to light
}
