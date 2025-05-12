export const thresholds = {
  http: {
    // HTTP errors should be less than 1%
    http_req_failed: ['rate<0.01'],
    // 95% of requests should be below 500ms
    http_req_duration: ['p(95)<500'],
  },
  // Checks should pass
  checks: ['rate>0.99'],
  // Error rate should be less than 1%
  errors: ['rate<0.01'],
};

export const getThresholds = (customThresholds = {}) => ({
  ...thresholds,
  ...customThresholds,
});