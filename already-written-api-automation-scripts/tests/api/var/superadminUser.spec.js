import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import { test, expect } from "@playwright/test";
import {
  validateUserCreation,
  validateUserList,
  validateUserById,
  validateUserUpdate,
  validateUserDeletion,
  validateUserStatusChange,
  validateUniqueSuperAdminFieldValues,
} from "../../validation/var/superAdminUser";
import { userFixture } from "../../fixtures/var/superAdminUsersFixture";

const BASE_URL = getBaseUrl("superadmin");

test.describe("superadmin-user", () => {
  test.describe.configure({ mode: "serial" });

  let createdUserId;
  let createdUserUuid;

  // SA-01: Create a new user
  test("PS-001-SUPERADMIN: Create a new user via POST /superadmin/user/user", async ({
    request,
  }) => {
    const newUser = userFixture;

    const response = await request.post(`${BASE_URL}/api/superadmin/user`, {
      data: newUser,
      headers: getAuthHeader("superadmin"),
    });

    await validateUserCreation(response, newUser);

    const data = await response.json();
    createdUserId = data.id;
    createdUserUuid = data.uuid;
  });

  // SA-02: Get list of users
  test("PS-002-SUPERADMIN: Retrieve list of users via GET /superadmin/user", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/api/superadmin/user`, {
      headers: getAuthHeader("superadmin"),
    });

    await validateUserList(response, createdUserUuid);
  });

  test("PS-003-SUPERADMIN: Retrieve user by ID via GET /api/superadmin/user/{id}", async ({
    request,
  }) => {
    expect(createdUserId).toBeDefined();

    const response = await request.get(
      `${BASE_URL}/api/superadmin/user/${createdUserId}`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateUserById(response, createdUserUuid);
  });

  // SA-04: Update user by ID
  test("PS-004-SUPERADMIN: Update user details via PATCH /api/superadmin/user/{id}", async ({
    request,
  }) => {
    expect(createdUserId).toBeDefined();

    const updatedUserData = {
      email: userFixture.updatedEmail, // Use updated email from fixture
      name: userFixture.updatedName,
    };

    const response = await request.patch(
      `${BASE_URL}/api/superadmin/user/${createdUserId}`,
      {
        data: updatedUserData,
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateUserUpdate(
      response,
      createdUserId,
      updatedUserData.name,
      updatedUserData.email
    );
  });

  test("PS-005-SUPERADMIN: Deactivate user via PATCH /api/superadmin/user/{id}/deactivate", async ({
    request,
  }) => {
    expect(createdUserId).toBeDefined();

    const response = await request.patch(
      `${BASE_URL}/api/superadmin/user/${createdUserId}/deactivate`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );
    await validateUserStatusChange(response, createdUserId, false);
  });

  test("PS-006-SUPERADMIN: Activate user via PATCH /api/superadmin/user/{id}/activate", async ({
    request,
  }) => {
    expect(createdUserId).toBeDefined();

    const response = await request.patch(
      `${BASE_URL}/api/superadmin/user/${createdUserId}/activate`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateUserStatusChange(response, createdUserId, true);
  });
  // SA-05: Delete user by ID
  test("PS-007-SUPERADMIN: Delete user via DELETE /api/superadmin/user/{id}", async ({
    request,
  }) => {
    expect(createdUserId).toBeDefined();

    const response = await request.delete(
      `${BASE_URL}/api/superadmin/user/${createdUserId}`,
      {
        headers: getAuthHeader("superadmin"),
      }
    );

    await validateUserDeletion(response);
  });
});
test.describe("superadmin-user", () => {
  const superAdminFields = ["email", "name", "is_active", "id", "uuid"];

  superAdminFields.forEach((field, index) => {
    test(`PS-${String(index + 8).padStart(
      3,
      "0"
    )}-SUPERADMIN: Retrieve unique values for '${field}'`, async ({
      request,
    }) => {
      const response = await request.get(
        `${BASE_URL}/api/superadmin/user/unique-values/${field}`,
        {
          headers: getAuthHeader("superadmin"), // Uses SuperAdmin-specific token
        }
      );

      await validateUniqueSuperAdminFieldValues(response, field);
    });
  });
});
