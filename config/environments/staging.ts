import { Config } from '../types';

export const stgConfig: Config = {
  baseUrl: process.env.STG_BASE_URL || 'https://api-staging.example.com',
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
    api: {
      baseUrl: '/api/v1',
      version: 'v1',
    },
    admin: {
      baseUrl: '/admin/v1',
      version: 'v1',
    },
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    includeHeaders: true,
    maskSensitiveData: true,
  },
};