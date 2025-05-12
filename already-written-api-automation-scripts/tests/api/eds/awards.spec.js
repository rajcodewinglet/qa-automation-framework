import { test, expect } from "@playwright/test";
import { getBaseUrl } from "../../../src/utils/apiUtils";
import {
  validateAwardList,
  validateAwardById,
  validateUniqueFieldValues
} from "../../validation/eds/awards";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | Awards Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let awardId; // Store the first award ID for use in PS-002

  // PS-001-AWARDS: Successfully retrieve list of awards
  test("PS-001-AWARDS: Successfully retrieve Awards List via GET /api/awards", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/awards`, {
      headers: { accept: "application/json" },
    });

    await validateAwardList(response);

    const data = await response.json();
    awardId = data.founds[0].id;
    expect(awardId).toBeDefined();
  });

  // PS-002-AWARDS: Successfully retrieve an award by ID
  test("PS-002-AWARDS: Successfully retrieve Award by ID via GET /api/awards/{id}", async ({ request }) => {
    expect(awardId).toBeDefined();

    const response = await request.get(`${BASE_URL}/api/awards/${awardId}`, {
      headers: { accept: "application/json" },
    });

    await validateAwardById(response, awardId);
  });
});
test.describe("EDS | Awards Module | Unique Field Values", () => {
    test.describe.configure({ mode: "serial", retries: 2 });
  
    // Fields to validate via /unique-values/{field_name}
    const fieldsToTest = ["sponsor", "award_name", "id", "uuid"];
  
    fieldsToTest.forEach((field, index) => {
      test(`PS-${String(index + 3).padStart(3, "0")}-AWARDS: Retrieve unique values for '${field}'`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/awards/unique-values/${field}`, {
          headers: { accept: "application/json" },
        });
  
        await validateUniqueFieldValues(response, field);
      });
    });
  });