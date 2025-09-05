const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
require('dotenv').config();

Given('I open the homepage', async function () {
  await this.page.goto(process.env.BASE_URL || 'https://demoblaze.com/');
});

When('I sign up a new user', async function () {
  const { page, username, password } = this;

  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username:' }).fill(username);
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);

  const dialogPromise = page.waitForEvent('dialog');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const dialog = await dialogPromise;
  console.log('Sign up dialog:', dialog.message());
  await dialog.accept();
});

When('I log in with that user', async function () {
  const { page, username, password } = this;

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill(username);
  await page.locator('#loginpassword').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
});

Then('I should see the welcome message with that username', async function () {
  await expect(this.page.locator('#nameofuser')).toHaveText(`Welcome ${this.username}`);
});
