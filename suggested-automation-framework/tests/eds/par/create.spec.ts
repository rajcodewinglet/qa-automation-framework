import { test, expect } from '../../../fixtures/authentication';
import { createPar, ParCreateRequest } from '../../../requests/eds/par/create';
import createTestData from '../../../data/eds/par/create.json';
import { logger } from '../../../utils/logger';

/**
 * Test suite for PAR creation endpoints
 */
test.describe('PAR Creation API Tests', () => {
  
  /**
   * @smoke
   * Test that a PAR can be created successfully
   */
  test('should create a new PAR @smoke', async ({ authToken }) => {
    // Prepare test data
    const createRequest: ParCreateRequest = {
      ...createTestData,
    };
    
    // Execute the create request
    const response = await createPar(createRequest);
    
    // Log the created PAR ID for reference
    logger.info(`Created PAR with ID: ${response.data.id}`);
    
    // Assertions
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.title).toBe(createRequest.title);
    expect(response.data.description).toBe(createRequest.description);
    expect(response.data.status).toBe(createRequest.status);
    expect(response.data.type).toBe(createRequest.type);
    expect(response.data.priority).toBe(createRequest.priority);
    expect(response.data.assignedTo).toBe(createRequest.assignedTo);
    expect(response.data.tags).toEqual(expect.arrayContaining(createRequest.tags));
    expect(response.data.createdAt).toBeDefined();
  });
  
  /**
   * @regression
   * Test creation with missing required fields
   */
  test('should return 400 when required fields are missing @regression', async ({ authToken }) => {
    // Prepare test data with missing required fields
    const invalidRequest: Partial<ParCreateRequest> = {
      description: 'Missing required fields',
      // Missing title, status, etc.
    };
    
    // Execute with error handling to prevent test failure
    try {
      await createPar(invalidRequest as ParCreateRequest);
      // If we get here, the request didn't fail as expected
      expect(true).toBe(false); // Force test to fail
    } catch (error: any) {
      // Assertions
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('error');
      expect(error.response.data.error).toContain('required');
    }
  });
  
  /**
   * @regression
   * Test creation with very long values
   */
  test('should handle very long field values correctly @regression', async ({ authToken }) => {
    // Prepare test data with very long values
    const longTitle = 'A'.repeat(1000);
    const longDescription = 'B'.repeat(5000);
    
    const longRequest: ParCreateRequest = {
      ...createTestData,
      title: longTitle,
      description: longDescription,
    };
    
    // Execute the create request
    const response = await createPar(longRequest);
    
    // Assertions
    expect(response.status).toBe(201);
    expect(response.data.title).toBe(longTitle);
    expect(response.data.description).toBe(longDescription);
  });
});