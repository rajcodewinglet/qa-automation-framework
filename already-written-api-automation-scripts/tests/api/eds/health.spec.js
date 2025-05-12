import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils"; // Corrected import path
import { validateHealthCheckResponse } from "../../validation/eds/health";
const BASE_URL = getBaseUrl("eds"); // Dynamically load EDS module base URL

test.describe("EDS | Health Check API", () => {
  test("EDS-01: Should return 200 OK from /api/health", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`, {
      headers: { accept: "application/json" },
    });
    await validateHealthCheckResponse(response); // Clean validation call
  });
});
