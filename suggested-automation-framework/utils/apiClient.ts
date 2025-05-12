import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../environments/env';
import { logger } from './logger';
import { tokenManager } from './tokenManager';

/**
 * API Client for making HTTP requests
 */
class ApiClient {
  private instance: AxiosInstance;
  private static apiClient: ApiClient;

  private constructor() {
    const timeouts = env.getTimeouts();

    this.instance = axios.create({
      baseURL: env.getBaseUrl(),
      timeout: timeouts.request,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for logging and token management
    this.instance.interceptors.request.use(
      async (config) => {
        // Add authentication token if available
        const token = await tokenManager.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log the request
        this.logRequest(config);
        return config;
      },
      (error) => {
        logger.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging
    this.instance.interceptors.response.use(
      (response) => {
        this.logResponse(response);
        return response;
      },
      (error) => {
        if (error.response) {
          this.logResponse(error.response);
          
          // Handle 401 Unauthorized errors (token expired)
          if (error.response.status === 401) {
            logger.warn('Authentication token expired, refreshing...');
            tokenManager.clearToken();
            // Could implement token refresh here if needed
          }
        } else {
          logger.error('Response error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get the singleton instance of ApiClient
   * @returns ApiClient instance
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.apiClient) {
      ApiClient.apiClient = new ApiClient();
    }
    return ApiClient.apiClient;
  }

  /**
   * Log the request details
   * @param config Axios request config
   */
  private logRequest(config: AxiosRequestConfig): void {
    const logConfig = env.getLoggingConfig();
    const method = config.method?.toUpperCase() || 'UNKNOWN';
    const url = config.url || '';
    
    let message = `Request: ${method} ${url}`;
    
    if (logConfig.includeHeaders && config.headers) {
      const headers = { ...config.headers };
      
      // Mask sensitive headers
      if (logConfig.maskSensitiveData) {
        const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
        sensitiveHeaders.forEach((header) => {
          const headerKey = Object.keys(headers).find(
            (key) => key.toLowerCase() === header
          );
          if (headerKey && headers[headerKey]) {
            headers[headerKey] = '********';
          }
        });
      }
      
      message += `\nHeaders: ${JSON.stringify(headers)}`;
    }
    
    if (config.data) {
      let data = config.data;
      
      // Mask sensitive data
      if (logConfig.maskSensitiveData && typeof data === 'object') {
        data = { ...data };
        const sensitiveFields = ['password', 'token', 'apiKey', 'secret'];
        
        const maskFields = (obj: any) => {
          if (!obj || typeof obj !== 'object') return;
          
          Object.keys(obj).forEach((key) => {
            if (sensitiveFields.includes(key)) {
              obj[key] = '********';
            } else if (typeof obj[key] === 'object') {
              maskFields(obj[key]);
            }
          });
        };
        
        maskFields(data);
      }
      
      message += `\nBody: ${JSON.stringify(data)}`;
    }
    
    logger.http(message);
  }

  /**
   * Log the response details
   * @param response Axios response
   */
  private logResponse(response: AxiosResponse): void {
    const logConfig = env.getLoggingConfig();
    const status = response.status;
    const method = response.config.method?.toUpperCase() || 'UNKNOWN';
    const url = response.config.url || '';
    
    let message = `Response: ${method} ${url} - Status: ${status}`;
    
    if (logConfig.includeHeaders && response.headers) {
      message += `\nHeaders: ${JSON.stringify(response.headers)}`;
    }
    
    if (response.data) {
      message += `\nBody: ${JSON.stringify(response.data)}`;
    }
    
    logger.http(message);
  }

  /**
   * Make a GET request
   * @param url Request URL
   * @param config Axios request config
   * @returns Promise with the response
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  /**
   * Make a POST request
   * @param url Request URL
   * @param data Request body
   * @param config Axios request config
   * @returns Promise with the response
   */
  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  /**
   * Make a PUT request
   * @param url Request URL
   * @param data Request body
   * @param config Axios request config
   * @returns Promise with the response
   */
  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  /**
   * Make a PATCH request
   * @param url Request URL
   * @param data Request body
   * @param config Axios request config
   * @returns Promise with the response
   */
  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  /**
   * Make a DELETE request
   * @param url Request URL
   * @param config Axios request config
   * @returns Promise with the response
   */
  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

// Export singleton instance
export const apiClient = ApiClient.getInstance();