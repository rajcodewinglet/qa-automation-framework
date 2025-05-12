import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import { userFixture } from "../../fixtures/var/superAdminUsersFixture";
import { roleFixture } from "../../fixtures/var/superAdminRolesFixture";
import {
  validateAttachRolesToUser,
  validateGetUserRoles,
  validateBulkAssignRoles,
  validateBulkRevokeRoles,
} from "../../validation/var/superAdminUserRoles";

const BASE_URL = getBaseUrl("superadmin");

test.describe("Superadmin User-Role Mapping Module", () => {
  let userUuid;
  let roleUuid;

  test.beforeAll(async ({ request }) => {
    // 1. Create User
    const userResponse = await request.post(`${BASE_URL}/api/superadmin/user`, {
      data: userFixture,
      headers: getAuthHeader("superadmin"),
    });
    expect(userResponse.status()).toBe(201);
    const userData = await userResponse.json();
    userUuid = userData.uuid;

    // 2. Create Role
    const roleResponse = await request.post(
      `${BASE_URL}/api/superadmin/rbac/roles`,
      {
        data: roleFixture,
        headers: getAuthHeader("superadmin"),
      }
    );
    expect(roleResponse.status()).toBe(200);
    const roleData = await roleResponse.json();
    roleUuid = roleData.uuid;
  });

  // Attach Roles to User
  test("PS-001-USERROLE: Attach Role to User via POST /user/{user_uuid}/roles", async ({
    request,
  }) => {
    const response = await request.post(
      `${BASE_URL}/api/superadmin/rbac/user/${userUuid}/roles`,
      {
        data: [roleUuid],
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateAttachRolesToUser(response, roleUuid);
  });

  // Get Roles Assigned to User
  test("PS-002-USERROLE: Get Roles of User via GET /user/{user_uuid}", async ({
    request,
  }) => {
    const response = await request.get(
      `${BASE_URL}/api/superadmin/rbac/user/${userUuid}`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateGetUserRoles(response, roleUuid);
  });

  // Bulk Assign Role to User
  test("PS-003-USERROLE: Bulk Assign Roles via PATCH /user/{user_uuid}/bulk-assign", async ({
    request,
  }) => {
    const response = await request.patch(
      `${BASE_URL}/api/superadmin/rbac/user/${userUuid}/bulk-assign`,
      {
        data: [roleUuid],
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateBulkAssignRoles(response);
  });

  // Bulk Revoke Role from User
  test("PS-004-USERROLE: Bulk Revoke Roles via DELETE /user/{user_uuid}/bulk-revoke", async ({
    request,
  }) => {
    const response = await request.delete(
      `${BASE_URL}/api/superadmin/rbac/user/${userUuid}/bulk-revoke`,
      {
        data: [roleUuid],
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateBulkRevokeRoles(response);
  });
});
test.afterAll(async ({ request }) => {
  // Clean up: Delete the role and user if not already deleted in tests
  if (userUuid) {
    const deleteUserResponse = await request.delete(
      `${BASE_URL}/api/superadmin/user/${userUuid}`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );
    expect(deleteUserResponse.status()).toBe(200);
  }

  if (roleUuid) {
    const deleteRoleResponse = await request.delete(
      `${BASE_URL}/api/superadmin/rbac/roles/${roleUuid}`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );
    expect(deleteRoleResponse.status()).toBe(200);
  }
});
