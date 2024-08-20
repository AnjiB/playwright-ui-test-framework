const { test } = require("@playwright/test");
const config = require("../../playwright.config");
// @ts-ignore
const logger = require("../logger/CustomLogger");

class PageUtil {
  constructor(page) {
    this.page = page;
  }

  async launchApp(path) {
    await test.step("Launching App", async () => {
      // optional chaining to avoid undefined errors
      const baseURL = config.use?.baseURL;
      logger.info(`Base URL configured: ${baseURL}`);
      await this.page.goto(path);
      await this.page.waitForLoadState("load", { timeout: 60 }); // The promise resolves after 'load' event.
    });
  }

  async closePage() {
    await test.step("Closing Application", async () => {
      await page.close();
    });
  }

  async goBack() {
    await test.step("Navigating to previous page", async () => {
      await page.goBack();
    });
  }
}

module.exports = PageUtil;
