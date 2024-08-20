const path = require('path');
const log4js = require('log4js');
const fs = require('fs-extra');

// Function to get timestamp in YYYY-MM-DD_HH-mm-ss format
const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

// Define the logs directory and log filename with a timestamp
const logsDir = path.join(__dirname, '../logs');
const logFilename = path.join(logsDir, `app_${getTimestamp()}.log`);

// Get log level from environment variable, default to 'info'
const logLevel = process.env.LOG_LEVEL || 'info';

// Define log configuration
const logConfig = {
  appenders: {
    fileAppender: {
      type: 'file',
      filename: logFilename,
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
      }
    },
    consoleAppender: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %c - %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['consoleAppender'],
      level: logLevel
    }
  }
};

// Configure log4js with the defined configuration
log4js.configure(logConfig);

const logger = log4js.getLogger();

module.exports = logger;