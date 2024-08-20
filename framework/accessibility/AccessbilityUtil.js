const { expect } = require("@playwright/test");
const { AxeBuilder } = require("@axe-core/playwright");

class AccessibilityUtil {
  constructor(page) {
    this.page = page;
  }

  async testAccessibilityIssues(options = {}) {

    const { locator, tags } = options;

    // Create a new AxeBuilder instance
    let axeBuilder = new AxeBuilder({ page: this.page });

    // Include the locator if specified
    if (locator) {
      axeBuilder = axeBuilder.include(locator);
    }

    // Set rules if specified
    if (tags) {
      axeBuilder = axeBuilder.withTags(tags);
    }

    // Perform the accessibility analysis
    const accessibilityScanResults = await axeBuilder.analyze();

    // Assert no violations are present
    expect(accessibilityScanResults.violations).toEqual([]);
  }
}

module.exports = AccessibilityUtil;
