// @ts-check
const { test, expect } = require('@playwright/test');
const {allure} = require('allure-playwright')

test('has title', async ({ page }) => {

  await allure.description('Testing Horizon UI title');

  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Horizon UI Dashboard');
});
