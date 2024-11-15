const path = require("path");
const ensureValidHtmlPath = require("./ensureValidHtmlPath");

/**
 * Generates the build file path based on the provided filePath.
 * The filePath can optionally include a `.html` extension.
 *
 * @param {string} filePath - The file path to process.
 * @returns {string} - The full path to the file in the 'build' directory.
 * @throws {Error} - If filePath is empty or contains invalid characters.
 */
function getBuildFilePath(filePath) {
  if (!filePath) throw new Error("filePath is required to generate file.");

  // Generate and return the full build file path
  return path.join(process.cwd(), "build", ensureValidHtmlPath(filePath));
}

module.exports = getBuildFilePath;
