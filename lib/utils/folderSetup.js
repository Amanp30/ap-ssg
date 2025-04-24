const fs = require("fs-extra");
const path = require("node:path");
const { logSuccess } = require("./logMessage");

const foldersObj = {
  src: {
    assets: {
      site: {},
      uploads: {},
      js: {},
      css: {},
    },
    components: {},
    pages: {},
    data: {},
  },
};

function createFolders(basePath, folderStructure) {
  for (const [folderName, subFolders] of Object.entries(folderStructure)) {
    const currentPath = path.join(basePath, folderName);
    fs.ensureDirSync(currentPath, {});

    if (Object.keys(subFolders).length > 0) {
      createFolders(currentPath, subFolders);
    }
  }
}

function folderSetup() {
  const basePath = process.cwd();
  createFolders(basePath, foldersObj);
  logSuccess("Folder setup complete and ready to go!");
}

module.exports = folderSetup;
