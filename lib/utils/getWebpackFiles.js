const path = require("path");
const fs = require("fs-extra");

/**
 * Return js files found in src/assets/js folder
 * @param {string} checkFilesDirPath
 * @param {string} extension
 * @returns {{}}
 */
function getWebpackFiles(checkFilesDirPath = "src/assets/js", extension = ".js") {
  const jsFiles = {};
  const dirPath = path.resolve(process.cwd(), checkFilesDirPath);

  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith(extension)) {
        const entryName = fullPath
          .replace(path.resolve(process.cwd(), checkFilesDirPath), "")
          .replace(extension, "");

        jsFiles[entryName] = fullPath;
      }
    });
  };

  walkDir(dirPath);
  return jsFiles;
}

module.exports = getWebpackFiles;
