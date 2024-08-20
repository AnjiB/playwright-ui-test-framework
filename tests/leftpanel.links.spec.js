const { test, expect } = require("@playwright/test");
const PageUtil = require("../framework/page/PageUtil");
const ChakraStockLeftLinksComponent = require("../components/Chakra-Stock-Left-Links-Component");
const HeaderComponent = require("../components/Header-Component");
const { BASE_PATH } = require("../constants/Constants.js");

test("Verify the Horizon Page has corret title", async ({ page }) => {
  const pageUtil = new PageUtil(page);

  await pageUtil.launchApp(BASE_PATH);

  await expect(page).toHaveTitle("Horizon UI Dashboard");
});

test.describe("Horizon Left Panel Component Tests", () => {
  test("Verify Main Dashboard Link is Selected By Default", async ({
    page,
  }) => {
    const pageUtil = new PageUtil(page);

    const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
      page
    );

    await pageUtil.launchApp(BASE_PATH);

    await chakraStockLeftLinksComponent.mainDashboardIsAutoSelected();
  });

  test("Verify NFT Market Place Navigation", async ({ page }) => {
    const pageUtil = new PageUtil(page);

    const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
      page
    );

    const headerComponent = new HeaderComponent(page);

    await pageUtil.launchApp(BASE_PATH);

    await chakraStockLeftLinksComponent.navigateToNftMarketPlace({
      navigateToNftMarketPlace: true,
    });

    await headerComponent.assertBreadCrumbLinkContains("NFT Marketplace", 1);
  });
});
