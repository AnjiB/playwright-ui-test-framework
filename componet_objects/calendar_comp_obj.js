class CalendarObj {
  #rootLocator;
  #previousArrow;
  #nextArrow;
  #monthAndYearLabel;
  #daysOfMonth;

  constructor(rootLocator) {
    this.#rootLocator = rootLocator;
    this.#previousArrow = this.#rootLocator.locator(
      "button.react-calendar__navigation__prev-button"
    );
    this.#nextArrow = this.#rootLocator.locator(
      "button.react-calendar__navigation__next-button"
    );
    this.#monthAndYearLabel = this.#rootLocator.locator(
      "button.react-calendar__navigation__label"
    );
    this.#daysOfMonth = this.#rootLocator.locator(
      "button.react-calendar__tile"
    );
  }

  getRootLocator() {
    return this.#rootLocator;
  }

  getPreviousArrowButton() {
    return this.#previousArrow;
  }

  getNextArrowButton() {
    return this.#nextArrow;
  }

  getMonthYearLabel() {
    return this.#monthAndYearLabel;
  }

  getDaysList() {
    return this.#daysOfMonth;
  }
}

module.exports = CalendarObj;
