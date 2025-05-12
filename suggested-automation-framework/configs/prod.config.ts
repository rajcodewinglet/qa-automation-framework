import { Config } from './types';

/**
 * Production environment configuration
 */
export const prodConfig: Config = {
  baseUrl: process.env.PROD_BASE_URL || 'https://api.example.com',
  auth: {
    username: process.env.PROD_USERNAME || 'prod_user',
    password: process.env.PROD_PASSWORD || 'prod_password',
    clientId: process.env.PROD_CLIENT_ID || 'prod_client_id',
    clientSecret: process.env.PROD_CLIENT_SECRET || 'prod_client_secret',
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
    level: process.env.LOG_LEVEL || 'warn', // Reduced logging in production
    includeHeaders: false, // Don't log headers in production
    maskSensitiveData: true,
  },
};