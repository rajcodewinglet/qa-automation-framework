import dotenv from 'dotenv';

dotenv.config();

export interface Config {
  env: string;
  baseUrl: string;
  timeouts: {
    default: number;
    request: number;
  };
  logging: {
    level: string;
    file: string;
  };
}

const env = process.env.ENV || 'dev';

export const config: Config = {
  env,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  timeouts: {
    default: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    request: parseInt(process.env.REQUEST_TIMEOUT || '10000')
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: `logs/${env}/test.log`
  }
};