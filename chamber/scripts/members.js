// Member directory display functionality
const membersContainer = document.getElementById("members-container");
const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const membersURL = "data/members.json"; // Or 'https://[yourgithubusername].github.io/wdd231/chamber/data/members.json' for live

let allMembersData = []; // To store fetched data and avoid repeated API calls

async function fetchAndStoreMembers() {
  // If data already fetched, just display it
  if (allMembersData.length > 0) {
    displayMembers(allMembersData);
    return;
  }

  try {
    const response = await fetch(membersURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const members = await response.json();
    allMembersData = members; // Store the data for future use
    displayMembers(allMembersData);
  } catch (error) {
    console.error("Error fetching members data:", error);
    if (membersContainer) {
      membersContainer.innerHTML =
        '<p class="error-message">Sorry, member data could not be loaded at this time.</p>';
    }
  }
}

function displayMembers(members) {
  if (!membersContainer) return;

  membersContainer.innerHTML = ""; // Clear previous content
  const isListView = membersContainer.classList.contains("list-view");

  members.forEach((member) => {
    const item = document.createElement(isListView ? "div" : "section"); // Use div for list items, section for cards
    item.classList.add(isListView ? "member-list-item" : "member-card");
    item.classList.add(`member-level-${member.membershipLevel}`); // For styling based on level

    // Determine membership tier display text
    let membershipTier = "";
    switch (member.membershipLevel) {
      case 1:
        membershipTier = "Bronze Member";
        break;
      case 2:
        membershipTier = "Silver Member";
        break;
      case 3:
        membershipTier = "Gold Member";
        break;
      default:
        membershipTier = "Member";
    }

    const imagePath = member.imagePath || "images/member_logos/"; // Default path if not in JSON

    // Build the common HTML structure
    let innerHTML = `
            <img src="${imagePath}${member.imageFileName}" alt="${
      member.name
    } Logo" loading="lazy" width="100" height="100">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p class="tagline">${member.tagline || ""}</p>
                <a href="${
                  member.websiteURL
                }" target="_blank" class="website-link">Visit Website</a>
            </div>
        `;

    // Add membership level display differently for list vs grid to control placement
    if (isListView) {
      innerHTML += `<p class="membership-level">${membershipTier}</p>`;
      item.innerHTML = innerHTML;
    } else {
      // Grid view
      item.innerHTML =
        innerHTML + `<p class="membership-level">${membershipTier}</p>`;
    }

    membersContainer.appendChild(item);
  });
}

// Event listeners for view toggle buttons
if (gridViewBtn && listViewBtn && membersContainer) {
  gridViewBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
    gridViewBtn.classList.add("active-view");
    listViewBtn.classList.remove("active-view");
    fetchAndStoreMembers(); // Use stored data if available
  });

  listViewBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
    listViewBtn.classList.add("active-view");
    gridViewBtn.classList.remove("active-view");
    fetchAndStoreMembers(); // Use stored data if available
  });
}

// Initial fetch and display
if (membersContainer) {
  fetchAndStoreMembers();
}
