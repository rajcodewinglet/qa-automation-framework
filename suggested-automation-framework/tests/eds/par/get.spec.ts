import { test, expect } from '../../../fixtures/authentication';
import { createPar, ParCreateRequest } from '../../../requests/eds/par/create';
import { getPar, listPars } from '../../../requests/eds/par/get';
import createTestData from '../../../data/eds/par/create.json';
import { logger } from '../../../utils/logger';

/**
 * Test suite for PAR retrieval endpoints
 */
test.describe('PAR Retrieval API Tests', () => {
  let parId: string;
  
  // Create a PAR before all tests
  test.beforeAll(async () => {
    try {
      // Get a token manually since we're outside the test context
      const response = await createPar(createTestData as ParCreateRequest);
      parId = response.data.id;
      logger.info(`Created test PAR with ID: ${parId}`);
    } catch (error) {
      logger.error('Failed to create test PAR', error);
      throw error;
    }
  });
  
  /**
   * @smoke
   * Test that a PAR can be retrieved by ID
   */
  test('should get a PAR by ID @smoke', async ({ authToken }) => {
    // Execute the get request
    const response = await getPar(parId);
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(parId);
    expect(response.data.title).toBe(createTestData.title);
    expect(response.data.description).toBe(createTestData.description);
  });
  
  /**
   * @regression
   * Test retrieving a non-existent PAR
   */
  test('should return 404 for non-existent PAR @regression', async ({ authToken }) => {
    const nonExistentId = 'non-existent-id';
    
    // Execute with error handling to prevent test failure
    try {
      await getPar(nonExistentId);
      // If we get here, the request didn't fail as expected
      expect(true).toBe(false); // Force test to fail
    } catch (error: any) {
      // Assertions
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error');
    }
  });
  
  /**
   * @smoke
   * Test listing PARs with pagination
   */
  test('should list PARs with pagination @smoke', async ({ authToken }) => {
    // Execute the list request
    const response = await listPars(1, 10);
    
    // Assertions
    expect(response.status).toBe(200);
    expect(response.data.items).toBeInstanceOf(Array);
    expect(response.data).toHaveProperty('total');
    expect(response.data).toHaveProperty('page');
    expect(response.data).toHaveProperty('pageSize');
    expect(response.data.page).toBe(1);
    expect(response.data.pageSize).toBe(10);
  });
  
  /**
   * @regression
   * Test filtering PARs by status
   */
  test('should filter PARs by status @regression', async ({ authToken }) => {
    const status = 'draft';
    
    // Execute the list request with filter
    const response = await listPars(1, 10, { status });
    
    // Assertions
    expect(response.status).toBe(200);
    // Check that all returned items have the correct status
    response.data.items.forEach(item => {
      expect(item.status).toBe(status);
    });
  });
});