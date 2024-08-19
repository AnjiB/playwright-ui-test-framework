// @ts-check
import { test, expect } from "@playwright/test";
import { PageUtil } from "../framework/PageUtil";
import {ChakraStockLeftLinksComponent} from '../components/Chakra-Stock-Left-Links-Component'
import {HeaderComponent} from '../components/Header-Component'


test.skip("Verify the Horizon Page has corret title", async ({ page }) => {
  const pageUtil = new PageUtil(page);

  await pageUtil.launchApp(
    "/horizon-ui-chakra/?ref=readme-horizon#/admin/default"
  );

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Horizon UI Dashboard");
});

test.describe('Horizon Left Panel Component Tests', () => {

test.skip("Verify Main Dashboard Link is Selected By Default", async ({ page }) => {

  const pageUtil = new PageUtil(page);

  const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(page);

  await pageUtil.launchApp(
    "/horizon-ui-chakra/?ref=readme-horizon#/admin/default"
  );

  await chakraStockLeftLinksComponent.mainDashboardIsAutoSelected();

});

test("Verify NFT Market Place Navigation", async ({ page }) => {

  const pageUtil = new PageUtil(page);

  const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(page);

  const headerComponent = new HeaderComponent(page);

  await pageUtil.launchApp(
    "/horizon-ui-chakra/?ref=readme-horizon#/admin/default"
  );

  await chakraStockLeftLinksComponent.navigateToNftMarketPlace();

  await headerComponent.assertBreadCrumbLinkContains("NFT Marketplace", 1);

});

});



