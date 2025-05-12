import { Config } from './types';

/**
 * Development environment configuration
 */
export const devConfig: Config = {
  baseUrl: process.env.DEV_BASE_URL || 'https://dev-api.example.com',
  auth: {
    username: process.env.DEV_USERNAME || 'dev_user',
    password: process.env.DEV_PASSWORD || 'dev_password',
    clientId: process.env.DEV_CLIENT_ID || 'dev_client_id',
    clientSecret: process.env.DEV_CLIENT_SECRET || 'dev_client_secret',
    tokenUrl: '/auth/token',
  },
  timeouts: {
    default: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    request: parseInt(process.env.REQUEST_TIMEOUT || '15000'),
  },
  products: {
    eds: {
      baseUrl: '/api/eds',
      version: 'v1',
    },
    aiEms: {
      baseUrl: '/api/ai-ems',
      version: 'v1',
    },
    documentProcessing: {
      baseUrl: '/api/document-processing',
      version: 'v1',
    },
    var: {
      baseUrl: '/api/var',
      version: 'v1',
    },
    superAdmin: {
      baseUrl: '/api/super-admin',
      version: 'v1',
    },
    workforceAgent: {
      baseUrl: '/api/workforce-agent',
      version: 'v1',
    },
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    includeHeaders: true,
    maskSensitiveData: true,
  },
};