import { getPatientById } from "../services/patientService.js";
import { displayGoals, displaySessions } from "../utils/domUtils.js";
import {
  getLastViewedPatientId,
  setLastViewedPatientId,
} from "../utils/localStorageManager.js";

const patientNameHeading = document.getElementById("patient-name-heading");
const patientProfileImg = document.getElementById("patient-profile-img");
const patientDobEl = document.getElementById("patient-dob");
const patientConcernEl = document.getElementById("patient-concern");
const patientContactNameEl = document.getElementById("patient-contact-name");
const patientContactPhoneEl = document.getElementById("patient-contact-phone");

const goalsContainer = document.getElementById("goals-container");
const sessionsContainer = document.getElementById("sessions-container");
const logNewSessionBtn = document.getElementById("log-new-session-btn");

// Modal elements (imported from main.js or defined here if specific)
const detailsModal = document.getElementById("details-modal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
// const closeModalBtn = document.getElementById('close-modal-btn'); // Handled in main.js

async function initializePatientDetail() {
  const params = new URLSearchParams(window.location.search);
  let patientId = params.get("id");

  if (!patientId) {
    // Fallback to localStorage if no query param
    patientId = getLastViewedPatientId();
  }
  if (!patientId) {
    if (patientNameHeading)
      patientNameHeading.textContent = "No Patient Selected";
    if (goalsContainer)
      goalsContainer.innerHTML =
        "<p class='error-message'>Please select a patient from the dashboard.</p>";
    if (sessionsContainer) sessionsContainer.innerHTML = "";
    return;
  }
  setLastViewedPatientId(patientId); // Update LS in case accessed via query param

  const patient = await getPatientById(patientId);

  if (patient) {
    document.title = `${patient.firstName} ${patient.lastName} - Details - TherapyTrack Pro`; // Dynamic Title
    if (patientNameHeading)
      patientNameHeading.textContent = `${patient.firstName} ${patient.lastName}`;
    if (patientProfileImg && patient.profileImageUrl)
      patientProfileImg.src = patient.profileImageUrl;
    if (patientDobEl) patientDobEl.textContent = patient.dob;
    if (patientConcernEl) patientConcernEl.textContent = patient.primaryConcern;
    if (patientContactNameEl)
      patientContactNameEl.textContent = patient.contactName;
    if (patientContactPhoneEl)
      patientContactPhoneEl.textContent = patient.contactPhone;

    if (goalsContainer) displayGoals(patient.goals, goalsContainer, patient.id);
    if (sessionsContainer)
      displaySessions(patient.sessions, sessionsContainer, patient.id);
    if (logNewSessionBtn) logNewSessionBtn.dataset.patientId = patient.id; // For log-session page link

    // Add event listeners for modal triggers AFTER content is rendered
    addModalEventListeners(patient);
  } else {
    if (patientNameHeading)
      patientNameHeading.textContent = "Patient Not Found";
    if (goalsContainer)
      goalsContainer.innerHTML =
        "<p class='error-message'>Could not retrieve patient details.</p>";
    if (sessionsContainer) sessionsContainer.innerHTML = "";
  }
}

function addModalEventListeners(patient) {
  document.querySelectorAll(".open-modal-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const type = event.target.dataset.type; // 'goal' or 'session'
      const id = event.target.dataset.id;
      let item;
      if (type === "goal") {
        item = patient.goals.find((g) => g.id === id);
        if (modalTitle) modalTitle.textContent = "Goal Details";
      } else if (type === "session") {
        item = patient.sessions.find((s) => s.id === id);
        if (modalTitle) modalTitle.textContent = "Session Details";
      }

      if (item && modalContent) {
        // Template Literals for modal content
        modalContent.innerHTML = `
                    ${
                      type === "goal"
                        ? `
                        <p><strong>Description:</strong> ${item.description}</p>
                        <p><strong>Status:</strong> ${item.status}</p>
                        <p><strong>Target Date:</strong> ${
                          item.targetDate || "N/A"
                        }</p>
                        <p><strong>Notes:</strong> ${item.notes || "N/A"}</p>
                    `
                        : ""
                    }
                    ${
                      type === "session"
                        ? `
                        <p><strong>Date:</strong> ${new Date(
                          item.date
                        ).toLocaleDateString()}</p>
                        <p><strong>Duration:</strong> ${
                          item.duration
                        } minutes</p>
                        <p><strong>Type:</strong> ${item.type}</p>
                        <p><strong>Activities:</strong> ${
                          item.activities || "N/A"
                        }</p>
                        <p><strong>Notes:</strong> ${item.notes || "N/A"}</p>
                        <p><strong>Therapist:</strong> ${
                          item.therapist || "N/A"
                        }</p>
                    `
                        : ""
                    }
                `;
        if (detailsModal) detailsModal.showModal();
      }
    });
  });
}

if (logNewSessionBtn) {
  logNewSessionBtn.addEventListener("click", () => {
    const patientId = logNewSessionBtn.dataset.patientId;
    if (patientId) {
      // Store patientId in LS for the form page to pick up
      localStorage.setItem("logSessionForPatientId", patientId);
      window.location.href = "log-session.html";
    } else {
      alert("Patient ID not set for logging session.");
    }
  });
}

// Run only on patient detail page
if (document.body.id === "patient-detail-page") {
  initializePatientDetail();
}
