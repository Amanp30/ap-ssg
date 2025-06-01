const fs = require("fs-extra");
const {
  getBuildServiceWorkerFilePath,
  getBuildManifestFilePath,
} = require("../configs/paths");

function removeSWandManifest() {
  const swPath = getBuildServiceWorkerFilePath();
  const manifestPath = getBuildManifestFilePath();

  fs.removeSync(swPath);

  fs.removeSync(manifestPath);
}

module.exports = removeSWandManifest;
