import { devices, PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  projects: [
              {
                name: "chrome",
                use:{
                  ...devices["Desktop Chrome"]
                }
             
              }
            ],
  testMatch:["tests/Test_OQTF.ts"],
  // ["tests/Test_OQTF.ts"],["tests/SejourE2E.ts"]
  use : {
          headless : false,
          screenshot : "on",
          video : "on",
          launchOptions : {
                         //sLowMo : 1000
                          },
        },
timeout : 60 * 1000 * 5,
retries : 0
};

export default config;
