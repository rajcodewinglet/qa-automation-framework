import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import {
  validateFhwaAwardTypesList,
  validateFhwaAwardTypeById,
  validateUniqueValues,
} from "../../validation/eds/fhwaAwardTypes";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | FHWA Award Types Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let awardTypeId;

  // PS-001-FHWA-AWARD-TYPES: Retrieve FHWA Award Types list
  test("PS-001-FHWA-AWARD-TYPES: GET /api/fhwa-award-types - retrieve list", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/fhwa-award-types`, {
      headers: { accept: "application/json" },
    });

    await validateFhwaAwardTypesList(response);

    const body = await response.json();
    awardTypeId = body.founds[0]?.id;
    expect(awardTypeId).toBeDefined();
  });

  // PS-002-FHWA-AWARD-TYPES: Retrieve FHWA Award Type by ID
  test("PS-002-FHWA-AWARD-TYPES: GET /api/fhwa-award-types/{id} - retrieve by ID", async ({ request }) => {
    expect(awardTypeId).toBeDefined();

    const response = await request.get(`${BASE_URL}/api/fhwa-award-types/${awardTypeId}`, {
      headers: { accept: "application/json" },
    });

    await validateFhwaAwardTypeById(response, awardTypeId);
  });
});

// ✨ PS-003-FHWA-AWARD-TYPES: Retrieve unique values for multiple fields
test.describe("EDS | FHWA Award Types Module", () => {
  const fieldsToTest = ["code", "description", "id", "uuid"];

  fieldsToTest.forEach((field, index) => {
    test(`PS-${String(index + 3).padStart(3, "0")}-FHWA-AWARD-TYPES: Retrieve unique values for '${field}'`, async ({ request }) => {
      const response = await request.get(
        `${BASE_URL}/api/fhwa-award-types/unique-values/${field}`,
        {
          headers: { accept: "application/json" },
        }
      );

      await validateUniqueValues(response);
    });
  });
});
