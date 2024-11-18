const fs = require("fs").promises;
const path = require("path");
const vm = require("vm");
const customRequireResolver = require("./customRequireResolver");

const srcDir = path.join(process.cwd(), "src", "pages");

/**
 * Executes a JavaScript file in a sandboxed VM environment.
 * The file will be evaluated in a custom context where `console`, `process`,
 * and a custom `require` function (to resolve files in the src/pages directory) are available.
 *
 * @param {string} filePath - The absolute path to the JavaScript file to execute.
 * @throws {Error} If an error occurs while reading the file or executing the code.
 */
async function executeFile(filePath) {
  try {
    const code = await fs.readFile(filePath, "utf8");

    const sandbox = {
      console: console,
      require: customRequireResolver, // this will resolve paths for src/pages
      process,
    };

    const script = new vm.Script(code);

    await script.runInNewContext(sandbox);

    return sandbox;
  } catch (error) {
    console.error(`Error executing ${filePath}:`, error);
    throw error;
  }
}

/**
 * Find js files in src/pages dir and execute them virtually
 * @returns {Promise<void>}
 * @throws {Error} can throw error for no files found in directory
 */
async function executePagesFiles() {
  try {
    const files = await fs.readdir(srcDir);
    const jsFiles = files.filter((file) => file.endsWith(".js"));

    if (jsFiles.length === 0)
      throw new Error("No files found in src/pages directory");

    await Promise.all(
      jsFiles.map(async (file) => {
        const filePath = path.join(srcDir, file);
        await executeFile(filePath);
      }),
    );

    console.log("All JavaScript files executed from src/pages folder.");
  } catch (err) {
    console.error("Error reading directory or executing files:", err);
    throw err;
  }
}

module.exports = executePagesFiles;
