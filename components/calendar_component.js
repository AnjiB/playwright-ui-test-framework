const { expect } = require("@playwright/test");
const CalendarObj = require("../componet_objects/calendar_comp_obj");
// @ts-ignore
const logger = require("../framework/logger/custom_logger");
const UIActions = require("../framework/actions/ui_actions");
const formatDate = require("../framework/utils/date_util");

class Calendar {
  constructor(locator) {
    this.rootLocator = locator;
  }

  /**
   * Selects the date on calendar current monthly view
   * @param {*} dateString
   */
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

  /**
   * Verifies if provided Date is selected or not
   * @param {Date} date
   */
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

  /**
   * Selects the date by navigating to desired mothly view.
   * If date is past, method clicks on Previous button on calendar till
   * it reaches to the desired month, and respectively for future date.
   * @param {*} targetDate
   */
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
