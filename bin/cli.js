#!/usr/bin/env node

const folderSetup = require("../lib/utils/folderSetup");
const generateConfig = require("../lib/utils/generateConfig");

switch (process.argv[2]) {
  case "build":
    const { ssg } = require("../lib");
    ssg.generate();
    break;

  case "watch":
    const { ssg: ssgWatch } = require("../lib");
    ssgWatch.watch();
    break;

  case "folder-setup":
    folderSetup();
    break;

  case "init":
    generateConfig().then(console.log);
    break;

  default:
    console.log("Unknown command.");
    console.log("   - use `npx ap-ssg build` to generate build");
    // console.log("   - use `npx ap-ssg watch` to watch for changes");
    console.log("   - use `npx ap-ssg folder-setup` to setup folder structure");
    console.log(
      "   - use `npx ap-ssg init` to initialize the config file and structure",
    );
    break;
}
