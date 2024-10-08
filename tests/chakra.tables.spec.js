const {expect, test} = require("@playwright/test");
const Table = require("../components/table_component.js");
const PageUtil = require("../framework/page/page_util.js");
const logger = require("../framework/logger/custom_logger.js");


test.beforeEach(async ({ page }) => {
    const pageUtil = new PageUtil(page);
    await pageUtil.launchApp();
  });

test.describe("Chakra Table Tests", () => {
    test("Testing Table Component CheckBox ", {tag: '@tables',}, async ({page}) => {
        const checkTable = page.locator(".chakra-table").nth(0);
        await checkTable.scrollIntoViewIfNeeded();
        const table = new Table(checkTable);
        const cellElement = await table.getCellByText("Horizon UI PRO");
        const checkLoc =  cellElement.locator("label");
        logger.info(await checkLoc.textContent());
        await checkLoc.scrollIntoViewIfNeeded();
        await checkLoc.hover();
        await checkLoc.check();
        await expect(checkLoc).toBeChecked();
        await expect(checkLoc).toHaveAttribute("data-checked");
    });
});