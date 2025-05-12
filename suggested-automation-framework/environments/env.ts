import { Config } from '../configs/types';
import { devConfig } from '../configs/dev.config';
import { stgConfig } from '../configs/stg.config';
import { prodConfig } from '../configs/prod.config';

/**
 * Environment manager that loads the appropriate config based on the ENV variable
 */
class Environment {
  private config: Config;
  private static instance: Environment;

  private constructor() {
    // Get environment from ENV variable or default to 'dev'
    const env = process.env.ENV || 'dev';
    this.config = this.loadConfig(env);
  }

  /**
   * Load the appropriate config based on the environment
   * @param env Environment name ('dev', 'stg', or 'prod')
   * @returns Config for the specified environment
   */
  private loadConfig(env: string): Config {
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

  /**
   * Get the singleton instance of Environment
   * @returns Environment instance
   */
  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  /**
   * Get the config for the current environment
   * @returns Config for the current environment
   */
  public getConfig(): Config {
    return this.config;
  }

  /**
   * Get the base URL for the current environment
   * @returns Base URL for the current environment
   */
  public getBaseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Get the product config for a specific product
   * @param product Product name
   * @returns ProductConfig for the specified product
   */
  public getProductConfig(product: keyof Config['products']): Config['products'][keyof Config['products']] {
    return this.config.products[product];
  }

  /**
   * Get the base URL for a specific product
   * @param product Product name
   * @returns Full URL for the specified product
   */
  public getProductUrl(product: keyof Config['products']): string {
    const productConfig = this.config.products[product];
    return `${this.config.baseUrl}${productConfig.baseUrl}/${productConfig.version}`;
  }

  /**
   * Get the auth config for the current environment
   * @returns Auth config for the current environment
   */
  public getAuthConfig(): Config['auth'] {
    return this.config.auth;
  }

  /**
   * Get the timeouts config for the current environment
   * @returns Timeouts config for the current environment
   */
  public getTimeouts(): Config['timeouts'] {
    return this.config.timeouts;
  }

  /**
   * Get the logging config for the current environment
   * @returns Logging config for the current environment
   */
  public getLoggingConfig(): Config['logging'] {
    return this.config.logging;
  }
}

// Export singleton instance
export const env = Environment.getInstance();