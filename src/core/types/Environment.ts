export interface ServiceConfig {
  endpoint: string;
  tokenExpiry?: number;
}

export interface Environment {
  env: string;
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retries: number;
  logLevel: string;
  services: {
    auth: ServiceConfig;
    users: ServiceConfig;
  };
}