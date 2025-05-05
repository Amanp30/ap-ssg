const fs = require("fs-extra");
const path = require("path");
const userConfig = require("../configs/userConfig");
const { getBuildDirPath } = require("../configs/paths");

async function cleanBuildFolder() {
  const buildDir = getBuildDirPath();

  if (!userConfig.isProduction) return;

  const exists = await fs.pathExists(buildDir); // safer than existsSync for async

  if (!exists) return; // skip if build folder doesn't exist

  const entries = await fs.readdir(buildDir);

  await Promise.all(
    entries.map(async (entry) => {
      if (entry === ".git") return;
      const fullPath = path.join(buildDir, entry);
      await fs.remove(fullPath);
    })
  );
}

module.exports = cleanBuildFolder;
