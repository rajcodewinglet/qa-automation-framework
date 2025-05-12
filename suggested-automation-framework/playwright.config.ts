import { PlaywrightTestConfig, TestOptions } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Get environment from ENV variable or default to 'dev'
const ENV = process.env.ENV || 'dev';

// Define custom options to extend TestOptions
interface CustomTestOptions extends TestOptions {
  environmentName: string;
}

// Configuration
const config: PlaywrightTestConfig<CustomTestOptions> = {
  testDir: './tests',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report' }],
  ],
  // Custom options that can be used in tests
  use: {
    // Base URL not needed for API testing but can be useful for relative paths
    baseURL: '',
    // Pass environment name to tests
    environmentName: ENV,
    // Uncomment for trace collection on failure
    // trace: 'on-first-retry',
  },
  // Group tests by environment for better organization
  projects: [
    {
      name: `api-${ENV}`,
      testMatch: /.*\.spec\.ts/,
      use: {
        environmentName: ENV,
      },
    },
  ],
  // Define paths for artifacts
  outputDir: path.join('test-results', ENV),
};

export default config;