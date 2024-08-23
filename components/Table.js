const logger = require("../framework/logger/CustomLogger");

class Table {
  constructor(page, rootElement) {
    this.page = page;
    this.rootElement = rootElement;
  }

  async getCellElement({ rowIndex = 1, columnIndex = 1 } = {}) {
    const rows = this.rootElement.locator("tbody tr");
    const rowsCount = await rows.count();
    if (rowIndex > rowsCount) {
      throw new Error(
        `Row index is out of range, there are only ${rowsCount} rows`
      );
    }
    // index starts from 0
    const rowElement = rows.nth(rowsCount - 1);
    const columns = rowElement.locator("td");
    const colCount = await columns.count();
    if (columnIndex > colCount) {
      throw new Error(
        `Column index is out of range, there are only ${colCount} columns in the row`
      );
    }
    return columns.nth(columnIndex - 1);
  }

  async getCellByText(matchText) {
    const rows = this.rootElement.locator("tbody tr");
    let desiredRow;
    const rowCount = await rows.count();
    let isRowContainsText = false;
    for (let i = 0; i < rowCount; i++) {
      const text = await rows.nth(i).textContent();
      logger.info(`Text at index ${i} is ${text}`);
      if (text.includes(matchText)) {
        desiredRow = rows.nth(i);
        isRowContainsText = true;
        break;
      }
    }
    if (!isRowContainsText) {
      logger.info("Rows do not contain text");
      return;
    }

    let desiredColumn;
    if (desiredRow) {
      const columns = desiredRow.locator("td");
      const colCount = await columns.count();
      for (let j = 0; j < colCount; j++) {
        const colText = await columns.nth(j).textContent();
        logger.info(`Text at index ${j} is ${colText}`);
        if (colText.includes(matchText)) {
          desiredColumn = columns.nth(j);
          break;
        }
      }

      if (desiredColumn) return desiredColumn;
      else
        throw new Error("No cell found which contains the given input string");
    }
  }
}
module.exports = Table;
