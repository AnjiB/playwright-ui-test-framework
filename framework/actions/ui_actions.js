const { test, expect } = require("@playwright/test");
const logger = require("../logger/custom_logger");

class UIActions {
  constructor(locator) {
    this.locator = locator;
  }

  /**
   * Click on the locator
   */
  async click() {
    await test.step("Clicking on the Element", async () => {
      await this.locator.click();
    });
  }

  /**
   * Doubel clicks on the locator
   */
  async doubleClick() {
    await test.step("Double clicking on the Element", async () => {
      await this.locator.dblclick();
    });
  }

  /**
   * Clicks on the locator using Javascript
   */
  async jsClick() {
    await test.step("Clicking using JS", async () => {
      logger.info("JS Click");
      await this.locator.evaluate((element) => element.click());
    });
  }

  /**
   * Checks the check box
   */
  async check() {
    await test.step(`Checking the check box`, async () => {
      await expect(this.locator).toBeChecked();
      await this.locator.check();
    });
  }

  /**
   * Unchecks the check box
   */
  async uncheck() {
    await test.step(`Unchecking the check box`, async () => {
      await this.locator.uncheck();
    });
  }

  /**
   * Wait for locator to be visible for given amount of time in seconds
   * @param {Number} waitTime
   */
  async waitTillVisible(waitTime = 30) {
    await test.step("Waiting for an element to be visible", async () => {
      await this.locator.waitFor({
        state: "visible",
        timeout: waitTime * 1000,
      });
    });
  }

  /**
   * Returns the text content o the
   * @returns
   */
  async getTextContent() {
    return await test.step("Getting text content", async () => {
      return await this.locator.textContent();
    });
  }

  /**
   * Presses the given key on keyboard
   * @param {String} key
   */
  async keyPress(key) {
    await test.step("Pressing on key" + key, async () => {
      await this.locator.press(key);
    });
  }

  /**
   * Scrolls the page into view of the locator
   */
  async scrollIntoView() {
    await test.step("Scrolling to the view of element", async () => {
      await this.locator.waitFor();
      await this.locator.scrollIntoViewIfNeeded();
    });
  }

  /**
   * Get attribute value of given attribue
   * @param {String} attribute
   * @returns
   */
  async getAttributeValue(attribute) {
    return await test.step(`Getting attribute value of ${attribute}`, async () => {
      return await this.locator.getAttribute(attribute);
    });
  }

  /**
   * Fills the text box with provided text
   * @param {String} text
   */
  async fillText(text) {
    await test.step(`Filling the text ${text}`, async () => {
      await this.locator.fill(text);
    });
  }

  /**
   * Mouse hover on the locator
   */
  async hover() {
    await test.step("Hovering to the element", async () => {
      await this.locator.hover();
    });
  }

  /**
   * Selects the locator in dropdown by its value
   * @param {String} value
   */
  async selectByValue(value) {
    await test.step(`Selecting option by its value ${value}`, async () => {
      await this.locator.selectOption(value);
    });
  }

  /**
   * Selects the locator in dropdown by its value
   * @param {String} text
   */
  async selectByVisibleText(text) {
    await test.step(`Selecting option by its visible text ${text}`, async () => {
      await this.locator.selectOption({ label: text });
    });
  }

  /**
   * Selects the locator in dropdown by its index. Index stats from 0
   * @param {Number} index
   */
  async selectByIndex(index) {
    await test.step(`Selecting option by its index at ${index}`, async () => {
      await this.locator.selectOption({ index });
    });
  }

  /**
   * Returns all available options in dropdown
   * @returns
   */
  async getAllOptions() {
    return await test.step("Get all available options to be selected", async () => {
      return await this.locator.locator("option").allTextContents();
    });
  }

  /**
   * Returns all selected options
   * @returns
   */
  async getAllSelectedOptions() {
    return await test.step("Get all available options to be selected", async () => {
      return await this.locator
        .locator("option[selected='selected']")
        .allTextContents();
    });
  }
}

module.exports = UIActions;
