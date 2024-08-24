const { expect } = require("@playwright/test");
const HeaderComponentObj = require("../componet_objects/header_component_obj.js");

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
