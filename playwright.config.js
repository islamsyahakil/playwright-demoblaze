// playwright.config.js (CJS, tanpa defineConfig)
const { devices } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

const testDir = defineBddConfig({
  features: ['features/**/*.feature'],
  steps: ['features/steps/**/*.js'],
  outputDir: 'tests-bdd-gen'
});

module.exports = {
  testDir,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results/junit.xml' }],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demoblaze.com',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',  use: { ...devices['Desktop Safari'] } }
  ],
  retries: 1,
  fullyParallel: true
};
