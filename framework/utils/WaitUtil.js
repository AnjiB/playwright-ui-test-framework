// @ts-ignore
const logger = require("../logger/CustomLogger");

async function sleep(msec) {
  logger.info(`Waitng for milli seconds: ${msec}`);
  return new Promise((resolve) => setTimeout(resolve, msec));
}

module.exports = sleep;
