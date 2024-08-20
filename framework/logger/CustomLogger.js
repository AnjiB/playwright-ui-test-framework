const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Set the log level from the environment variable, defaulting to 'info' if not provided
const logLevel = process.env.LOG_LEVEL || "info";

const fileName = process.env.LOG_FILE_NAME || "test-logs.log";

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Function to clear all files in the logs directory
function clearLogDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading log directory:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    });
  });
}

// Clear the logs directory
clearLogDirectory(logDir);

// Create a logger instance
const logger = winston.createLogger({
  level: logLevel, // Use the log level from the environment variable
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Log to a file named app-test.log
    new winston.transports.File({ filename: path.join(logDir, fileName) }),
  ],
});

// Export the logger for use in other files
module.exports = logger;
