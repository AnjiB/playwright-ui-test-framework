const { expect } = require("@playwright/test");
const CalendarObj = require("../componet-objects/Calendar-Obj");
// @ts-ignore
const logger = require("../framework/logger/CustomLogger");
const UIActions = require("../framework/actions/UIActions");
const formatDate = require("../framework/DateUtil.js");

class Calendar {
  constructor(page, locator) {
    this.page = page;
    this.rootLocator = locator;
  }

  async #selectDay(dateString) {
    await this.rootLocator.waitFor();
    await new UIActions(this.rootLocator).scrollIntoView();
    const locator = new CalendarObj(this.rootLocator).getDaysList();
    await locator.evaluateAll((elements) => {
      elements.forEach((button) => {
        const abbr = button.querySelector("abbr");
        if (abbr && abbr.getAttribute("aria-label") === dateString) {
          // Click on the parent element
          button.click();
        }
      });
    });
  }

  async verifyIfDateSelected(date) {
    await this.rootLocator.waitFor();
    await new UIActions(this.rootLocator).scrollIntoView();
    const formattedDate1 = formatDate(date, "MMMM d, yyyy");
    const formattedDate2 = formatDate(date, "d MMMM yyyy");
    const dateLocator = this.rootLocator.locator(
      `button:has(abbr[aria-label="${formattedDate1}"]), button:has(abbr[aria-label="${formattedDate2}"])`
    );
    await expect(dateLocator).toHaveClass(/react-calendar__tile--active/);
  }

  async selectDate(targetDate) {
    await this.rootLocator.waitFor();
    await this.rootLocator.scrollIntoViewIfNeeded();
    logger.info(`Date to be selected: ${targetDate}`);
    this.validateDate(targetDate);
    // extract month & year
    const targetMonthYear = targetDate.split("-").slice(1).join(" ");
    logger.info(`Date to be selected in mmm-YYYY format: ${targetMonthYear}`);
    let displayMonthYearOnCalendar = await new UIActions(
      new CalendarObj(this.rootLocator).getMonthYearLabel()
    ).getTextContent();
    logger.info(
      "Current Month and Year on the calendar before making any navigation: " +
        displayMonthYearOnCalendar
    );
    do {
      if (
        new Date(`${displayMonthYearOnCalendar}-01`) ==
        new Date(`${targetMonthYear}-01`)
      ) {
        logger.info(
          "Current month and year are same as target, hence do nothing"
        );
        break;
      } else if (
        new Date(`${displayMonthYearOnCalendar}-01`) >
        new Date(`${targetMonthYear}-01`)
      ) {
        logger.info(
          "Current month and year are greater than target, hence moving back"
        );
        await await new UIActions(
          new CalendarObj(this.rootLocator).getPreviousArrowButton()
        ).jsClick();
      } else {
        logger.info(
          "Current month and year are lesser than target, hence moving to future"
        );
        await new UIActions(
          new CalendarObj(this.rootLocator).getNextArrowButton()
        ).jsClick();
      }
      // update
      displayMonthYearOnCalendar = await new UIActions(
        new CalendarObj(this.rootLocator).getMonthYearLabel()
      ).getTextContent();
      logger.info(
        "Updated Current Month and Year on the calendar before making any navigation: " +
          displayMonthYearOnCalendar
      );
    } while (displayMonthYearOnCalendar !== targetMonthYear);

    this.#selectDay(targetDate);
    // select the date
  }

  validateDate(dateString) {
    const regex =
      /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;
    if (!regex.test(dateString)) {
      throw new Error(`Invalid date format. Please use 'dd-MMMM-yyyy' format.`);
    }
  }

  async #printAllDates() {
    await this.rootLocator.waitFor();
    await new UIActions(this.rootLocator).scrollIntoView();
    const locator = new CalendarObj(this.rootLocator).getDaysList();
    const allVals = await locator.evaluateAll((elements) => {
      const labels = [];
      elements.forEach((button) => {
        const attributeValue = button
          .querySelector("abbr")
          .getAttribute("aria-label");
        labels.push(attributeValue);
      });
      return labels;
    });
    logger.info(allVals);
  }
}

module.exports = Calendar;
