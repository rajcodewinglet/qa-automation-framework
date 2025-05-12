import { expect } from "@playwright/test";

export async function validateHealthCheckResponse(response) {
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty("status", "ok");
}
