import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function () {
  const baseUrl = 'https://api-dev.autobridgesystems.com/development/ems/api/specialties';

  // Unique name for specialty
  const name = `QA ${Math.random().toString(36).replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase()}`;

  const payload = JSON.stringify({ name });

  const headers = {
    'Content-Type': 'application/json',
  };

  // Step 1: Create Specialty
  const postRes = http.post(baseUrl, payload, { headers });


  console.log(`POST response status: ${postRes.status}`);
  console.log(`POST response body: ${postRes.body}`);
  
  check(postRes, {
    'POST status is 200': (r) => r.status === 200,
  });
  
  console.log(`Created Specialty with name: ${name}`);

  sleep(1); // Wait a second before verifying

  // Step 2: Verify using GET with search param
  const getUrl = `${baseUrl}?name=${encodeURIComponent(name)}`;
  const getRes = http.get(getUrl, { headers });

  check(getRes, {
    'GET status is 200': (r) => r.status === 200,
    'Specialty exists in response': (r) => Boolean(r.body && (r.body as string).includes(name)),
  });

  console.log(`GET response: ${getRes.body}`);
}
