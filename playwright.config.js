// playwright.config.js
// @ts-check
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // load .env


export default defineConfig({
  testDir: './e2e',
  retries: 0,
  use: {
    headless: true,
  },
});
