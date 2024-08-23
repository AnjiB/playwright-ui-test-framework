const { test } = require("@playwright/test");
const config = require("../../playwright.config");
// @ts-ignore
const logger = require("../logger/CustomLogger");

class PageUtil {
  constructor(page) {
    this.page = page;
  }

  /**
   * Open the page with provided URL
   * @param {String} path
   */
  async launchApp(path) {
    await test.step("Launching App", async () => {
      // optional chaining to avoid undefined errors
      const baseURL = config.use?.baseURL;
      logger.info(`Base URL configured: ${baseURL}`);
      await this.page.goto(path);
      await this.page.waitForLoadState("load", { timeout: 60 }); // The promise resolves after 'load' event.
    });
  }
  /**
   * Closes the page
   */
  async closePage() {
    await test.step("Closing Application", async () => {
      await this.page.close();
    });
  }

  /**
   * Navigates to previous page
   */
  async goBack() {
    await test.step("Navigating to previous page", async () => {
      await this.page.goBack();
    });
  }

  /**
   * Waits for given url after navigation
   * @param {String} url
   */
  async waitForURL(url) {
    await test.step(`Waiting for URL ${url}`, async () => {
      await this.page.waitForURL(url);
    });
  }
}

module.exports = PageUtil;
