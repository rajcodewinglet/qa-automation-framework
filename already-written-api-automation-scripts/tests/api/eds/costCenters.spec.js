import { test, expect } from "@playwright/test";
import { getAuthHeader, getBaseUrl } from "../../../src/utils/apiUtils";
import {
  validateCostCenterList,
  validateCostCenterById,
  validateUniqueFieldValues
} from "../../validation/eds/costCenters";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | Cost Centers Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let costCenterId; // Store the first cost center ID for use in PS-002

  // PS-001-COST-CENTERS: Successfully retrieve list of cost centers
  test("PS-001-COST-CENTERS: Successfully retrieve Cost Centers List via GET /api/cost-centers", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/cost-centers/`, {
      headers: { accept: "application/json" },
    });

    // Validate the response body structure
    await validateCostCenterList(response);

    const data = await response.json();
    costCenterId = data.founds[0].id;
    expect(costCenterId).toBeDefined();
  });

  // PS-002-COST-CENTERS: Successfully retrieve a cost center by ID
  test("PS-002-COST-CENTERS: Successfully retrieve Cost Center by ID via GET /api/cost-centers/{id}", async ({ request }) => {
    expect(costCenterId).toBeDefined();

    const response = await request.get(`${BASE_URL}/api/cost-centers/${costCenterId}`, {
      headers: { accept: "application/json" },
    });

    // Validate the response for a single cost center by ID
    await validateCostCenterById(response, costCenterId);
  });
});

 // PS-003-COST-CENTERS: Retrieve unique values for cost_center, cost_center_name, cost_center_parent1, cost_center_parent1_desc, id, uuid
test.describe("PS-003-COST-CENTERS: Retrieve unique values for fields", () => {
    // Fields to validate via /unique-values/{field_name}
    const fieldsToTest = [
      "cost_center",
      "cost_center_name",
      "cost_center_parent1",
      "cost_center_parent1_desc",
      "id",
      "uuid"
    ];
  
    fieldsToTest.forEach((field, index) => {
      test(`PS-${String(index + 6).padStart(3, "0")}-COST-CENTERS: Retrieve unique values for '${field}'`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/api/cost-centers/unique-values/${field}`, {
          headers: { accept: "application/json" }, // Ensure that getAuthHeader() is defined for authentication
        });
  
        // Validate the response using the validation function
        await validateUniqueFieldValues(response, field);
      });
    });
  });
  
