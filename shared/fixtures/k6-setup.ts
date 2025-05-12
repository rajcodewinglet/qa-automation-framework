import { Options } from 'k6/options';

export const defaultOptions: Options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
  },
};

export const getOptions = (customOptions: Partial<Options> = {}): Options => ({
  ...defaultOptions,
  ...customOptions,
});

export const setup = () => {
  // Add any global setup logic here
  return {
    timestamp: new Date().toISOString(),
  };
};

export const teardown = (data: any) => {
  // Add any global cleanup logic here
  console.log(`Test completed at ${data.timestamp}`);
}; 