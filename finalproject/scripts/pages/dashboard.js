import { getPatients } from "../services/patientService.js";
import { createPatientSummaryCard } from "../utils/domUtils.js";
import { setLastViewedPatientId } from "../utils/localStorageManager.js";

const patientListContainer = document.getElementById("patient-list-container");

async function initializeDashboard() {
  if (!patientListContainer) {
    console.error("Patient list container not found.");
    return;
  }
  patientListContainer.innerHTML =
    '<p class="loading-message">Loading patients...</p>';

  const patients = await getPatients();

  if (patients && patients.length > 0) {
    patientListContainer.innerHTML = ""; // Clear loading message
    patients.forEach((patient) => {
      const card = createPatientSummaryCard(patient);
      // DOM Manipulation & Event Handling
      card
        .querySelector(".view-details-link")
        .addEventListener("click", (e) => {
          // e.preventDefault(); // Keep if you want to use LS only, not query params
          setLastViewedPatientId(patient.id); // Local Storage use
          // window.location.href = `patient-detail.html`; // If using LS only
        });
      patientListContainer.appendChild(card);
    });
  } else {
    patientListContainer.innerHTML =
      '<p class="error-message">No patients found or could not load data.</p>';
  }
}

// Run only on dashboard page
if (document.body.id === "dashboard-page") {
  initializeDashboard();
}
