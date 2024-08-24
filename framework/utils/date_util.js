const { format } = require("date-fns");

/**
 * Formats the given date in the given format
 * @param {Date} date 
 * @param {String} formatString 
 * @returns 
 */
function formatDate(date, formatString) {
  return format(date, formatString);
}

module.exports = formatDate;
