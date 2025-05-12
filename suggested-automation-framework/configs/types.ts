/**
 * Configuration type definitions
 */

export interface Auth {
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
}

export interface Timeouts {
  default: number;
  request: number;
}

export interface ProductConfig {
  baseUrl: string;
  version: string;
}

export interface Products {
  eds: ProductConfig;
  aiEms: ProductConfig;
  documentProcessing: ProductConfig;
  var: ProductConfig;
  superAdmin: ProductConfig;
  workforceAgent: ProductConfig;
}

export interface Logging {
  level: string;
  includeHeaders: boolean;
  maskSensitiveData: boolean;
}

export interface Config {
  baseUrl: string;
  auth: Auth;
  timeouts: Timeouts;
  products: Products;
  logging: Logging;
}