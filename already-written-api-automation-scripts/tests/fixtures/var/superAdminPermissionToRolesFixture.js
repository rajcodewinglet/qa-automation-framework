// User Fixture Data
export const userFixture = {
  email: "automation@test.com",
  name: "Test Automation Qa User",
  password: "Test1234!",
  is_active: true,
};

// Role Fixture Data
export const roleFixture = {
  name: "Test Automation Qa Role",
  description: "A role created for testing user-role assignments",
  permissions: [
    // Sample permission UUID, you can add more as per your requirement
    "3675d680-ebe4-4a57-b9c8-09b6605c7910", //Create User
    "6ae6af8e-8569-456a-b9df-1528b78fd751", //Read User
  ],
};
