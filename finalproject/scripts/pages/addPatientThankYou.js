function displaySummary() {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("summary-firstName").textContent =
    params.get("firstName") || "N/A";
  document.getElementById("summary-lastName").textContent =
    params.get("lastName") || "N/A";
  document.getElementById("summary-dob").textContent =
    params.get("dob") || "N/A";
  document.getElementById("summary-contactName").textContent =
    params.get("contactName") || "N/A";
  document.getElementById("summary-primaryConcern").textContent =
    params.get("primaryConcern") || "N/A";

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

if (document.body.id === "add-patient-thank-you-page") {
  displaySummary();
}
