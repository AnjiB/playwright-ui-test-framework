// @ts-check
import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { PageUtil } from "../framework/PageUtil";

test("has title", async ({ page }) => {
  const pageUtil = new PageUtil(page);

  await allure.description("Testing Horizon UI title");

  //await page.goto('/horizon-ui-chakra/?ref=readme-horizon#/admin/default');

  await pageUtil.launchApp(
    "/horizon-ui-chakra/?ref=readme-horizon#/admin/default"
  );

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Horizon UI Dashboard");
});
