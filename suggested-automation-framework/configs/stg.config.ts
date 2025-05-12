import { Config } from './types';

/**
 * Staging environment configuration
 */
export const stgConfig: Config = {
  baseUrl: process.env.STG_BASE_URL || 'https://stg-api.example.com',
  auth: {
    username: process.env.STG_USERNAME || 'stg_user',
    password: process.env.STG_PASSWORD || 'stg_password',
    clientId: process.env.STG_CLIENT_ID || 'stg_client_id',
    clientSecret: process.env.STG_CLIENT_SECRET || 'stg_client_secret',
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