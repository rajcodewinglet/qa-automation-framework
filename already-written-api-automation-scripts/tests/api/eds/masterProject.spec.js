import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import {
  validateMasterProjectList,
  validateMasterProjectById,
  validateUniqueValues,
} from "../../validation/eds/masterProject";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | Master Project Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let masterProjectId;

  // PS-001-MASTERPROJECT: Retrieve Master Projects list
  test("PS-001-MASTERPROJECT: GET /api/master-projects - retrieve list", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/api/master-projects`, {
      headers: { accept: "application/json" },
    });

    await validateMasterProjectList(response);

    const body = await response.json();
    masterProjectId = body.founds[0]?.id;
    expect(masterProjectId).toBeDefined();
  });

  // PS-002-MASTERPROJECT: Retrieve Master Project by ID
  test("PS-002-MASTERPROJECT: GET /api/master-projects/{id} - retrieve by ID", async ({
    request,
  }) => {
    expect(masterProjectId).toBeDefined();

    const response = await request.get(
      `${BASE_URL}/api/master-projects/${masterProjectId}`,
      {
        headers: { accept: "application/json" },
      }
    );

    await validateMasterProjectById(response, masterProjectId);
  });
});

test.describe("EDS | Master Project Unique Fields", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  // Fields to test
  const fieldsToTest = [
    "master_project_number",
    "master_project_name",
    "id",
    "uuid",
  ];

  fieldsToTest.forEach((field, index) => {
    test(`PS-${String(index + 3).padStart(
      3,
      "0"
    )}-MASTERPROJECT: GET /api/master-projects/unique-values/${field} - retrieve unique values for '${field}'`, async ({
      request,
    }) => {
      const response = await request.get(
        `${BASE_URL}/api/master-projects/unique-values/${field}`,
        {
          headers: { accept: "application/json" },
        }
      );

      await validateUniqueValues(response, field);
    });
  });
});
