document.addEventListener("DOMContentLoaded", () => {
  // Set hidden timestamp field
  const timestampField = document.getElementById("formLoadTimestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modal Functionality
  const benefitLinks = document.querySelectorAll(".benefits-link");
  const closeButtons = document.querySelectorAll(".close-modal-btn");

  benefitLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const modalId = link.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".membership-modal"); // Find parent modal
      if (modal) {
        modal.close();
      }
    });
  });

  // Optional: Close modal if backdrop is clicked
  const modals = document.querySelectorAll(".membership-modal");
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        // Check if the click is on the backdrop itself
        modal.close();
      }
    });
  });
});
