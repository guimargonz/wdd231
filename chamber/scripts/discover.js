document.addEventListener("DOMContentLoaded", () => {
  // --- LocalStorage Visitor Message ---
  const messageArea = document.getElementById("visitor-message-area");
  const msToDays = 84600000; // Milliseconds in a day (corrected: 24*60*60*1000 = 86400000)
  // Corrected value:
  const CORRECT_MS_TO_DAYS = 24 * 60 * 60 * 1000;

  const lastVisitTimestamp = localStorage.getItem("lastDiscoverVisit");
  const currentTimestamp = Date.now();
  let visitMessage = "";

  if (!lastVisitTimestamp) {
    visitMessage = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDifference = currentTimestamp - parseInt(lastVisitTimestamp);
    const daysDifference = Math.floor(timeDifference / CORRECT_MS_TO_DAYS);

    if (daysDifference < 1) {
      visitMessage = "Back so soon! Awesome!";
    } else {
      const dayWord = daysDifference === 1 ? "day" : "days";
      visitMessage = `You last visited ${daysDifference} ${dayWord} ago.`;
    }
  }

  if (messageArea) {
    messageArea.textContent = visitMessage;
  }
  localStorage.setItem("lastDiscoverVisit", currentTimestamp.toString());

  // --- Dynamic Content from JSON for Discover Items ---
  const galleryGrid = document.querySelector(".gallery-grid");
  const itemsURL = "data/discover-items.json";

  async function fetchDiscoverItems() {
    if (!galleryGrid) return;
    try {
      const response = await fetch(itemsURL);
      if (!response.ok)
        throw new Error(`Failed to fetch items: ${response.status}`);
      const items = await response.json();
      displayItems(items);
    } catch (error) {
      console.error("Error fetching discover items:", error);
      galleryGrid.innerHTML =
        "<p class='error-message'>Sorry, points of interest could not be loaded at this time.</p>";
    }
  }

  function displayItems(items) {
    galleryGrid.innerHTML = ""; // Clear loading/error message

    items.forEach((item) => {
      const card = document.createElement("article");
      card.classList.add("item-card");

      // Use chamber/images/discover/ as the base path
      const imageBasePath = "images/discover/";

      card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${imageBasePath}${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <div class="card-content">
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <a href="#" class="learn-more-btn">Learn More</a> 
                </div>
            `;
      // Note: "Learn More" button is a placeholder; actual link would go to a detail page if it existed.
      galleryGrid.appendChild(card);
    });
  }

  if (galleryGrid) {
    // Only fetch if the gallery container exists
    fetchDiscoverItems();
  }
});
