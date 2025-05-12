import { test, expect } from "@playwright/test";
import { getAuthHeader, getBaseUrl } from "../../../src/utils/apiUtils";
import {
  validateFundsList,
  validateFundById,
  validateUniqueFieldValues
} from "../../validation/eds/funds";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | Funds Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let fundId; // Store the first fund ID for use in PS-002

  // PS-001-FUNDS: Successfully retrieve list of funds
  test("PS-001-FUNDS: Successfully retrieve Funds List via GET /api/funds", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/funds`, {
      headers: { accept: "application/json" },
    });

    // Validate the response body structure
    await validateFundsList(response);

    const data = await response.json();
    fundId = data.founds[0].id;
    expect(fundId).toBeDefined();
  });

  // PS-002-FUNDS: Successfully retrieve a fund by ID
  test("PS-002-FUNDS: Successfully retrieve Fund by ID via GET /api/funds/{id}", async ({ request }) => {
    expect(fundId).toBeDefined();

    const response = await request.get(`${BASE_URL}/api/funds/${fundId}`, {
      headers: { accept: "application/json" },
    });

    // Validate the response for a single fund by ID
    await validateFundById(response, fundId);
  });

  // PS-003-FUNDS: Retrieve unique values for fund_number, fund_name, id, uuid
  test.describe("EDS | Funds Module", () => {
    // Fields to validate via /unique-values/{field_name}
    const fieldsToTest = [
      "fund_number",
      "fund_name",
      "id",
      "uuid"
    ];

    fieldsToTest.forEach((field, index) => {
      test(`PS-${String(index + 3).padStart(3, "0")}-FUNDS: Retrieve unique values for '${field}'`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/funds/unique-values/${field}`, {
          headers: { accept: "application/json" }, // Ensure that getAuthHeader() is defined for authentication
        });

        // Validate the response using the validation function
        await validateUniqueFieldValues(response, field);
      });
    });
  });
});
