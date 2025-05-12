import { expect } from "@playwright/test";
export async function validateCostCenterList(response) {
  const data = await response.json();
  expect(response.status()).toBe(200);
  // Check if the 'founds' array exists and is an array
  expect(Array.isArray(data.founds)).toBe(true);

  // Check if the cost centers in 'founds' contain the expected properties
  if (data.founds.length > 0) {
    data.founds.forEach((costCenter) => {
      expect(costCenter).toHaveProperty("cost_center");
      expect(costCenter).toHaveProperty("cost_center_name");
      expect(costCenter).toHaveProperty("cost_center_parent1");
      expect(costCenter).toHaveProperty("cost_center_parent1_desc");
      expect(costCenter).toHaveProperty("id");
      expect(costCenter).toHaveProperty("uuid");
      expect(costCenter).toHaveProperty("created_at");
      expect(costCenter).toHaveProperty("updated_at");
    });
  }
}
// validateCostCenterById.js
export async function validateCostCenterById(response, costCenterId) {
  const data = await response.json();
  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("cost_center");
  expect(data).toHaveProperty("cost_center_name");
  expect(data).toHaveProperty("cost_center_parent1");
  expect(data).toHaveProperty("cost_center_parent1_desc");
  expect(data).toHaveProperty("id");
  expect(data.id).toBe(costCenterId); // Ensure the ID matches the requested ID
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
}
// validateUniqueFieldValues.js

export async function validateUniqueFieldValues(response, fieldName) {
    // Ensure the response status is 200 (OK)
    expect(response.status()).toBe(200);
  
    // Parse the response JSON
    const responseBody = await response.json();
  
    // Ensure that the "founds" array is returned
    expect(responseBody.founds).toBeDefined();
    expect(Array.isArray(responseBody.founds)).toBe(true);
  
    // Validate that the array is not empty
    expect(responseBody.founds.length).toBeGreaterThan(0);
  
    // Additional field-specific checks could go here, depending on the expected format of values
    // For example, if you expect all values to be strings:
    responseBody.founds.forEach((value) => {
        if (fieldName === 'id') {
          // 'id' can be a number, so we check for both string and number types
          expect(typeof value === 'string' || typeof value === 'number').toBe(true);
        } else {
          // For other fields, ensure the value is a non-empty string
          expect(typeof value).toBe("string");
          expect(value).not.toBeNull();
          expect(value.trim()).not.toBe(""); // Ensure values are not empty or just whitespace
        }
      });
  }
  