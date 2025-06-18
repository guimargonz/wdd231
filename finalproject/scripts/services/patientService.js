const DATA_URL = "./data/patients.json"; // Adjust the path as necessary
/**
 * Fetches all patient data.
 * @returns {Promise<Array>} A promise that resolves to an array of patients.
 */
export async function getPatients() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - Could not fetch ${DATA_URL}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching patient data:", error);
    // In a real app, you might want to show a user-friendly error message.
    return []; // Return empty array on error to prevent further issues
  }
}

/**
 * Fetches a single patient by their ID.
 * @param {string} id The ID of the patient to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the patient object or null if not found.
 */
export async function getPatientById(id) {
  try {
    const patients = await getPatients();
    const patient = patients.find((p) => p.id === id); // Array method: find
    return patient || null;
  } catch (error) {
    console.error(`Error fetching patient by ID (${id}):`, error);
    return null;
  }
}
