const path = require("path");
const userConfig = require("./userConfig");

const ROOT = process.cwd();

// ----- Directory Paths -----

/**
 * Returns the absolute path to the build output directory.
 * This directory contains the final static site after the build process.
 *
 * @returns {string} The absolute path to the build output directory.
 */
function getBuildDirPath() {
  return path.join(ROOT, userConfig.outDir);
}

function getBuildCssDirPath() {
  return path.join(getBuildDirPath(), "assets", "css");
}
function getBuildJSDirPath() {
  return path.join(getBuildDirPath(), "assets", "js");
}

/**
 * Returns the absolute path to the `/src/pages` directory in the source folder.
 * This directory contains all the page components for the site.
 *
 * @returns {string} The absolute path to the `src/pages` directory.
 */
function getSrcPagesDirPath() {
  return path.join(ROOT, "src", "pages");
}

/**
 * Returns the absolute path to the `/src/assets` directory in the source folder.
 * This directory contains static assets like images, fonts, and styles for the site.
 *
 * @returns {string} The absolute path to the `src/assets` directory.
 */
function getSrcAssetsDirPath() {
  return path.join(ROOT, "src", "assets");
}

/**
 * Returns the absolute path to the `/build/assets/site` directory.
 * This is the location where the site's build assets are stored.
 *
 * @returns {string} The absolute path to the `build/assets/site` directory.
 */
function getBuildAssetsSiteDirPath() {
  return path.join(getBuildDirPath(), "assets", "site");
}

/**
 * Returns the absolute path to the `/src/assets/js` directory.
 * This directory contains JavaScript files that are part of the site's assets.
 *
 * @returns {string} The absolute path to the `src/assets/js` directory.
 */
function getSrcAssetsJsDirPath() {
  return path.join(ROOT, "src", "assets", "js");
}

// ----- File Paths -----

/**
 * Returns the absolute path to the user configuration file (`apssg.config.js`).
 * This file contains the configuration for the AP-SSG build process.
 *
 * @returns {string} The absolute path to the `apssg.config.js` file.
 */
function getConfigFilePath() {
  return path.join(ROOT, "apssg.config.js");
}

/**
 * Returns the absolute path to the generated `manifest.json` file in the build directory.
 * This file contains metadata about the site (e.g., name, icons) used for PWA functionality.
 *
 * @returns {string} The absolute path to the `manifest.json` file.
 */
function getBuildManifestFilePath() {
  return path.join(getBuildDirPath(), "manifest.json");
}

/**
 * Returns the absolute path to the generated `serviceworker.js` file in the build directory.
 * This file is used for caching and offline functionality for Progressive Web Apps.
 *
 * @returns {string} The absolute path to the `serviceworker.js` file.
 */
function getBuildServiceWorkerFilePath() {
  return path.join(getBuildDirPath(), "serviceworker.js");
}

/**
 * Returns the absolute path to the generated `robots.txt` file in the build directory.
 * This file is used to control web crawler behavior (e.g., which pages to index).
 *
 * @returns {string} The absolute path to the `robots.txt` file.
 */
function getBuildRobotsTxtFilePath() {
  return path.join(getBuildDirPath(), "robots.txt");
}

/**
 * Returns the absolute path to the generated `robots.txt` file in the build directory.
 * This file is used to control web crawler behavior (e.g., which pages to index).
 *
 * @returns {string} The absolute path to the `robots.txt` file.
 */
function getSrcRobotsTxtFilePath() {
  return path.join(process.cwd(), "src", "assets", "robots.txt");
}

module.exports = {
  // Directory paths
  getBuildDirPath,
  getBuildCssDirPath,
  getBuildJSDirPath,
  getSrcPagesDirPath,
  getSrcAssetsDirPath,
  getBuildAssetsSiteDirPath,
  getSrcAssetsJsDirPath,

  // File paths
  getConfigFilePath,
  getBuildManifestFilePath,
  getBuildServiceWorkerFilePath,
  getBuildRobotsTxtFilePath,
  getSrcRobotsTxtFilePath,
};
