const userConfig = require("../configs/userConfig");

async function execPostBuild() {
  if (userConfig.postBuild.length > 0) {
    for (const hook of userConfig.postBuild) {
      if (typeof hook === "function") {
        await hook(); // Will work sequentially, whether async or sync
      }
    }
  }
}

module.exports = execPostBuild;
