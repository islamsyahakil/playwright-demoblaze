import { test, expect } from '@playwright/test';
import { generateRandomPassword, generateRandomUsername } from '../helpers/helpers';
import dotenv from 'dotenv';

dotenv.config();

test('Sign-Up and Login for the First time', async ({ page }) => {

    const username = generateRandomUsername();
    const password = generateRandomPassword();

    await test.step('Open homepage', async () => {
        await page.goto(process.env.BASE_URL);
    });

    await test.step('Sign up new user', async () => {
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByRole('textbox', { name: 'Username:' }).fill(username);
        await page.getByRole('textbox', { name: 'Password:' }).fill(password);

        page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
        });

        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    await test.step('Log in with new account', async () => {
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').fill(username);
        await page.locator('#loginpassword').fill(password);
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect(page.locator('#nameofuser')).toBeVisible();
        await expect(page.locator('#nameofuser')).toHaveText(`Welcome ${username}`);
    });
});