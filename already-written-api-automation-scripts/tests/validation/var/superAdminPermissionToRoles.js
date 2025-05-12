import { expect } from "@playwright/test";

/**
 * Validates the response of attaching roles to a user.
 */
export async function validateAttachRolesToUser(response, roleUuid) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body).toContain(roleUuid);
}

/**
 * Validates the assigned roles retrieved for a user.
 */
export async function validateGetUserRoles(response, roleUuid) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty("roles");
  const roleUuids = body.roles.map((role) => role.uuid);
  expect(roleUuids).toContain(roleUuid);
}

/**
 * Validates the bulk assign operation.
 */
export async function validateBulkAssignRoles(response) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty("message");
  expect(body.message.toLowerCase()).toContain("assigned");
}

/**
 * Validates the bulk revoke operation.
 */
export async function validateBulkRevokeRoles(response) {
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty("message");
  expect(body.message.toLowerCase()).toContain("revoked");
}
