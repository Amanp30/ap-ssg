// Function to log in Red color (used for failures or errors)
function logFail(message) {
  console.log(
    "\x1b[31m%s\x1b[0m", // Red color code
    message
  );
}

// Function to log in Green color (used for success)
function logSuccess(message) {
  console.log(
    "\x1b[32m\x1b[1m%s\x1b[0m", // Green + Bold color codes
    message
  );
}

// Function to log in Yellow color (used for warnings)
function logWarning(message) {
  console.log(
    "\x1b[33m%s\x1b[0m", // Yellow color code
    message
  );
}

// Function to log in Blue color (used for informational messages)
function logInfo(message) {
  console.log(
    "\x1b[34m%s\x1b[0m", // Blue color code
    message
  );
}

// Function to log in Magenta color (used for custom messages or debug)
function logMagenta(message) {
  console.log(
    "\x1b[35m%s\x1b[0m", // Magenta color code
    message
  );
}

// Function to log in Cyan color (for more emphasis or user actions)
function logCyan(message) {
  console.log(
    "\x1b[36m%s\x1b[0m", // Cyan color code
    message
  );
}

// Function to log in White color (for standard logs)
function logWhite(message) {
  console.log(
    "\x1b[37m%s\x1b[0m", // White color code
    message
  );
}

// Function to log in Bold (useful for very important messages)
function logBold(message) {
  console.log(
    "\x1b[1m%s\x1b[0m", // Bold text
    message
  );
}

module.exports = {
  logSuccess,
  logFail,
  logWarning,
  logInfo,
  logMagenta,
  logCyan,
  logWhite,
  logBold,
};
