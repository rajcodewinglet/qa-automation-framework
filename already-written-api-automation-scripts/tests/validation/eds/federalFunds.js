import { expect } from "@playwright/test";

export async function validateFederalFundsList(response) {
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.founds)).toBe(true);

  body.founds.forEach((item) => {
    expect(item).toHaveProperty("fund_code");
    expect(item).toHaveProperty("fund_available");
    expect(item).toHaveProperty("fund_obligations");
    expect(item).toHaveProperty("fund_unobligated_balance");
    expect(item).toHaveProperty("fund_pending_obligations");
    expect(item).toHaveProperty("fund_pending_unobligated_balance");
    expect(item).toHaveProperty("fund_advance_construction");
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("uuid");
    expect(item).toHaveProperty("created_at");
    expect(item).toHaveProperty("updated_at");
  });
}

export async function validateFederalFundById(response, expectedId) {
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("id", expectedId);
  expect(data).toHaveProperty("fund_code");
  expect(data).toHaveProperty("fund_available");
  expect(data).toHaveProperty("fund_obligations");
  expect(data).toHaveProperty("fund_unobligated_balance");
  expect(data).toHaveProperty("fund_pending_obligations");
  expect(data).toHaveProperty("fund_pending_unobligated_balance");
  expect(data).toHaveProperty("fund_advance_construction");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
}
export async function validateUniqueValues(response) {
  expect(response.status()).toBe(200);

  const data = await response.json();

  // Check that 'founds' is an array
  expect(Array.isArray(data.founds)).toBe(true);

  // Check that each item is either a string or number
  data.founds.forEach((item) => {
    expect(["string", "number"]).toContain(typeof item); // Allow both string and number types
  });

  // Optional: Validate search_options exists
  expect(data).toHaveProperty("search_options");
}
