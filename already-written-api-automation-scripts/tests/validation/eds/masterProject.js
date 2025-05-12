import { expect } from "@playwright/test";

export async function validateMasterProjectList(response) {
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.founds)).toBe(true);

  body.founds.forEach((item) => {
    expect(item).toHaveProperty("master_project_number");
    expect(item).toHaveProperty("master_project_name");
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("uuid");
    expect(item).toHaveProperty("created_at");
    expect(item).toHaveProperty("updated_at");
  });
}

export async function validateMasterProjectById(response, expectedId) {
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data).toHaveProperty("id", expectedId);
  expect(data).toHaveProperty("master_project_number");
  expect(data).toHaveProperty("master_project_name");
  expect(data).toHaveProperty("uuid");
  expect(data).toHaveProperty("created_at");
  expect(data).toHaveProperty("updated_at");
}

export async function validateUniqueValues(response, field) {
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(Array.isArray(data.founds)).toBe(true);

  data.founds.forEach((item) => {
    if (item === null || item === undefined) {
      return;
    }

    if (typeof item === "object") {
      expect(item).toHaveProperty("value");
      expect(["string", "number"]).toContain(typeof item.value);
    } else {
      expect(["string", "number"]).toContain(typeof item);
    }
  });
}
