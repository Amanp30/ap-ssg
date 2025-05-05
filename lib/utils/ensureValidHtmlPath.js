const path = require("path");

/**
 * Ensures the file path ends with `.html`. If it doesn't, `.html` is appended.
 *
 * @param {string} filePath - The file path to check.
 * @returns {string} - The file path with a valid `.html` extension.
 */
function ensureValidHtmlPath(filePath) {
  // Validate the file path, allowing an optional .html extension
  const validPathPattern = /^[a-zA-Z0-9/_-]+(\.html)?$/;
  if (!validPathPattern.test(filePath)) {
    throw new Error(
      "Invalid filePath: Only letters, numbers, hyphens, underscores, slashes, and an optional .html extension are allowed."
    );
  }

  // Normalize the path (removes redundant slashes and resolves relative components)
  filePath = path.normalize(filePath);

  // If the file path does not end with `.html`, append it
  if (!filePath.endsWith(".html")) {
    filePath += ".html";
  }

  return filePath;
}

module.exports = ensureValidHtmlPath;
