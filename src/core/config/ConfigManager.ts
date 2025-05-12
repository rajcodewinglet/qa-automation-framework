import dotenv from 'dotenv';
import { Environment } from '../types/Environment';

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Environment;

  private constructor() {
    dotenv.config();
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig(): Environment {
    const env = process.env.ENV || 'dev';
    
    return {
      env,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      apiKey: process.env.API_KEY || '',
      timeout: parseInt(process.env.TIMEOUT || '30000'),
      retries: parseInt(process.env.RETRIES || '2'),
      logLevel: process.env.LOG_LEVEL || 'info',
      services: {
        auth: {
          endpoint: process.env.AUTH_ENDPOINT || '/api/auth',
          tokenExpiry: parseInt(process.env.TOKEN_EXPIRY || '3600')
        },
        users: {
          endpoint: process.env.USERS_ENDPOINT || '/api/users'
        }
      }
    };
  }

  public getConfig(): Environment {
    return this.config;
  }
}

export const config = ConfigManager.getInstance().getConfig();