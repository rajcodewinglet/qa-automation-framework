import { expect } from "@playwright/test"; // Import expect from Playwright
export const validateSpecialtyCreation = async (
  response,
  createdSpecialtyName
) => {
  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("id");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("name", createdSpecialtyName);
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
};

export const validateDuplicateSpecialtyError = async (response) => {
  const errorData = await response.json();

  expect(response.status()).toBe(400); // Expecting 400 Bad Request for duplicate
  expect(errorData.detail).toContain("Specialty with name");
};

export const validateSpecialtiesList = async (response) => {
  expect(response.status()).toBe(200); // Check for successful response

  const data = await response.json();

  // Validate that the response contains the expected properties
  expect(data.founds).toBeInstanceOf(Array); // Ensure that 'founds' is an array
  expect(data.founds.length).toBeGreaterThan(0); // Ensure there are specialties

  // Validate that each specialty in the list has required properties
  data.founds.forEach((specialty) => {
    expect(specialty).toHaveProperty("id");
    expect(specialty).toHaveProperty("uuid");
    expect(specialty).toHaveProperty("name");
    expect(specialty).toHaveProperty("created_at");
    expect(specialty).toHaveProperty("updated_at");
  });
};

export const validateSpecialtyById = async (response, createdSpecialtyId) => {
  // Validate response status
  expect(response.status()).toBe(200); // Ensure the response is successful

  // Parse the response data (ensure it's awaited)
  const data = await response.json();

  // Validate the specialty response contains the correct properties
  expect(data).toHaveProperty("id", createdSpecialtyId); // Ensure 'id' matches the created specialty ID
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("name");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
};
export async function validateSpecialtyUpdate(
  response,
  expectedId,
  updatedSpecialtyName
) {
  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data).toHaveProperty("id", expectedId);
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("name", updatedSpecialtyName);
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
}
export async function validateSpecialtyDeletion(response) {
  expect(response.status()).toBe(200);

  const data = await response.json();

  // Safely check for expected structure (e.g., { message: "Deleted successfully" })
  expect(data).toHaveProperty("message");
  expect(typeof data.message).toBe("string");
}
