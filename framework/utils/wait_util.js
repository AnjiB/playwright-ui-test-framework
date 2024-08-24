// @ts-ignore
const logger = require("../logger/CustomLogger");

/**
 * Hard wait for given amount of time in milli seconds
 * @param {Number} msec 
 * @returns 
 */
async function sleep(msec) {
  logger.info(`Waitng for milli seconds: ${msec}`);
  return new Promise((resolve) => setTimeout(resolve, msec));
}

module.exports = sleep;
