import { expect } from "@playwright/test";

export async function validateFhwaList(response) {
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.founds)).toBe(true);

  body.founds.forEach((item) => {
    expect(item).toHaveProperty("program_code");
    expect(item).toHaveProperty("project_number");
    expect(item).toHaveProperty("soar_grant");
    expect(item).toHaveProperty("soar_project_no");
    expect(item).toHaveProperty("stip_reference");
    expect(item).toHaveProperty("categories");
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("uuid");
    expect(item).toHaveProperty("created_at");
    expect(item).toHaveProperty("updated_at");
  });
}
export async function validateFhwaById(response, expectedId) {
    expect(response.status()).toBe(200);
  
    const data = await response.json();
    expect(data).toHaveProperty("id", expectedId);
    expect(data).toHaveProperty("program_code");
    expect(data).toHaveProperty("project_number");
    expect(data).toHaveProperty("soar_grant");
    expect(data).toHaveProperty("soar_project_no");
    expect(data).toHaveProperty("stip_reference");
    expect(data).toHaveProperty("categories");
    expect(data).toHaveProperty("uuid");
    expect(data).toHaveProperty("created_at");
    expect(data).toHaveProperty("updated_at");
  }
 

  export async function validateUniqueValues(response, field) {
    expect(response.status()).toBe(200);
  
    const data = await response.json();
    expect(Array.isArray(data.founds)).toBe(true);
  
    // Validate the found unique values (check if each item is an object and not null)
    data.founds.forEach((item) => {
      // Skip if the item is null or undefined
      if (item === null || item === undefined) {
        return;  // Skip this iteration
      }
  
      // If the item is an object, check if the item has a specific property
      if (typeof item === 'object') {
        expect(item).toHaveProperty("value");  // or adjust based on the actual property name
        expect(typeof item.value).toBe("string");
      } else {
        // If it's a string or number, validate it directly
        expect([ "string", "number" ]).toContain(typeof item);  // Accept both string and number
      }
    });
  }