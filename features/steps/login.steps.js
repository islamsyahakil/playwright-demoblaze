// features/steps/login.steps.js
const { createBdd } = require('playwright-bdd');
const { expect } = require('@playwright/test');
require('dotenv').config();

const { Given, When, Then } = createBdd();

// simpan state per-skenario (aman untuk parallel)
const state = new WeakMap();

Given('I open the homepage', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'https://demoblaze.com/');
  state.set(page, {});
});

When('I sign up a new user', async ({ page }) => {
  const s = state.get(page) || {};
  s.username = `user_${Date.now()}`;
  s.password = 'P@ssw0rd123';
  state.set(page, s);

  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(s.username);
  await page.getByRole('textbox', { name: 'Password:' }).fill(s.password);

  const dialog = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  (await dialog).accept();
});

When('I log in with that user', async ({ page }) => {
  const { username, password } = state.get(page) || {};
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill(username);
  await page.locator('#loginpassword').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
});

Then('I should see the welcome message with that username', async ({ page }) => {
  const { username } = state.get(page) || {};
  await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${username}`);
});
