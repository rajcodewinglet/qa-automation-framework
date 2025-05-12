import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import { LoadGenerator } from '../../../../shared/utils/loadGenerator';
import { ENDPOINTS } from '../../../../shared/constants/endpoints';
import { testUsers } from '../../../../shared/mocks/user.mock';
import { getOptions, setup as globalSetup, teardown as globalTeardown } from '../../../../shared/fixtures/k6-setup';

export const options: Options = getOptions({
  vus: 20,
  duration: '1m',
});

export function setup() {
  return globalSetup();
}

export function teardown(data: any) {
  globalTeardown(data);
}

export default async function () {
  const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
  const loadGenerator = new LoadGenerator(baseUrl);
  
  const responses = await loadGenerator.generateLoad(
    ENDPOINTS.AUTH.LOGIN,
    'POST',
    testUsers.validUser,
    1
  );
  if (responses.length > 0) {
    const response = responses[0];

    type ExpectedResponseType = { status: number; headers: Headers };

    check(response, {
      'login successful': (r: ExpectedResponseType) => r.status === 200,
      'response time < 500ms': (r: ExpectedResponseType) => {
        const responseTime = r.headers.get('x-response-time');
        return responseTime !== null && parseInt(responseTime, 10) < 500;
      },
    });
  } else {
    console.error("No response received from load generator");
  }

  sleep(1);
} 