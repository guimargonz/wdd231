document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  // Function to safely get parameter and set text content
  function displayText(elementId, paramName, defaultValue = "N/A") {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = params.get(paramName) || defaultValue;
    }
  }

  // Function to format membership level name
  function formatMembershipLevel(levelValue) {
    switch (levelValue) {
      case "np":
        return "Non-Profit Membership";
      case "bronze":
        return "Bronze Membership";
      case "silver":
        return "Silver Membership";
      case "gold":
        return "Gold Membership";
      default:
        return "N/A";
    }
  }

  displayText("submittedFirstName", "firstName");
  displayText("submittedLastName", "lastName");
  displayText("submittedEmail", "email");
  displayText("submittedMobile", "mobile");
  displayText("submittedOrganization", "organization");

  const membershipLevelValue = params.get("membershipLevel");
  const submittedMembershipLevelEl = document.getElementById(
    "submittedMembershipLevel"
  );
  if (submittedMembershipLevelEl) {
    submittedMembershipLevelEl.textContent =
      formatMembershipLevel(membershipLevelValue);
  }

  const timestampValue = params.get("formLoadTimestamp");
  const submittedTimestampEl = document.getElementById("submittedTimestamp");
  if (submittedTimestampEl && timestampValue) {
    try {
      // Format the ISO string to a more readable date/time
      const date = new Date(timestampValue);
      submittedTimestampEl.textContent = date.toLocaleString();
    } catch (e) {
      submittedTimestampEl.textContent = timestampValue; // Fallback to raw value
    }
  } else if (submittedTimestampEl) {
    submittedTimestampEl.textContent = "N/A";
  }
});
