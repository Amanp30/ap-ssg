const fs = require("fs-extra");
const {
  getBuildServiceWorkerFilePath,
  getBuildManifestFilePath,
} = require("../configs/paths");

function removeSWandManifest() {
  const swPath = getBuildServiceWorkerFilePath();
  const manifestPath = getBuildManifestFilePath();

  fs.removeSync(swPath);
  console.log("Deleted serviceworker.js ");

  fs.removeSync(manifestPath);
  console.log("Deleted manifest.json ");
}

module.exports = removeSWandManifest;
