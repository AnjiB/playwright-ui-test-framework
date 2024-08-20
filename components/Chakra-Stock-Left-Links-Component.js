const UIActions = require("../framework/actions/UIActions");
const { expect } = require("@playwright/test");
const ChakraStockLeftLinksComponentObj = require("../componet-objects/Chakra-Stock-Left-Links-Component-Obj");

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

  async navigateToNftMarketPlace(checks = {}) {
    const { check_navigation } = checks;
    const locator =
      this.chakraStockLeftLinksComponentObj.getNftMarketPlaceLink();
    const uiActions = new UIActions(locator);
    await uiActions.click();
    if (check_navigation) {
      await expect(locator).toHaveAttribute("aria-current", "page");
      await expect(locator).toHaveAttribute("class", "active");
    }
  }
}

module.exports = ChakraStockLeftLinksComponent;
