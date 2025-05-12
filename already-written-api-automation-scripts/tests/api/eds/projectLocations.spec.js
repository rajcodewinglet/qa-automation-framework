import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import {
  validateProjectLocationsList,
  validateProjectLocationById,
  validateUniqueValues,
} from "../../validation/eds/projectLocations";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | Project Locations Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let locationId;

  // PS-001-PROJECT-LOCATIONS: Retrieve project locations list
  test("PS-001-PROJECT-LOCATIONS: GET /api/project-locations - retrieve list", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/api/project-locations`, {
      headers: { accept: "application/json" },
    });

    await validateProjectLocationsList(response);

    const body = await response.json();
    locationId = body.founds[0]?.id;
    expect(locationId).toBeDefined();
  });

  // PS-002-PROJECT-LOCATIONS: Retrieve a project location by ID
  test("PS-002-PROJECT-LOCATIONS: GET /api/project-locations/{id} - retrieve by ID", async ({
    request,
  }) => {
    expect(locationId).toBeDefined();

    const response = await request.get(
      `${BASE_URL}/api/project-locations/${locationId}`,
      {
        headers: { accept: "application/json" },
      }
    );

    await validateProjectLocationById(response, locationId);
  });

  // PS-003-PROJECT-LOCATIONS: Retrieve unique values for multiple fields
  test.describe("EDS | Project Locations Module", () => {
    const fieldsToTest = [
      "location",
      "id",
      "uuid",
    ];

    fieldsToTest.forEach((field, index) => {
      test(`PS-${String(index + 3).padStart(
        3,
        "0"
      )}-PROJECT-LOCATIONS: Retrieve unique values for '${field}'`, async ({
        request,
      }) => {
        const response = await request.get(
          `${BASE_URL}/api/project-locations/unique-values/${field}`,
          {
            headers: { accept: "application/json" },
          }
        );

        await validateUniqueValues(response);
      });
    });
  });
});
