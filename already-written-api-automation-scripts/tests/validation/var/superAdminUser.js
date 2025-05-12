import { expect } from "@playwright/test";

// Validate User creation response

export async function validateUserCreation(response, expectedUser) {
  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("id");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("email", expectedUser.email);
  expect(data).toHaveProperty("name", expectedUser.name);
  expect(data).toHaveProperty("is_active", expectedUser.is_active);
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
  expect(data).toHaveProperty("roles");
  expect(Array.isArray(data.roles)).toBe(true);
  expect(data.roles[0]).toHaveProperty("uuid", expectedUser.role_uuids[0]);
}

// Validate User list response
export async function validateUserList(response) {
  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("founds");
  expect(Array.isArray(data.founds)).toBe(true);

  for (const user of data.founds) {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("uuid");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("is_active");
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
    expect(user).toHaveProperty("last_login_at");
    expect(user).toHaveProperty("roles");
    expect(Array.isArray(user.roles)).toBe(true);

    for (const role of user.roles) {
      expect(role).toHaveProperty("id");
      expect(role).toHaveProperty("uuid");
      expect(role).toHaveProperty("name");
      expect(role).toHaveProperty("description");
    }
  }
}

export async function validateUserById(response, expectedUuid) {
  // Parse response data
  const data = await response.json();

  // Ensure response status is 200
  expect(response.status()).toBe(200);

  // Validate that 'id' and 'uuid' are present
  expect(data).toHaveProperty("id");
  expect(data).toHaveProperty("uuid");

  // Validate UUID matches the expected UUID
  expect(String(data.uuid)).toBe(String(expectedUuid));

  // Validate other properties
  expect(data).toHaveProperty("email");
  expect(data).toHaveProperty("name");
  expect(data).toHaveProperty("is_active");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
  expect(data).toHaveProperty("last_login_at");
  expect(data).toHaveProperty("roles");

  // Validate that roles is an array
  expect(Array.isArray(data.roles)).toBe(true);

  // Loop through each role and validate properties
  for (const role of data.roles) {
    expect(role).toHaveProperty("id");
    expect(role).toHaveProperty("uuid");
    expect(role).toHaveProperty("name");
    expect(role).toHaveProperty("description");
  }
}

export async function validateUserUpdate(
  response,
  expectedId,
  expectedName,
  expectedEmail
) {
  const data = await response.json();

  expect(response.status()).toBe(200);

  // Check for required properties
  expect(data).toHaveProperty("id");
  expect(data.id).toBe(expectedId);

  expect(data).toHaveProperty("name");
  expect(data.name).toBe(expectedName); // Validate name

  expect(data).toHaveProperty("email");
  expect(data.email).toBe(expectedEmail); // Validate email

  expect(data).toHaveProperty("is_active");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("last_login_at");

  // Optionally validate roles if needed, though roles won't be updated
  expect(data).toHaveProperty("roles");
  expect(Array.isArray(data.roles)).toBe(true);
  for (const role of data.roles) {
    expect(role).toHaveProperty("id");
    expect(role).toHaveProperty("uuid");
    expect(role).toHaveProperty("name");
    expect(role).toHaveProperty("description");
  }
}

// Validate User deletion response
export async function validateUserDeletion(response) {
  const data = await response.json();

  expect(response.status()).toBe(200);
}
export async function validateUserStatusChange(
  response,
  expectedId,
  expectedActiveStatus
) {
  const data = await response.json();

  expect(response.status()).toBe(200);

  // Validate user properties
  expect(data).toHaveProperty("id");
  expect(data.id).toBe(expectedId);

  expect(data).toHaveProperty("is_active");
  expect(data.is_active).toBe(expectedActiveStatus); // true for activate, false for deactivate

  expect(data).toHaveProperty("name");
  expect(data).toHaveProperty("email");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
  expect(data).toHaveProperty("last_login_at");

  // Roles are optional in this context but should still be consistent
  expect(data).toHaveProperty("roles");
  expect(Array.isArray(data.roles)).toBe(true);
  for (const role of data.roles) {
    expect(role).toHaveProperty("id");
    expect(role).toHaveProperty("uuid");
    expect(role).toHaveProperty("name");
    expect(role).toHaveProperty("description");
  }
}
export const validateUniqueSuperAdminFieldValues = async (response, field) => {
  expect(response.ok()).toBeTruthy(); // HTTP 200

  const responseBody = await response.json();

  // Validate top-level keys
  expect(responseBody).toHaveProperty("founds");
  expect(responseBody).toHaveProperty("search_options");

  // Validate "founds" array with flexible value types
  expect(Array.isArray(responseBody.founds)).toBe(true);
  responseBody.founds.forEach((item) => {
    const isValid =
      typeof item === "string" ||
      typeof item === "number" ||
      typeof item === "boolean" ||
      item === null;

    expect(isValid).toBeTruthy(); // Accept string, number, boolean, or null
  });

  // Validate "search_options" only has required fields present
  const requiredSearchOptionsFields = [
    "ordering",
    "page",
    "page_size",
    "search",
    "total_count",
  ];

  requiredSearchOptionsFields.forEach((fieldName) => {
    expect(responseBody.search_options).toHaveProperty(fieldName);
  });
};
