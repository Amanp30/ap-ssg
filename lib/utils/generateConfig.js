const path = require("node:path");
const fs = require("fs-extra");
const apssgConfigObject = require("../defaults/apssgConfigObject");
const { getConfigFilePath } = require("../configs/paths");

async function generateConfig() {
  const configFilePath = getConfigFilePath();

  const fileExists = await fs.pathExists(configFilePath);
  if (fileExists) {
    console.log("⚠️  apssg.config.js already exists. Skipping creation.");
    return;
  }

  const configContent = `module.exports = ${apssgConfigObject};\n`;

  try {
    await fs.outputFile(configFilePath, configContent);
    return "✅ apssg.config.js has been created successfully.";
  } catch (error) {
    console.error("❌ Failed to create apssg.config.js:", error.message);
  }
}

module.exports = generateConfig;
