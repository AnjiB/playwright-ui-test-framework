const {expect, test} = require("@playwright/test");
const Table = require("../components/table_component.js");
const logger = require("../framework/logger/custom_logger.js");

test.describe("Chakra Table Tests", () => {
    test("Testing Table Component CheckBox ", {tag: '@tables',}, async ({page}) => {
        test.step("launch app", async () => {
            await page.goto("http://localhost:3000/admin/default");
            await page.waitForLoadState();
        });
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