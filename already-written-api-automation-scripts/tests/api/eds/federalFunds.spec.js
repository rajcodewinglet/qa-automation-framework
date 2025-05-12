import { test, expect } from "@playwright/test";
import { getBaseUrl, getAuthHeader } from "../../../src/utils/apiUtils";
import {
  validateFederalFundsList,
  validateFederalFundById,
  validateUniqueValues,
} from "../../validation/eds/federalFunds";

const BASE_URL = getBaseUrl("eds");

test.describe("EDS | Federal Funds Module", () => {
  test.describe.configure({ mode: "serial", retries: 2 });

  let fundId;

  // PS-001-FEDERAL-FUNDS: Retrieve federal funds list
  test("PS-001-FEDERAL-FUNDS: GET /api/federal-funds - retrieve list", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/api/federal-funds/`, {
      headers: { accept: "application/json" },
    });

    await validateFederalFundsList(response);

    const body = await response.json();
    fundId = body.founds[0]?.id;
    expect(fundId).toBeDefined();
  });

  // PS-002-FEDERAL-FUNDS: Retrieve a federal fund by ID
  test("PS-002-FEDERAL-FUNDS: GET /api/federal-funds/{id} - retrieve by ID", async ({
    request,
  }) => {
    expect(fundId).toBeDefined();

    const response = await request.get(
      `${BASE_URL}/api/federal-funds/${fundId}`,
      {
        headers: { accept: "application/json" },
      }
    );

    await validateFederalFundById(response, fundId);
  });
});
// ✨ PS-003-FEDERAL-FUNDS: Retrieve unique values for multiple fields
test.describe("EDS | Cost Centers Module", () => {
  const fieldsToTest = [
    "fund_code",
    "fund_available",
    "fund_obligations",
    "fund_unobligated_balance",
    "fund_pending_obligations",
    "fund_pending_unobligated_balance",
    "fund_advance_construction",
    "id",
    "uuid",
  ];

  fieldsToTest.forEach((field, index) => {
    test(`PS-${String(index + 3).padStart(
      3,
      "0"
    )}-FEDERAL-FUNDS: Retrieve unique values for '${field}'`, async ({
      request,
    }) => {
      const response = await request.get(
        `${BASE_URL}/api/federal-funds/unique-values/${field}`,
        {
          headers: { accept: "application/json" },
        }
      );

      await validateUniqueValues(response);
    });
  });
});
