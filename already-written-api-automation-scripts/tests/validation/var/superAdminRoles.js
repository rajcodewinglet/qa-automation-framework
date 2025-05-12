import { expect } from "@playwright/test";

export async function validateRoleList(response) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.roles)).toBe(true);
  expect(typeof body.total).toBe("number");
}

export async function validateRoleCreation(response, expectedRole) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.name).toBe(expectedRole.name);
  expect(body.description).toBe(expectedRole.description);
  expect(body.uuid).toBeDefined();
}

export async function validateRoleById(response, expectedUuid) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.uuid).toBe(expectedUuid);
  expect(typeof body.name).toBe("string");
  expect(typeof body.description).toBe("string");
}

export async function validateRoleUpdate(response, updatedData) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.name).toBe(updatedData.name);
  expect(body.description).toBe(updatedData.description);
}

export async function validateRoleDeletion(response) {
  expect(response.status()).toBe(200);
}
