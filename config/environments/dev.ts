import { Config } from '../types';

export const devConfig: Config = {
  baseUrl: process.env.DEV_BASE_URL || 'https://api-dev.example.com',
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