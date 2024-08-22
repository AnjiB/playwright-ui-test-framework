const { test, expect } = require("@playwright/test");
const logger = require("../logger/CustomLogger");

class UIActions {
  constructor(locator) {
    this.locator = locator;
  }

  async click() {
    await test.step("Clicking on the Element", async () => {
      await this.locator.waitFor();
      await this.locator.click();
    });
  }

  async doubleClick() {
    await test.step("Double clicking on the Element", async () => {
      await this.locator.waitFor();
      await this.locator.dblclick();
    });
  }

  async jsClick() {
    await test.step("Clicking using JS", async () => {
      logger.info("JS Click");
      await this.locator.evaluate((element) => element.click());
    });
  }

  async check() {
    await test.step(`Checking the check box`, async () => {
      await this.locator.waitFor();
      await expect(this.locator).toBeChecked();
      await this.locator.check();
    });
  }

  async uncheck() {
    await test.step(`Unchecking the check box`, async () => {
      await this.locator.waitFor();
      await this.locator.uncheck();
    });
  }

  async waitTillVisible(waitTime = 30) {
    await test.step("Waiting for an element to be visible", async () => {
      await this.locator.waitFor({
        state: "visible",
        timeout: waitTime * 1000,
      });
    });
  }

  async getTextContent() {
    return await test.step("Getting text content", async () => {
      await this.locator.waitFor();
      return await this.locator.textContent();
    });

    /**
     * 
     * await test.step("Getting text content", async () => {
      await this.locator.waitFor();
      return await this.locator.textContent();
    });
     */
  }

  async keyPress(key) {
    await test.step("Pressing on key" + key, async () => {
      await this.locator.waitFor();
      await this.locator.press(key);
    });
  }

  async scrollIntoView() {
    await test.step("Scrolling to the view of element", async () => {
      await this.locator.waitFor();
      await this.locator.scrollIntoViewIfNeeded();
    });
  }

  async getAttribute(attribute) {
    return await test.step(`Getting attribute value of ${attribute}`, async () => {
      return await this.locator.getAttribute(attribute);
    });
  }

  async fillText(text) {
    await test.step(`Filling the text ${text}`, async () => {
      await this.locator.waitFor();
      await this.locator.fill(text);
    });
  }

  async hover() {
    await test.step("Hovering to the element", async () => {
      await this.locator.waitFor();
      await this.locator.hover();
    });
  }

  async selectByValue(value) {
    await test.step(`Selecting option by its value ${value}`, async () => {
      await this.locator.waitFor();
      await this.locator.selectOption(value);
    });
  }

  async selectByVisibleText(text) {
    await test.step(`Selecting option by its visible text ${text}`, async () => {
      await this.locator.waitFor();
      await this.locator.selectOption({ label: text });
    });
  }

  async selectByIndex(index) {
    await test.step(`Selecting option by its index at ${index}`, async () => {
      await this.locator.waitFor();
      await this.locator.selectOption({ index });
    });
  }

  async getAllOptions() {
    return await test.step("Get all available options to be selected", async () => {
      await this.locator.waitFor();
      return await this.locator.locator("option").allTextContents();
    });
  }

  async getAllSelectedOptions() {
    return await test.step("Get all available options to be selected", async () => {
      await this.locator.waitFor();
      return await this.locator
        .locator("option[selected='selected']")
        .allTextContents();
    });
  }
}

module.exports = UIActions;
