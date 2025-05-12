// tests/api/var/superadminPermissions.spec.js
import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import { superAdminRolesFixture } from "../../fixtures/var/superAdminRolesFixture";
import { validatePermissionsList,validatePermissionsByUser } from "../../validation/var/superAdminPermissions";

const BASE_URL = getBaseUrl("superadmin");

test.describe("Superadmin Permissions Module", () => {
    test.describe.configure({ mode: "serial" });
  test("PS-001-PERMISSIONS: List all permissions via GET /api/superadmin/rbac/permissions", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/superadmin/rbac/permissions`, {
      headers: getAuthHeader("superadmin"),
    });

    await validatePermissionsList(response);
  });
  test("PS-002-PERMISSIONS: Retrieve permissions by user UUID via GET /api/superadmin/rbac/permissions/user/{user_uuid}", async ({ request }) => {
    // You can replace this with a dynamically created user if needed
    const testUserUuid = "ea3a521a1-b683-4c89-8bba-b078fb92aa8d"; // Replace with actual test UUID or fetch dynamically
  
    const response = await request.get(
      `${BASE_URL}/api/superadmin/rbac/permissions/user/${testUserUuid}`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );
  
    await validatePermissionsByUser(response, testUserUuid);
  });
  
});
