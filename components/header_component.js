const { expect } = require("@playwright/test");
const HeaderComponentObj = require("../componet_objects/header_component_obj.js");
const UIActions = require("../framework/actions/ui_actions.js");

class HeaderComponent {
  constructor(root) {
    this.headerComponentObj = new HeaderComponentObj(root);
  }

  async assertBreadCrumbLinkContains(expectedText, count) {
    const locator = this.headerComponentObj.getBreadCrumbList();
    await expect(locator.filter({ hasText: expectedText })).toHaveCount(count);
  }

  async fillTextInSearchbox(searchWord) {
    const locator = this.headerComponentObj.getSearchBox();
    const uiAction = new UIActions(locator);
    await uiAction.fillText(searchWord);
    await uiAction.keyPress("Enter");
    await expect(locator).toHaveValue(searchWord);
  }
}

module.exports = HeaderComponent;
