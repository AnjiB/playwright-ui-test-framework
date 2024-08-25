// @ts-check
const { defineConfig, devices } = require("@playwright/test");
// @ts-ignore
require("dotenv").config();
const configs = require("./configuration/env_configs");
//const CustomReporter = require("./framework/reporting/CustomReporter");
const environment = process.env.ENV || "DEV";
const envConfig = configs[environment];
const timeoutStr = process.env.PLAYWRIGHT_TIMEOUT ?? '30000';
const timeout = parseInt(timeoutStr, 10);
const validatedTimeout = !isNaN(timeout) && timeout > 0 ? timeout : 30000;


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  timeout: validatedTimeout,
  testDir: "./tests",
  snapshotDir: process.env.SNAPSHOT_DIR ?  process.env.SNAPSHOT_DIR : 'visual_testing',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : undefined,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["allure-playwright"]],
  snapshotPathTemplate: '/{snapshotDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // PLAYWRIGHT_BASE_URL is only for docker demo purpose.
    // Ideally it should be like baseURL: envConfig.baseURL,
    baseURL: process.env.PLAYWRIGHT_BASE_URL || envConfig.baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true,
    screenshot: "only-on-failure",
    video: "on",
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

module.exports = config;
