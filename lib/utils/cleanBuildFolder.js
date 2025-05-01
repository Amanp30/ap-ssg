const fs = require("fs-extra");
const path = require("path");
const userConfig = require("../configs/userConfig");

async function cleanBuildFolder() {
  const buildDir = path.join(process.cwd(), "build");

  if (!userConfig.isProduction) return;

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
