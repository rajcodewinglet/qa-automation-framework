import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import {
  validateFhwaList,
  validateFhwaById,
  validateUniqueValues,
} from "../../validation/eds/fhwa";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | FHWA Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let fhwaId;

  // PS-001-FHWA: Retrieve FHWA list
  test("PS-001-FHWA: GET /api/fhwa - retrieve list", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/fhwa/`, {
      headers: { accept: "application/json" },
    });

    await validateFhwaList(response);

    const body = await response.json();
    fhwaId = body.founds[0]?.id;
    expect(fhwaId).toBeDefined();
  });

  // PS-002-FHWA: Retrieve FHWA by ID
  test("PS-002-FHWA: GET /api/fhwa/{id} - retrieve by ID", async ({
    request,
  }) => {
    expect(fhwaId).toBeDefined();

    const response = await request.get(`${BASE_URL}/api/fhwa/${fhwaId}`, {
      headers: { accept: "application/json" },
    });

    await validateFhwaById(response, fhwaId);
  });
});
test.describe("EDS | FHWA Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  // Fields to test
  const fieldsToTest = [
    "program_code",
    "project_number",
    "soar_grant",
    "soar_project_no",
    "stip_reference",
    "categories",
    "id",
    "uuid",
  ];

  fieldsToTest.forEach((field, index) => {
    test(`PS-${String(index + 3).padStart(
      3,
      "0"
    )}-FHWA: GET /api/fhwa/unique-values/${field} - retrieve unique values for '${field}'`, async ({
      request,
    }) => {
      const response = await request.get(
        `${BASE_URL}/api/fhwa/unique-values/${field}`,
        {
          headers: { accept: "application/json" }, // Ensure that getAuthHeader() is defined for authentication
        }
      );

      // Validate the response using the validation function
      await validateUniqueValues(response, field);
    });
  });
});
