import { test, expect } from '../../../fixtures/authentication';
import { createPar, ParCreateRequest } from '../../../requests/eds/par/create';
import { deletePar } from '../../../requests/eds/par/delete';
import { getPar } from '../../../requests/eds/par/get';
import createTestData from '../../../data/eds/par/create.json';
import { logger } from '../../../utils/logger';

/**
 * Test suite for PAR deletion endpoints
 */
test.describe('PAR Deletion API Tests', () => {
  let parId: string;
  
  // Create a PAR before each test
  test.beforeEach(async () => {
    try {
      // Create a new PAR for each test
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
   * Test that a PAR can be deleted successfully
   */
  test('should delete a PAR successfully @smoke', async ({ authToken }) => {
    // Execute the delete request
    const deleteResponse = await deletePar(parId);
    
    // Assertions for delete response
    expect(deleteResponse.status).toBe(204);
    
    // Verify the PAR no longer exists
    try {
      await getPar(parId);
      // If we get here, the request didn't fail as expected
      expect(true).toBe(false); // Force test to fail
    } catch (error: any) {
      // Assertions
      expect(error.response.status).toBe(404);
    }
  });
  
  /**
   * @regression
   * Test deleting a non-existent PAR
   */
  test('should return 404 when deleting non-existent PAR @regression', async ({ authToken }) => {
    const nonExistentId = 'non-existent-id';
    
    // Execute with error handling to prevent test failure
    try {
      await deletePar(nonExistentId);
      // If we get here, the request didn't fail as expected
      expect(true).toBe(false); // Force test to fail
    } catch (error: any) {
      // Assertions
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error');
    }
  });
  
  /**
   * @regression
   * Test deleting the same PAR twice
   */
  test('should return 404 when deleting the same PAR twice @regression', async ({ authToken }) => {
    // Execute the first delete request
    const deleteResponse = await deletePar(parId);
    
    // Assertions for first delete
    expect(deleteResponse.status).toBe(204);
    
    // Execute the second delete request with error handling
    try {
      await deletePar(parId);
      // If we get here, the request didn't fail as expected
      expect(true).toBe(false); // Force test to fail
    } catch (error: any) {
      // Assertions for second delete
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error');
    }
  });
});