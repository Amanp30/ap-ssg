const fs = require("fs-extra");
const path = require("node:path");

function removeSWandManifest() {
  const swPath = path.join(process.cwd(), "build", "serviceworker.js");
  const manifestPath = path.join(process.cwd(), "build", "manifest.json");

  // Use fs-extra to remove files only if they exist
  if (fs.existsSync(swPath)) {
    fs.removeSync(swPath);
    console.log("Deleted serviceworker.js");
  }

  if (fs.existsSync(manifestPath)) {
    fs.removeSync(manifestPath);
    console.log("Deleted manifest.json");
  }
}

module.exports = removeSWandManifest;
