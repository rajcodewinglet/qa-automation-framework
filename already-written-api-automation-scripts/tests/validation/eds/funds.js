import { expect } from "@playwright/test";

// Validate Funds List
export async function validateFundsList(response) {
  const data = await response.json();
  expect(response.status()).toBe(200);
  // Check if the 'founds' array exists and is an array
  expect(Array.isArray(data.founds)).toBe(true);

  // Check if the funds in 'founds' contain the expected properties
  if (data.founds.length > 0) {
    data.founds.forEach((fund) => {
      expect(fund).toHaveProperty("fund_number");
      expect(fund).toHaveProperty("fund_name");
      expect(fund).toHaveProperty("id");
      expect(fund).toHaveProperty("uuid");
      expect(fund).toHaveProperty("created_at");
      expect(fund).toHaveProperty("updated_at");
    });
  }
}

// Validate Fund by ID
export async function validateFundById(response, fundId) {
  const data = await response.json();
  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("fund_number");
  expect(data).toHaveProperty("fund_name");
  expect(data).toHaveProperty("id");
  expect(data.id).toBe(fundId); // Ensure the ID matches the requested ID
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
}

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
    responseBody.founds.forEach((value) => {
        // Check for fields that can have both string and number types
        if (fieldName === 'fund_number' || fieldName === 'id') {
            // Allow both string and number types
            expect(typeof value === 'string' || typeof value === 'number').toBe(true);
        } else {
            // For other fields, ensure the value is a non-empty string
            expect(typeof value).toBe("string");
            expect(value).not.toBeNull();
            expect(value.trim()).not.toBe(""); // Ensure values are not empty or just whitespace
        }
    });
}