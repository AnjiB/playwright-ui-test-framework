const HeaderComponentObj = require("../componet-objects/Header-Component-Obj");
const { expect } = require("@playwright/test");

class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.headerComponentObj = new HeaderComponentObj(this.page);
  }

  async assertBreadCrumbLinkContains(expectedText, count) {
    const locator = this.headerComponentObj.getBreadCrumbList();

    await expect(locator.filter({ hasText: expectedText })).toHaveCount(count);
  }
}

module.exports = HeaderComponent;
