import { expect } from "@playwright/test";

// Validate Specialty creation response
export async function validateSpecialtyCreation(
  response,
  expectedSpecialtyName
) {
  const data = await response.json();

  expect(response.status()).toBe(200); // Ensure the response status is 200 (OK)
  expect(data).toHaveProperty("id"); // Ensure the ID is present in the response
  expect(data).toHaveProperty("uuid"); // Ensure the UUID is present
  expect(data).toHaveProperty("name", expectedSpecialtyName); // Ensure the specialty name matches
  expect(data).toHaveProperty("created_at"); // Ensure the created_at property is present
  expect(data).toHaveProperty("updated_at"); // Ensure the updated_at property is present
}
// Validate Facility creation response
export async function validateFacilityCreation(response, expectedFacilityName) {
  const data = await response.json();
  expect(response.status()).toBe(200); // Ensure the response status is 200 (OK)
  expect(data).toHaveProperty("id"); // Ensure the Facility ID is present
  expect(data).toHaveProperty("uuid"); // Ensure the Facility UUID is present
  expect(data).toHaveProperty("name", expectedFacilityName); // Ensure the Facility name matches
  expect(data).toHaveProperty("street_address"); // Validate street address is present
  expect(data).toHaveProperty("landmark"); // Validate landmark is present
  expect(data).toHaveProperty("city"); // Validate city is present
  expect(data).toHaveProperty("state"); // Validate state is present
  expect(data).toHaveProperty("zip_code"); // Validate zip code is present
  expect(data).toHaveProperty("country"); // Validate country is present
  expect(data).toHaveProperty("contact_email"); // Validate contact_email is present
  expect(data).toHaveProperty("contact_phone"); // Validate contact_phone is present
  expect(data).toHaveProperty("type"); // Validate type is present
  expect(data).toHaveProperty("connect_with_api"); // Validate connect_with_api is present
  expect(data).toHaveProperty("longitude"); // Validate longitude is present
  expect(data).toHaveProperty("latitude"); // Validate latitude is present
  expect(data).toHaveProperty("specialties"); // Validate specialties array is present
  expect(Array.isArray(data.specialties)).toBe(true); // Ensure specialties is an array
  expect(data.specialties.length).toBeGreaterThan(0); // Ensure there is at least one specialty
  expect(data.specialties[0]).toHaveProperty("id"); // Validate the first specialty has an ID
  expect(data.specialties[0]).toHaveProperty("is_active"); // Validate the active status of the first specialty
}

export const validateFacilityList = async (response, facilityName) => {
  expect(response.status()).toBe(200); // Check for successful response

  const data = await response.json();

  // Validate that the response contains the expected properties
  expect(data.founds).toBeInstanceOf(Array); // Ensure that 'founds' is an array
  expect(data.founds.length).toBeGreaterThan(0); // Ensure there are facilities

  // Validate that each facility in the list has required properties
  data.founds.forEach((facility) => {
    expect(facility).toHaveProperty("id");
    expect(facility).toHaveProperty("uuid");
    expect(facility).toHaveProperty("name",);
    expect(facility).toHaveProperty("created_at");
    expect(facility).toHaveProperty("updated_at");
    expect(facility).toHaveProperty("street_address");
    expect(facility).toHaveProperty("city");
    expect(facility).toHaveProperty("state");
    expect(facility).toHaveProperty("zip_code");
    expect(facility).toHaveProperty("country");
    expect(facility).toHaveProperty("contact_email");
    expect(facility).toHaveProperty("contact_phone");
    expect(facility).toHaveProperty("type");
    expect(facility).toHaveProperty("connect_with_api");
    expect(facility).toHaveProperty("longitude");
    expect(facility).toHaveProperty("latitude");
    expect(facility).toHaveProperty("specialties");
  });

  // Ensure the created facility is present in the list by name
  const createdFacility = data.founds.find((facility) => facility.name === facilityName);
  expect(createdFacility).toBeDefined(); // Ensure the facility is found in the list
};

// Validate Facility by ID response
export async function validateFacilityById(response, expectedFacilityId, expectedFacilityName) {
  const data = await response.json();

  expect(response.status()).toBe(200); // Ensure status is 200 (OK)
  expect(data).toHaveProperty("id", expectedFacilityId); // Ensure the ID matches
  expect(data).toHaveProperty("name", expectedFacilityName); // Ensure the name matches
  expect(data).toHaveProperty("street_address"); // Ensure street_address is present
  expect(data).toHaveProperty("city"); // Ensure city is present
  expect(data).toHaveProperty("state"); // Ensure state is present
  expect(data).toHaveProperty("zip_code"); // Ensure zip_code is present
  expect(data).toHaveProperty("country"); // Ensure country is present
  expect(data).toHaveProperty("contact_email"); // Ensure contact_email is present
  expect(data).toHaveProperty("contact_phone"); // Ensure contact_phone is present
  expect(data).toHaveProperty("specialties"); // Ensure specialties is present
  expect(Array.isArray(data.specialties)).toBe(true); // Ensure specialties is an array
  expect(data.specialties.length).toBeGreaterThan(0); // Ensure there's at least one specialty
}

// Validate Facility update response
export async function validateFacilityUpdate(response, updatedFacilityData, facilityId) {
  const data = await response.json();

  expect(response.status()).toBe(200); // Ensure the response status is 200 (OK)
  expect(data).toHaveProperty("id",facilityId); // Ensure the Facility ID is present
  expect(data).toHaveProperty("uuid"); // Ensure the Facility UUID is present
  expect(data).toHaveProperty("name", updatedFacilityData.name); // Ensure the name matches the updated value
  expect(data).toHaveProperty("street_address", updatedFacilityData.street_address); // Validate the updated address
  expect(data).toHaveProperty("landmark", updatedFacilityData.landmark); // Validate the updated landmark
  expect(data).toHaveProperty("city", updatedFacilityData.city); // Validate the updated city
  expect(data).toHaveProperty("state", updatedFacilityData.state); // Validate the updated state
  expect(data).toHaveProperty("zip_code", updatedFacilityData.zip_code); // Validate the updated zip code
  expect(data).toHaveProperty("country", updatedFacilityData.country); // Validate the updated country
  expect(data).toHaveProperty("contact_email", updatedFacilityData.contact_email); // Validate the updated contact email
  expect(data).toHaveProperty("contact_phone", updatedFacilityData.contact_phone); // Validate the updated contact phone
  expect(data).toHaveProperty("type", updatedFacilityData.type); // Validate the updated type
  expect(data).toHaveProperty("connect_with_api", updatedFacilityData.connect_with_api); // Validate the updated API link
  expect(data).toHaveProperty("longitude", updatedFacilityData.longitude); // Validate the updated longitude
  expect(data).toHaveProperty("latitude", updatedFacilityData.latitude); // Validate the updated latitude
  expect(data).toHaveProperty("specialties"); // Validate the specialties array
  expect(Array.isArray(data.specialties)).toBe(true); // Ensure specialties is an array
  expect(data.specialties.length).toBeGreaterThan(0); // Ensure there's at least one specialty
  expect(data.specialties[0]).toHaveProperty("id"); // Validate the first specialty has an ID
  expect(data.specialties[0]).toHaveProperty("is_active", true); // Validate the active status of the specialty
}

export async function validateFacilityDeletion(response, facilityId) {
  const data = await response.json();

  expect(response.status()).toBe(200);
  expect(data).toHaveProperty("message");
  expect(data.message).toBe(`Facilities with id ${facilityId} deleted successfully.`);
}