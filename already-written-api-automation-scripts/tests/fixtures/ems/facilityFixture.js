import { faker } from "@faker-js/faker";

// Function to remove special characters from strings
const removeSpecialCharacters = (str) => str.replace(/[^a-zA-Z0-9\s\-]/g, ""); // Only allow letters, numbers, spaces, and hyphens
// Generate a facility payload with dynamic data
export const facilityFixture = (specialtyId) => ({
  name: removeSpecialCharacters(faker.company.name()), // Generate a random company name
  street_address: removeSpecialCharacters(faker.location.streetAddress()), // Generate a random street address
  landmark: removeSpecialCharacters(faker.location.streetAddress()), // Use streetAddress for landmark as a fallback
  city: removeSpecialCharacters(faker.location.city()), // Generate a random city
  state: removeSpecialCharacters(faker.location.state()), // Generate a random state
  zip_code: faker.location.zipCode(), // Generate a random zip code
  country: removeSpecialCharacters(faker.location.country()), // Generate a random country
  contact_email: faker.internet.email(), // Generate a random email
  contact_phone: faker.phone.number(), // Generate a random phone number
  type: "emergency",
  connect_with_api: "https://example.com/",
  longitude: -180,
  latitude: -90,
  specialties: [
    {
      id: specialtyId,
      is_active: true,
    },
  ],
});
