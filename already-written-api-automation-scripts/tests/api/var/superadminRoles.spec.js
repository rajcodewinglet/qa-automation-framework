import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import {
  validateRoleList,
  validateRoleById,
  validateRoleCreation,
  validateRoleUpdate,
  validateRoleDeletion,
} from "../../validation/var/superAdminRoles";
import { superAdminRolesFixture } from "../../fixtures/var/superAdminRolesFixture";

const BASE_URL = getBaseUrl("superadmin");

test.describe("Superadmin Roles Module", () => {
  test.describe.configure({ mode: "serial" });

  let createdRoleUuid;

  test("PS-001-ROLES: Retrieve Roles List via GET /api/superadmin/rbac/roles", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/superadmin/rbac/roles`, {
      headers: getAuthHeader("superadmin"),
    });

    await validateRoleList(response);
  });

  test("PS-002-ROLES: Create new Role via POST /api/superadmin/rbac/roles", async ({ request }) => {
    const newRole = superAdminRolesFixture.newRole;

    const response = await request.post(`${BASE_URL}/api/superadmin/rbac/roles`, {
      headers: getAuthHeader("superadmin"),
      data: newRole,
    });
    createdRoleUuid = (await response.json()).uuid;

    await validateRoleCreation(response, newRole);
  });

  test("PS-003-ROLES: Retrieve Role by UUID via GET /api/superadmin/rbac/roles/{uuid}", async ({ request }) => {
    expect(createdRoleUuid).toBeDefined();

    const response = await request.get(`${BASE_URL}/api/superadmin/rbac/roles/${createdRoleUuid}`, {
      headers: getAuthHeader("superadmin"),
    });

    await validateRoleById(response, createdRoleUuid);
  });

  test("PS-004-ROLES: Update Role via PATCH /api/superadmin/rbac/roles/{uuid}", async ({ request }) => {
    expect(createdRoleUuid).toBeDefined();

    const updatedData = superAdminRolesFixture.updatedRole

    const response = await request.patch(`${BASE_URL}/api/superadmin/rbac/roles/${createdRoleUuid}`, {
      headers: getAuthHeader("superadmin"),
      data: updatedData,
    });

    await validateRoleUpdate(response, updatedData);
  });

  test("PS-005-ROLES: Delete Role via DELETE /api/superadmin/rbac/roles/{uuid}", async ({ request }) => {
    expect(createdRoleUuid).toBeDefined();

    const response = await request.delete(`${BASE_URL}/api/superadmin/rbac/roles/${createdRoleUuid}`, {
      headers: getAuthHeader("superadmin"),
    });

    await validateRoleDeletion(response);
  });
});
