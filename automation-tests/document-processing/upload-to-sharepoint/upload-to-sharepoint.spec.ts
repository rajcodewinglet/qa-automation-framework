import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('SharePoint Upload Tests', () => {
  test.setTimeout(600_000); // 10 minutes timeout

  test('Upload 100 PDFs in a single API call to SharePoint, repeated 10 times', async ({ request }) => {
    const accessToken = '';
    const sessionCookie = '';

    for (let run = 1; run <= 10; run++) {
      const formData = new FormData();

      // Append 100 uniquely named files for current iteration
      for (let i = 1; i <= 100; i++) {
        const filePath = path.join(__dirname, `../../assets/temp/file${i}.pdf`);
        const buffer = fs.readFileSync(filePath);
        const uniqueFileName = `StressTest_100_Files_Bridge_Between_VC_to_AD_Form_No_${i}_For_Run_${run}.pdf`;
        formData.append('files', new Blob([buffer], { type: 'application/pdf' }), uniqueFileName);
      }

      const start = Date.now();
      const response = await request.post(
        'https://api-dev.autobridgesystems.com/development/govtassist/service/sharepoint/bulk-upload?folder_path=AUTOBRIDGESYSTEMS/Bridge_Between_VC_to_AD/',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Cookie: `access_token=${accessToken}; session=${sessionCookie}`,
            Accept: 'application/json',
          },
          multipart: formData,
        }
      );

      const end = Date.now();
      console.log(`Run ${run} | Uploaded 100 files | Status: ${response.status()} | Time: ${end - start}ms`);
      const responseBody = await response.text();
      console.log(`Run ${run} | Response:\n${responseBody}`);

      expect(response.status()).toBe(200);
    }
  });
});
