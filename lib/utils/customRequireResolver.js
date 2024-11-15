const path = require("path");

/**
 * A custom function that resolve paths to current working directory's src/pages folder
 * @param {string} module
 * @param {string} basePath
 * @returns {*|null}
 */
module.exports = (module, basePath = "src/pages") =>
  require(module.startsWith(".")
    ? path.resolve(process.cwd(), basePath, module)
    : module) || null;
