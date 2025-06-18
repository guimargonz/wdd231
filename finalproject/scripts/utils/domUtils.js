/**
 * Creates an HTML card for a patient summary.
 * @param {Object} patient The patient object.
 * @returns {HTMLElement} The created article element.
 */
export function createPatientSummaryCard(patient) {
  const card = document.createElement("article");
  card.classList.add("patient-card");
  // Using template literals
  card.innerHTML = `
        <h3>${patient.firstName} ${patient.lastName}</h3>
        <p><strong>DOB:</strong> ${patient.dob}</p>
        <p><strong>Concern:</strong> ${patient.primaryConcern || "N/A"}</p>
        <a href="patient-detail.html?id=${
          patient.id
        }" class="action-btn-small view-details-link" data-patient-id="${
    patient.id
  }">View Details</a>
    `;
  return card;
}

/**
 * Displays a list of goals in a given container.
 * @param {Array} goals Array of goal objects.
 * @param {HTMLElement} containerElement The HTML element to append goals to.
 */
export function displayGoals(goals, containerElement, patientId) {
  containerElement.innerHTML = ""; // Clear previous content
  if (!goals || goals.length === 0) {
    containerElement.innerHTML =
      "<p>No goals currently set for this patient.</p>";
    return;
  }

  const ul = document.createElement("ul");
  goals.forEach((goal) => {
    // Array method: forEach
    const li = document.createElement("li");
    li.innerHTML = `
            <p><strong>Description:</strong> ${goal.description}</p>
            <p><strong>Status:</strong> ${goal.status}</p>
            <p><strong>Target Date:</strong> ${goal.targetDate || "N/A"}</p>
            ${goal.notes ? `<p><strong>Notes:</strong> ${goal.notes}</p>` : ""}
            <button class="action-btn-small open-modal-btn" data-type="goal" data-patient-id="${patientId}" data-id="${
      goal.id
    }">View Details</button>
        `;
    ul.appendChild(li);
  });
  containerElement.appendChild(ul);
}

/**
 * Displays a list of sessions in a given container.
 * @param {Array} sessions Array of session objects.
 * @param {HTMLElement} containerElement The HTML element to append sessions to.
 */
export function displaySessions(sessions, containerElement, patientId) {
  containerElement.innerHTML = ""; // Clear previous content
  if (!sessions || sessions.length === 0) {
    containerElement.innerHTML =
      "<p>No session history available for this patient.</p>";
    return;
  }

  const ul = document.createElement("ul");
  // Display most recent sessions first
  sessions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((session) => {
      // Array methods: slice, sort, forEach
      const li = document.createElement("li");
      li.innerHTML = `
            <p><strong>Date:</strong> ${new Date(
              session.date
            ).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> ${session.duration} minutes</p>
            <p><strong>Type:</strong> ${session.type}</p>
            <p><strong>Activities:</strong> ${session.activities || "N/A"}</p>
            <p><strong>Notes:</strong> ${session.notes || "N/A"}</p>
            <p><strong>Therapist:</strong> ${session.therapist || "N/A"}</p>
            <button class="action-btn-small open-modal-btn" data-type="session" data-patient-id="${patientId}" data-id="${
        session.id
      }">View Details</button>
        `;
      ul.appendChild(li);
    });
  containerElement.appendChild(ul);
}
