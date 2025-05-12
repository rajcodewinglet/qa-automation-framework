import { expect } from "@playwright/test";

export async function validateFhwaAwardTypesList(response) {
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.founds)).toBe(true);

  body.founds.forEach((item) => {
    expect(item).toHaveProperty("code");
    expect(item).toHaveProperty("description");
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("uuid");
    expect(item).toHaveProperty("created_at");
    expect(item).toHaveProperty("updated_at");
  });
}

export async function validateFhwaAwardTypeById(response, expectedId) {
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("id", expectedId);
  expect(data).toHaveProperty("code");
  expect(data).toHaveProperty("description");
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
    expect(["string", "number"]).toContain(typeof item);
  });

  // Optional: Validate search_options exists
  expect(data).toHaveProperty("search_options");
}
