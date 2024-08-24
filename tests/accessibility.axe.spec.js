const { test, expect } = require("@playwright/test");
const PageUtil = require("../framework/page/page_util.js");
const HeaderComponent = require("../components/header_component.js");
const ChakraStockLeftLinksComponent = require("../components/chakra_stock_left_inks_component.js");
const AccessbilityUtil = require("../framework/accessibility/accessibility_util.js");
const { BASE_PATH } = require("../constants/constants.js");

test.beforeEach(async ({ page }) => {
  const pageUtil = new PageUtil(page);
  await pageUtil.launchApp(BASE_PATH);
});

test.describe("Accessbility Tests", () => {
  test("Should not have any automatically detectable WCAG A or AA violations @accessibility", async ({
    page,
  }) => {
    const accessbilityUtil = new AccessbilityUtil(page);
    await accessbilityUtil.testAccessibilityIssues({
      tags: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    });
  }),
    test("Should not have any automatically detectable accessibility issues On Nft MarketPlace", async ({
      page,
    }) => {
      const accessbilityUtil = new AccessbilityUtil(page);
      const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
        page
      );
      const headerComponent = new HeaderComponent(page);
      await chakraStockLeftLinksComponent.navigateToNftMarketPlace();
      await accessbilityUtil.testAccessibilityIssues();
    });
});
