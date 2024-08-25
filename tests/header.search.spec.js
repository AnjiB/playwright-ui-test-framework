const { test, expect } = require("@playwright/test");
const PageUtil = require("../framework/page/page_util.js");
const HeaderComponent = require("../components/header_component.js");
let pageUtil;

test.beforeEach(async ({ page }) => {
  pageUtil = new PageUtil(page);
  await pageUtil.launchApp();
});

test("Test search functionality", {tag: '@search',}, async ({ page }) => {
    const headerComponent = new HeaderComponent(page.locator("div[transition-property]"));
    let alertTriggered = false;
    page.on('dialog', async dialog => {
        alertTriggered = true;
        await dialog.dismiss();
    });
    await headerComponent.fillTextInSearchbox('<script>alert();</script>');
    expect(alertTriggered).toBe(false);
});
