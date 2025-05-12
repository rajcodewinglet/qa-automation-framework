import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils"; // Corrected import path
import { test, expect } from "@playwright/test";
import {
  validateFacilityCreation,
  validateSpecialtyCreation,
  validateFacilityList,
  validateFacilityById,
  validateFacilityUpdate,
  validateFacilityDeletion,
} from "../../validation/ems/facilityValidation";
import { specialtyFixture } from "../../fixtures/ems/specialtyFixture"; // Corrected import path
import { facilityFixture } from "../../fixtures/ems/facilityFixture"; // Corrected import path

const BASE_URL = getBaseUrl('ems'); // Use EMS-specific base URL

test.describe("EMS | Facility Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let specialtyId;
  let facilityName; // Define the facilityName in the parent scope for both tests
  let facilityId; // Declare facilityId to store the created facility's ID
  // Create the specialty only once before the actual tests run
  test.beforeAll(async ({ request }) => {
    const specialtyData = {
      name: specialtyFixture.uniqueName, // Using the unique name from specialtyFixture
    };

    const response = await request.post(`${BASE_URL}/api/specialties`, {
      data: specialtyData,
      headers: getAuthHeader("ems"),
    });

    await validateSpecialtyCreation(response, specialtyData.name);
    const data = await response.json();
    specialtyId = data.id; // Store the specialty ID for use in subsequent tests
  });

  // PS-01: Create Facility using generated specialty ID
  test("PS-01: Create Facility with valid Specialty", async ({ request }) => {
    expect(specialtyId).toBeDefined(); // Ensure the specialty ID was created
    // Use the fixture to create the facility payload
    const facilityPayload = facilityFixture(specialtyId);

    const response = await request.post(`${BASE_URL}/api/facility`, {
      data: facilityPayload,
      headers: getAuthHeader("ems"),
    });
    // Validate the facility creation response
    await validateFacilityCreation(response, facilityPayload.name);
    // ✅ Store the facility name for validation in the next test
    facilityName = facilityPayload.name;
    // Store the facility ID for later use
    const data = await response.json();
    facilityId = data.id;
  });

  // PS-02: Verify Facility List Retrieval via GET /api/facility
  test("PS-02: Get Facility List", async ({ request }) => {
    expect(facilityName).toBeDefined(); // ✅ Make sure name was set in PS-01
    // Make sure the facility has been created
    const response = await request.get(`${BASE_URL}/api/facility`, {
      headers: getAuthHeader("ems"),
    });
    // Just pass the response, not data
    await validateFacilityList(response, facilityName);
  });

  // PS-03: Get Facility by ID
  test("PS-03: Get Facility by ID", async ({ request }) => {
    expect(facilityId).toBeDefined(); // Ensure the facility ID is available
    const response = await request.get(
      `${BASE_URL}/api/facility/${facilityId}`,
      {
        headers: getAuthHeader("ems"),
      }
    );
    // Validate the facility details returned by the GET request
    await validateFacilityById(response, facilityId, facilityName);
  });

  // PS-04: Update Facility using PATCH /api/facility/{facility_id}
  test("PS-04: Update Facility", async ({ request }) => {
    expect(facilityId).toBeDefined(); // Ensure the facility ID is available

    // Generate new facility data for the update
    const updatedFacilityData = facilityFixture(specialtyId); // You can modify this to update only specific fields if needed

    // Send the PATCH request to update the facility
    const response = await request.patch(
      `${BASE_URL}/api/facility/${facilityId}`,
      {
        data: updatedFacilityData,
        headers: getAuthHeader("ems"),
      }
    );

    // Validate the updated facility data
    await validateFacilityUpdate(response, updatedFacilityData, facilityId);
  });

  // PS-05: Delete Facility using DELETE /api/facility/{facility_id}
  test("PS-05: Delete Facility", async ({ request }) => {
    expect(facilityId).toBeDefined(); // Ensure facility ID is available

    const response = await request.delete(
      `${BASE_URL}/api/facility/${facilityId}`,
      {
        headers: getAuthHeader("ems"),
      }
    );

    await validateFacilityDeletion(response, facilityId);
  });
});
