const { test } = require("@playwright/test");
const PageUtil = require("../framework/page/page_util.js");
const { BASE_PATH } = require("../constants/constants.js");
const Calendar = require("../components/calendar_component.js");
const rootLocator = "div[class = react-calendar]";

test.beforeEach(async ({ page }) => {
  const pageUtil = new PageUtil(page);
  await pageUtil.launchApp(BASE_PATH);
});

test("Verify current date is selected on calendar component", async ({
  page,
}) => {
  const calendar = new Calendar(page.locator(rootLocator));
  const date = new Date();
  await calendar.verifyIfDateSelected(date);
});
