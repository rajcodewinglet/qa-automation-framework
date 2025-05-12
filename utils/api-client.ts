import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../config/env';
import { logger } from './logger';

class ApiClient {
  private instance: AxiosInstance;
  private static apiClient: ApiClient;

  private constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeouts.request,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        logger.info(`Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        logger.info(`Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        logger.error('Response error:', error);
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.apiClient) {
      ApiClient.apiClient = new ApiClient();
    }
    return ApiClient.apiClient;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.get<T>(url, config);
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete<T>(url, config);
  }
}

export const apiClient = ApiClient.getInstance();