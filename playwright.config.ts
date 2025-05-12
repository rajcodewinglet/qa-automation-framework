import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const ENV = process.env.ENV || 'dev';
const config: PlaywrightTestConfig = {
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
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: `api-${ENV}`,
      testMatch: /.*\.api\.spec\.ts/,
      retries: 1,
    },
    {
      name: `ui-${ENV}`,
      testMatch: /.*\.ui\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  outputDir: path.join('test-results', ENV),
  preserveOutput: 'failures-only',
  metadata: {
    env: ENV,
    type: 'Automated Tests',
    framework: 'Playwright'
  }
};

export default config;