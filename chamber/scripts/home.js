// --- In chamber/scripts/home.js ---
document.addEventListener("DOMContentLoaded", () => {
  // OpenWeatherMap API Configuration
  const apiKey = "bd8bbdd567016ee3b7498d568deb316f";
  const cityLatitude = "-28.2612";
  const cityLongitude = "52.4083";
  const units = "imperial"; // For Fahrenheit

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=${units}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&appid=${apiKey}&units=${units}`;

  // DOM Elements - Weather
  const currentTempEl = document.getElementById("current-temp");
  const weatherDescEl = document.getElementById("weather-desc");
  const weatherIconEl = document.getElementById("weather-icon-current");
  const forecastContainerEl = document.querySelector(".forecast-container");

  // DOM Elements - Company Spotlights
  const spotlightsContainerEl = document.querySelector(".spotlights-container");
  const membersDataURL = "data/members.json"; // Path to your JSON file

  // Weather Functions
  async function fetchWeatherData() {
    try {
      // Fetch Current Weather
      const currentResponse = await fetch(currentWeatherUrl);
      if (!currentResponse.ok)
        throw new Error(
          `Current weather fetch failed: ${currentResponse.status}`
        );
      const currentData = await currentResponse.json();
      displayCurrentWeather(currentData);

      // Fetch Forecast
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok)
        throw new Error(`Forecast fetch failed: ${forecastResponse.status}`);
      const forecastData = await forecastResponse.json();
      displayForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      if (currentTempEl) currentTempEl.textContent = "N/A";
      if (weatherDescEl) weatherDescEl.textContent = "Data unavailable.";
      if (forecastContainerEl)
        forecastContainerEl.innerHTML =
          "<p>Forecast currently unavailable.</p>";
    }
  }

  function displayCurrentWeather(data) {
    if (currentTempEl) currentTempEl.textContent = Math.round(data.main.temp);
    if (weatherDescEl) {
      // Capitalize first letter of each word in description
      const description = data.weather[0].description;
      weatherDescEl.textContent = description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    if (weatherIconEl) {
      weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherIconEl.alt = data.weather[0].description;
    }
  }

  function displayForecast(data) {
    if (!forecastContainerEl) return;
    forecastContainerEl.innerHTML = ""; // Clear previous forecast

    const forecastsByDay = {}; // To store the data for one forecast per day (usually choosing midday)

    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      // We only want forecasts for future days, and only one per day.
      // Let's pick the forecast closest to noon for a representative temperature.
      if (date.getDate() !== new Date().getDate()) {
        // Exclude today
        if (
          !forecastsByDay[dayName] ||
          (date.getHours() >= 11 && date.getHours() <= 13)
        ) {
          forecastsByDay[dayName] = {
            date: date, // Store full date for sorting if needed
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon,
            desc: item.weather[0].description,
          };
        }
      }
    });

    // Get the next 3 unique days
    const sortedDays = Object.keys(forecastsByDay).sort(
      (a, b) => forecastsByDay[a].date - forecastsByDay[b].date
    );

    let count = 0;
    for (const dayKey of sortedDays) {
      if (count >= 3) break;
      const forecast = forecastsByDay[dayKey];
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecast-card");
      forecastCard.innerHTML = `
                  <h4>${dayKey}</h4>
                  <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.desc}" loading="lazy">
                  <p>${forecast.temp}°F</p>
              `;
      forecastContainerEl.appendChild(forecastCard);
      count++;
    }
  }

  // Company Spotlights Functions
  async function loadAndDisplaySpotlights() {
    if (!spotlightsContainerEl) return;
    try {
      const response = await fetch(membersDataURL);
      if (!response.ok)
        throw new Error(`Failed to fetch members data: ${response.status}`);
      const members = await response.json();

      // Filter for Gold (3) or Silver (2) members
      const eligibleMembers = members.filter(
        (member) => member.membershipLevel === 2 || member.membershipLevel === 3
      );

      // Shuffle the eligible members array randomly
      const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());

      // Select 2 or 3 members randomly
      const numSpotlights =
        shuffledMembers.length >= 3
          ? Math.random() < 0.5
            ? 2
            : 3
          : Math.min(shuffledMembers.length, 2);
      const selectedMembers = shuffledMembers.slice(0, numSpotlights);

      displaySpotlightCards(selectedMembers);
    } catch (error) {
      console.error("Error loading spotlights:", error);
      if (spotlightsContainerEl)
        spotlightsContainerEl.innerHTML =
          "<p>Member spotlights are currently unavailable.</p>";
    }
  }

  function displaySpotlightCards(membersToDisplay) {
    spotlightsContainerEl.innerHTML = ""; // Clear any existing content

    membersToDisplay.forEach((member) => {
      const card = document.createElement("div");
      card.classList.add(
        "spotlight-card",
        `member-level-${member.membershipLevel}`
      ); // Add level class for specific styling

      let membershipLevelText = "";
      if (member.membershipLevel === 2) membershipLevelText = "Silver Member";
      if (member.membershipLevel === 3) membershipLevelText = "Gold Member";

      const imagePath = member.imagePath || "images/member_logos/"; // Default if not specified

      card.innerHTML = `
          <h3>${member.name}</h3>
          <img src="${imagePath}${member.imageFileName}" alt="${
        member.name
      } Logo" loading="lazy">
          <p class="spotlight-tagline">${
            member.tagline || "Leading our community forward."
          }</p>
          <hr>
          <p>${member.address}</p>
          <p>Phone: ${member.phone}</p>
          <p><a href="${
            member.websiteURL
          }" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
          <p class="spotlight-membership">${membershipLevelText}</p>
        `;

      spotlightsContainerEl.appendChild(card);
    });
  }

  // Initialize Features
  // Only run weather if the weather section exists on the page
  if (document.getElementById("weather-info")) {
    fetchWeatherData();
  }

  // Only run spotlights if the spotlights section exists
  if (document.getElementById("company-spotlights")) {
    loadAndDisplaySpotlights();
  }
});
