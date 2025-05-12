import { expect } from "@playwright/test";

export async function validateAwardList(response) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.founds)).toBe(true);
  expect(body.founds.length).toBeGreaterThan(0);

  for (const award of body.founds) {
    expect(award).toHaveProperty("id");
    expect(award).toHaveProperty("sponsor");
    expect(award).toHaveProperty("award_name");
    expect(award).toHaveProperty("created_at");
    expect(award).toHaveProperty("updated_at");
  }
}

export async function validateAwardById(response, awardId) {
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty("id", awardId);
  expect(data).toHaveProperty("sponsor");
  expect(data).toHaveProperty("award_name");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
}
export async function validateUniqueFieldValues(response, field) {
    expect(response.status(), `Expected status 200 for field: ${field}`).toBe(200);
  
    const data = await response.json();
  
    expect(data).toHaveProperty("founds");
    expect(Array.isArray(data.founds)).toBeTruthy();
    expect(data.founds.length).toBeGreaterThan(0);
  
    expect(data).toHaveProperty("search_options");
    expect(typeof data.search_options).toBe("object");
    expect(data.search_options).toHaveProperty("total_count");
  }
  