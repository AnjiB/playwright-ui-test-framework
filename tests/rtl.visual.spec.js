const { test, expect } = require("@playwright/test");
const PageUtil = require("../framework/page/page_util.js");
const ChakraStockLeftLinksComponent = require("../components/chakra_stock_left_inks_component.js");
let pageUtil;

test.beforeEach(async ({ page }) => {
  pageUtil = new PageUtil(page);
  await pageUtil.launchApp();
});

test(
  "Visual Testing of RTL page",
  { tag: "@visual_testing" },
  async ({ page }) => {
    const navPath = "rtl/rtl-default";
    const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
      page
    );
    await chakraStockLeftLinksComponent.navigateTopath(navPath);
    await expect(page).toHaveURL(navPath);
    await expect(page).toHaveScreenshot({
      threshold: 0.1,
    });
  }
);
