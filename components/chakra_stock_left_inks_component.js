const UIActions = require("../framework/actions/ui_actions");
const { expect } = require("@playwright/test");
const ChakraStockLeftLinksComponentObj = require("../componet_objects/chakra_stock_left_links_comp_obj");

class ChakraStockLeftLinksComponent {
  constructor(page) {
    this.page = page;
    this.chakraStockLeftLinksComponentObj =
      new ChakraStockLeftLinksComponentObj(this.page);
  }

  async mainDashboardIsAutoSelected() {
    const locator =
      this.chakraStockLeftLinksComponentObj.getMainDashboardLink();
    await expect(locator).toHaveAttribute("aria-current", "page");
    await expect(locator).toHaveAttribute("class", "active");
  }

  async navigateToNftMarketPlace({ check_navigation } = {}) {
    const locator =
      this.chakraStockLeftLinksComponentObj.getNftMarketPlaceLink();
    const uiActions = new UIActions(locator);
    await uiActions.click();
    if (check_navigation) {
      await expect(locator).toHaveAttribute("aria-current", "page");
      await expect(locator).toHaveAttribute("class", "active");
    }
  }

  async navigateTopath(navPath) {
    const locator =
      this.chakraStockLeftLinksComponentObj.getLinkLocator(navPath);
    const uiActions = new UIActions(locator);
    await uiActions.click();
    if (!navPath.includes("sign")) {
      await expect(locator).toHaveAttribute("aria-current", "page");
      await expect(locator).toHaveAttribute("class", "active");
    }
  }
}

module.exports = ChakraStockLeftLinksComponent;
