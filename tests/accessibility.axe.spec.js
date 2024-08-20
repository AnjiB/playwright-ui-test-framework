const { test, expect } = require("@playwright/test");
const PageUtil = require("../framework/page/PageUtil");
const HeaderComponent = require("../components/Header-Component");
const ChakraStockLeftLinksComponent = require("../components/Chakra-Stock-Left-Links-Component");
const AccessbilityUtil = require("../framework/accessibility/AccessbilityUtil");

test.describe("Accessbility Tests", () => {
  test("Should not have any automatically detectable WCAG A or AA violations @accessibility", async ({
    page,
  }) => {
    const pageUtil = new PageUtil(page);
    const accessbilityUtil = new AccessbilityUtil(page);

    await pageUtil.launchApp(
      "/horizon-ui-chakra/?ref=readme-horizon#/admin/default"
    );

    await accessbilityUtil.testAccessibilityIssues({
      tags: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
    });
  }),
    test("Should not have any automatically detectable accessibility issues On Nft MarketPlace", async ({
      page,
    }) => {
      const pageUtil = new PageUtil(page);

      const accessbilityUtil = new AccessbilityUtil(page);

      const chakraStockLeftLinksComponent = new ChakraStockLeftLinksComponent(
        page
      );

      const headerComponent = new HeaderComponent(page);

      await pageUtil.launchApp(
        "/horizon-ui-chakra/?ref=readme-horizon#/admin/default"
      );

      await chakraStockLeftLinksComponent.navigateToNftMarketPlace();

      await accessbilityUtil.testAccessibilityIssues();
    });
});
