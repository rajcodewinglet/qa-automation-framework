export interface Config {
  baseUrl: string;
  auth: {
    username: string;
    password: string;
    clientId: string;
    clientSecret: string;
    tokenUrl: string;
  };
  timeouts: {
    default: number;
    request: number;
  };
  products: {
    [key: string]: {
      baseUrl: string;
      version: string;
    };
  };
  logging: {
    level: string;
    includeHeaders: boolean;
    maskSensitiveData: boolean;
  };
}

export interface TestData {
  [key: string]: any;
}