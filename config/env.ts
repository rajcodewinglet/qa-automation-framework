import { Config } from './types';
import { devConfig } from './environments/dev';
import { stgConfig } from './environments/staging';
import { prodConfig } from './environments/prod';

export function getEnvConfig(env: string): Config {
  switch (env.toLowerCase()) {
    case 'dev':
      return devConfig;
    case 'stg':
      return stgConfig;
    case 'prod':
      return prodConfig;
    default:
      console.warn(`Unknown environment: ${env}, defaulting to 'dev'`);
      return devConfig;
  }
}

export const currentEnv = process.env.ENV || 'dev';
export const config = getEnvConfig(currentEnv);