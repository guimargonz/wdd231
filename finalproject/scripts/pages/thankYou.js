function displaySummary() {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("summary-patient-id").textContent =
    params.get("patientId") || "N/A";
  document.getElementById("summary-session-date").textContent =
    params.get("sessionDate") || "N/A";
  document.getElementById("summary-session-duration").textContent =
    params.get("sessionDuration") || "N/A";
  document.getElementById("summary-session-type").textContent =
    params.get("sessionType") || "N/A";

  const timestamp = params.get("formSubmitTimestamp");
  if (timestamp) {
    try {
      document.getElementById("summary-timestamp").textContent = new Date(
        timestamp
      ).toLocaleString();
    } catch (e) {
      document.getElementById("summary-timestamp").textContent = timestamp; // Fallback
    }
  } else {
    document.getElementById("summary-timestamp").textContent = "N/A";
  }
}

if (document.body.id === "thank-you-page") {
  displaySummary();
}
