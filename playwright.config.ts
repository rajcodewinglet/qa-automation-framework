import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnvConfig } from './config/env';

dotenv.config();
const env = process.env.ENV || 'dev';
const envConfig = getEnvConfig(env);

const config: PlaywrightTestConfig = {
  testDir: './automation-tests',
  timeout: 60000,
  expect: {
    timeout: envConfig.timeouts.default,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['line'],
    ['allure-playwright'],
    ['html', { outputFolder: 'test-reports/playwright' }],
  ],
  use: {
    baseURL: envConfig.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: `api-${env}`,
      testMatch: /.*\.spec\.ts/,
      testIgnore: /.*\.stress\.ts/,
    }
  ],
  outputDir: `test-results/${env}`,
};

export default config;