import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils"; // Corrected import path
import { test, expect } from "@playwright/test";
import { specialtyFixture } from "../../fixtures/ems/specialtyFixture"; // Corrected import path
import {
  validateSpecialtyCreation,
  validateDuplicateSpecialtyError,
  validateSpecialtiesList,
  validateSpecialtyById,
  validateSpecialtyUpdate,
  validateSpecialtyDeletion,
} from "../../validation/ems/specialtyValidation"; // Updated import path

const BASE_URL = getBaseUrl("ems"); // Use EMS-specific base URL

test.describe("specialties", () => {
  test.describe.configure({ mode: "serial", retries: 2 });
  // First test: create a new specialty with a unique random name
  let createdSpecialtyName = specialtyFixture.uniqueName;
  let createdSpecialtyId;
  test("PS-01: POST /api/specialties - Create new specialty", async ({
    request,
  }) => {
    const newSpecialty = {
      name: createdSpecialtyName,
    };

    const response = await request.post(`${BASE_URL}/api/specialties`, {
      data: newSpecialty,
      headers: getAuthHeader("ems"),
    });
    await validateSpecialtyCreation(response, createdSpecialtyName);
    // Capture the created specialty's ID
    const data = await response.json();
    createdSpecialtyId = data.id; // Store the id of the created specialt
  });

  // Second test: try to create a specialty with the same name (duplicate)
  test("NG-01: POST /api/specialties - Duplicate specialty name", async ({
    request,
  }) => {
    const duplicateSpecialty = {
      name: createdSpecialtyName, // Reuse the name from the first test
    };

    const response = await request.post(`${BASE_URL}/api/specialties`, {
      data: duplicateSpecialty,
      headers: getAuthHeader("ems"),
    });

    await validateDuplicateSpecialtyError(response);
  });
  // Third test: GET all specialties and validate the response
  test("PS-02: GET /api/specialties - Fetch list of specialties", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/api/specialties`, {
      headers: getAuthHeader("ems"),
    });
    // Call the validation function to assert the response
    await validateSpecialtiesList(response);
  });
  // Four test: GET a specific specialty using the ID from the first test
  test("PS-03: GET /api/specialties/{id} - Fetch specialty by ID", async ({
    request,
  }) => {
    expect(createdSpecialtyId).toBeDefined(); // Ensure that the ID is available

    const response = await request.get(
      `${BASE_URL}/api/specialties/${createdSpecialtyId}`,
      {
        headers: getAuthHeader("ems"),
      }
    );
    // Use the validation function for the specialty by ID
    await validateSpecialtyById(response, createdSpecialtyId);
  });
  test("PS-04: PATCH /api/specialties/{id} - Update specialty name", async ({
    request,
  }) => {
    expect(createdSpecialtyId).toBeDefined();

    const updatedSpecialtyName = `${createdSpecialtyName} Updated`;

    const response = await request.patch(
      `${BASE_URL}/api/specialties/${createdSpecialtyId}`,
      {
        data: { name: updatedSpecialtyName },
        headers: getAuthHeader("ems"),
      }
    );

    await validateSpecialtyUpdate(
      response,
      createdSpecialtyId,
      updatedSpecialtyName
    );
  });
  test("PS-05: DELETE /api/specialties/{id} - Delete specialty by ID", async ({
    request,
  }) => {
    expect(createdSpecialtyId).toBeDefined();

    const response = await request.delete(
      `${BASE_URL}/api/specialties/${createdSpecialtyId}`,
      {
        headers: getAuthHeader("ems"),
      }
    );

    await validateSpecialtyDeletion(response);
  });
});
