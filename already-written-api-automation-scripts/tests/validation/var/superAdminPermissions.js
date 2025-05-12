import { expect } from "@playwright/test";

export async function validatePermissionsList(response) {
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty("permissions");
  expect(Array.isArray(body.permissions)).toBe(true);

  body.permissions.forEach((permission) => {
    expect(permission).toHaveProperty("name");
    expect(permission).toHaveProperty("description");
    expect(permission).toHaveProperty("uuid");
    expect(permission).toHaveProperty("resource");
    expect(permission).toHaveProperty("action");

    expect(typeof permission.name).toBe("string");
    expect(typeof permission.description).toBe("string");
    expect(typeof permission.uuid).toBe("string");
    expect(typeof permission.resource).toBe("string");
    expect(typeof permission.action).toBe("string");
  });
}
export async function validatePermissionsByUser(response, userUuid) {
    expect(response.status()).toBe(200);
  
    const body = await response.json();
  
    expect(Array.isArray(body)).toBe(true);
  
    body.forEach((permission) => {
      expect(permission).toHaveProperty("role_uuid");
      expect(typeof permission.role_uuid).toBe("string");
  
      expect(permission).toHaveProperty("resource");
      expect(typeof permission.resource).toBe("string");
  
      expect(permission).toHaveProperty("action");
      expect(typeof permission.action).toBe("string");
  
      expect(permission).toHaveProperty("allowed");
      expect(typeof permission.allowed).toBe("boolean");
    });
  }
  
  