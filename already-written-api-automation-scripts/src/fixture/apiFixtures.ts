import { test as base, APIRequestContext } from '@playwright/test';
import { getModuleConfig } from '../utils/getModuleConfig';

// Extend Playwright test with a custom fixture
export const test = base.extend<{
  // Define the custom fixture that provides an APIRequestContext
  moduleRequest: (module: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: object) => Promise<any>;
}>({
  // The custom fixture that makes an API request based on the module and HTTP method
  moduleRequest: async ({ request }, use) => {
    const moduleRequest = async (module: string, method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', data: object = {}) => {
      const config = getModuleConfig(module);

      // Prepare the request options based on the method
      const options: any = {
        method, // HTTP method (GET, POST, PUT, PATCH, DELETE)
        headers: {
          Authorization: `Bearer ${config.token}`,
        },
      };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        options.data = data; // Attach data for POST, PUT, PATCH requests
      }

      // Perform the request and return the response
      const response = await request[method.toLowerCase()](`${config.baseURL}/api/endpoint`, options);

      return response;
    };

    // Use the fixture for the test
    await use(moduleRequest);
  },
});
