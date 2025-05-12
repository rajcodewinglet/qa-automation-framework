// src/utils/getModuleConfig.ts

export function getModuleConfig(module: string) {
    const upperModule = module.toUpperCase(); // e.g., 'facility' -> 'FACILITY'
  
    // Fetch the module-specific configurations
    const baseURL = process.env[`BASE_URL_${upperModule}`];
    const token = process.env[`AUTH_TOKEN_${upperModule}`];
  
    if (!baseURL || !token) {
      throw new Error(`Missing config for module: ${module}`);
    }
  
    return { baseURL, token };
  }
  