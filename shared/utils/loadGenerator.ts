import { sleep } from 'k6';

export class LoadGenerator {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(baseUrl: string, headers: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  public async generateLoad(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    payload?: any,
    iterations: number = 1,
    delay: number = 0
  ) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
      if (delay > 0) {
        sleep(delay);
      }

      const response = await this.makeRequest(endpoint, method, payload);
      results.push(response);
    }

    return results;
  }

  private async makeRequest(endpoint: string, method: string, payload?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const params = {
      headers: this.headers,
    };

    let response;
    switch (method) {
      case 'GET':
        response = await fetch(url, { ...params, method: 'GET' });
        break;
      case 'POST':
        response = await fetch(url, {
          ...params,
          method: 'POST',
          body: JSON.stringify(payload),
        });
        break;
      case 'PUT':
        response = await fetch(url, {
          ...params,
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        break;
      case 'DELETE':
        response = await fetch(url, { ...params, method: 'DELETE' });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return {
      status: response.status,
      body: await response.json(),
      headers: response.headers,
    };
  }
} 