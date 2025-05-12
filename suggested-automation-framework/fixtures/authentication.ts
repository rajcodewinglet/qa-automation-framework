import { test as base } from '@playwright/test';
import { tokenManager } from '../utils/tokenManager';
import { env } from '../environments/env';
import { logger } from '../utils/logger';

/**
 * Extended test fixture that includes authentication
 */
export const test = base.extend({
  /**
   * Authenticate before each test and provide token
   */
  authToken: async ({}, use) => {
    logger.info('Starting authentication fixture');
    
    // Get a token before the test runs
    const token = await tokenManager.getToken();
    
    if (!token) {
      logger.error('Failed to get authentication token in fixture');
      throw new Error('Authentication failed');
    }
    
    logger.info('Authentication successful');
    
    // Provide the token to the test
    await use(token);
    
    // Optionally clean up after the test
    // This could be removed if you want to reuse tokens across tests
    // tokenManager.clearToken();
  },
  /**
   * Provide base API URL for the product based on environment
   */
  baseApiUrl: async ({ }, use) => {
    // Use the base URL from environment config
    const baseUrl = env.getBaseUrl();
    await use(baseUrl);
  },
});

export { expect } from '@playwright/test';