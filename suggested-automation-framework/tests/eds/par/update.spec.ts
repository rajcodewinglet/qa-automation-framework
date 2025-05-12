import { test, expect } from '../../../fixtures/authentication';
import { createPar, ParCreateRequest } from '../../../requests/eds/par/create';
import { updatePar, ParUpdateRequest } from '../../../requests/eds/par/update';
import { getPar } from '../../../requests/eds/par/get';
import createTestData from '../../../data/eds/par/create.json';
import updateTestData from '../../../data/eds/par/update.json';
import { logger } from '../../../utils/logger';

/**
 * Test suite for PAR update endpoints
 */
test.describe('PAR Update API Tests', () => {
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
   * Test that a PAR can be updated successfully
   */
  test('should update a PAR successfully @smoke', async ({ authToken }) => {
    // Prepare update data
    const updateRequest: ParUpdateRequest = {
      ...updateTestData,
    };
    
    // Execute the update request
    const updateResponse = await updatePar(parId, updateRequest);
    
    // Assertions for update response
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.id).toBe(parId);
    expect(updateResponse.data.title).toBe(updateRequest.title);
    expect(updateResponse.data.description).toBe(updateRequest.description);
    expect(updateResponse.data.status).toBe(updateRequest.status);
    expect(updateResponse.data.priority).toBe(updateRequest.priority);
    
    // Verify the update by getting the PAR
    const getResponse = await getPar(parId);
    
    // Assertions for get response
    expect(getResponse.data.title).toBe(updateRequest.title);
    expect(getResponse.data.description).toBe(updateRequest.description);
    expect(getResponse.data.status).toBe(updateRequest.status);
    expect(getResponse.data.priority).toBe(updateRequest.priority);
  });
  
  /**
   * @regression
   * Test partial update (only some fields)
   */
  test('should support partial updates @regression', async ({ authToken }) => {
    // Prepare partial update data (only title)
    const partialUpdateRequest: ParUpdateRequest = {
      title: 'Partially Updated Title',
    };
    
    // Execute the update request
    const updateResponse = await updatePar(parId, partialUpdateRequest);
    
    // Assertions
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.id).toBe(parId);
    expect(updateResponse.data.title).toBe(partialUpdateRequest.title);
    // Other fields should remain unchanged
    expect(updateResponse.data.description).toBe(createTestData.description);
    expect(updateResponse.data.status).toBe(createTestData.status);
  });
  
  /**
   * @regression
   * Test updating a non-existent PAR
   */
  test('should return 404 when updating non-existent PAR @regression', async ({ authToken }) => {
    const nonExistentId = 'non-existent-id';
    
    // Prepare update data
    const updateRequest: ParUpdateRequest = {
      title: 'Updated Title',
    };
    
    // Execute with error handling to prevent test failure
    try {
      await updatePar(nonExistentId, updateRequest);
      // If we get here, the request didn't fail as expected
      expect(true).toBe(false); // Force test to fail
    } catch (error: any) {
      // Assertions
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('error');
    }
  });
});