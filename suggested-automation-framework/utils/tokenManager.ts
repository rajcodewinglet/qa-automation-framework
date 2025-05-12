import axios from 'axios';
import { env } from '../environments/env';
import { logger } from './logger';

/**
 * Interface for authentication response
 */
interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Token manager for handling authentication tokens
 */
class TokenManager {
  private token: string | null = null;
  private tokenExpiry: Date | null = null;
  private static instance: TokenManager;

  private constructor() {}

  /**
   * Get the singleton instance of TokenManager
   * @returns TokenManager instance
   */
  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  /**
   * Get an authentication token
   * @returns Promise with the token
   */
  public async getToken(): Promise<string | null> {
    // Check if token exists and is not expired
    if (this.token && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.token;
    }

    // Otherwise, get a new token
    return this.fetchToken();
  }

  /**
   * Clear the current token
   */
  public clearToken(): void {
    this.token = null;
    this.tokenExpiry = null;
  }

  /**
   * Fetch a new authentication token
   * @returns Promise with the token
   */
  private async fetchToken(): Promise<string | null> {
    try {
      const authConfig = env.getAuthConfig();
      const baseUrl = env.getBaseUrl();
      const url = `${baseUrl}${authConfig.tokenUrl}`;

      // Request body for getting a token
      const requestBody = {
        grant_type: 'password',
        username: authConfig.username,
        password: authConfig.password,
        client_id: authConfig.clientId,
        client_secret: authConfig.clientSecret,
      };

      // Make the request
      const response = await axios.post<AuthResponse>(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Extract token and expiry
      const { access_token, expires_in } = response.data;

      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + expires_in - 60); // Subtract 60 seconds as buffer

      // Store token and expiry
      this.token = access_token;
      this.tokenExpiry = expiryDate;

      logger.info('Authentication token fetched successfully');
      return this.token;
    } catch (error) {
      logger.error('Failed to fetch authentication token', error);
      return null;
    }
  }
}

// Export singleton instance
export const tokenManager = TokenManager.getInstance();