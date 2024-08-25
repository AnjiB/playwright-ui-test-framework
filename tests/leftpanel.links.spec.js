const { test, expect } = require("@playwright/test");
const PageUtil = require("../framework/page/page_util.js");
const ChakraStockLeftLinksComponent = require("../components/chakra_stock_left_inks_component.js");
const HeaderComponent = require("../components/header_component.js");
const { BASE_PATH } = require("../constants/constants.js");
const fs = require("fs");
const path = require("path");
let pageUtil;

test.beforeEach(async ({ page }) => {
  pageUtil = new PageUtil(page);
  await pageUtil.launchApp(BASE_PATH);
});

test("Verify the Horizon Page has corret title", async ({ page }) => {
  await expect(page).toHaveTitle("Horizon UI Dashboard");
});

test.describe("Horizon Left Panel Component Tests", () => {
  test("Verify Main Dashboard Link is Selected By Default", async ({
    page,
  }) => {
    const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
      page
    );
    await chakraStockLeftLinksComponent.mainDashboardIsAutoSelected();
  });

  test("Verify NFT Market Place Navigation", async ({ page }) => {
    const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
      page
    );
    const headerComponent = new HeaderComponent(page.locator("div[transition-property]"));
    await chakraStockLeftLinksComponent.navigateToNftMarketPlace({
      navigateToNftMarketPlace: true,
    });
    await pageUtil.waitForURL("**/nft-marketplace");
    await headerComponent.assertBreadCrumbLinkContains("NFT Marketplace", 1);
  });
});

test.describe("Navigation Tests", () => {
  const dataPath = path.resolve(__dirname, "../testdata/left_nav_links.json");
  const testData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  testData.forEach((data) => {
    test(
      `should navigate to ${data.name} link`,
      { tag: "@nav_link" },
      async ({ page }) => {
        const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
          page
        );
        // Get the locator for the link
        const locator = chakraStockLeftLinksComponent.navigateTopath(data.path);

        // Verify the URL is correct
        await expect(page).toHaveURL(data.path);
      }
    );
  });
});
