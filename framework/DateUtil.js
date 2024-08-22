const { format } = require("date-fns");

function formatDate(date, formatString) {
  return format(date, formatString);
}

module.exports = formatDate;
