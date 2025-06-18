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

const ALL_PATIENTS_LS_KEY = 'therapyTrackPro_allPatientsData';

export function getAllPatientsFromLS() {
    try {
        const data = localStorage.getItem(ALL_PATIENTS_LS_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error reading all patients from localStorage:", error);
        return null;
    }
}

export function setAllPatientsInLS(patientsArray) {
    try {
        localStorage.setItem(ALL_PATIENTS_LS_KEY, JSON.stringify(patientsArray));
    } catch (error) {
        console.error("Error saving all patients to localStorage:", error);
    }
}
