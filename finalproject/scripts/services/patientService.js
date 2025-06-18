import { getAllPatientsFromLS, setAllPatientsInLS } from '../utils/localStorageManager.js';

const DATA_URL = "./data/patients.json"; // Adjust the path as necessary
/**
 * Fetches all patient data.
 * @returns {Promise<Array>} A promise that resolves to an array of patients.
 */
export async function getPatients() {
    let patients = getAllPatientsFromLS();
    if (patients) {
      // console.log("Loaded patients from LocalStorage");
      return patients;
    }
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - Could not fetch ${DATA_URL}`
      );
    }
    patients = await response.json();
    setAllPatientsInLS(patients); // Save to LS for next time
    return patients;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return [];
  }
}

/**
 * Fetches a single patient by their ID.
 * @param {string} id The ID of the patient to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to the patient object or null if not found.
 */
export async function getPatientById(id) {
  // getPatients now handles LS, so this will use LS-cached data if available
  const patients = await getPatients();
  const patient = patients.find((p) => p.id === id);
  return patient || null;
}

/**
 * Simulates saving an updated patient object (e.g., with a new goal).
 * This updates the list in LocalStorage.
 * @param {Object} updatedPatient The patient object with modifications.
 * @returns {Promise<boolean>} True if successful.
 */
export async function updatePatientInLS(updatedPatient) {
  try {
    let patients = await getPatients(); // Gets current list (from LS or fetched)
    const patientIndex = patients.findIndex((p) => p.id === updatedPatient.id);
    if (patientIndex > -1) {
      patients[patientIndex] = updatedPatient;
      setAllPatientsInLS(patients);
      // console.log("Patient updated in LocalStorage:", updatedPatient);
      return true;
    }
    console.warn("Patient not found in LS for update:", updatedPatient.id);
    return false;
  } catch (error) {
    console.error("Error updating patient in LS:", error);
    return false;
  }
}
