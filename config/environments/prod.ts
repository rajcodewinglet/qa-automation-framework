import { Config } from '../types';

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
    level: process.env.LOG_LEVEL || 'warn',
    includeHeaders: false,
    maskSensitiveData: true,
  },
};