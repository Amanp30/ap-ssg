#!/usr/bin/env node

const { ssg } = require("../lib");
const folderSetup = require("../lib/utils/folderSetup");

switch (process.argv[2]) {
  case "build":
    ssg.generate();
    break;

  case "watch":
    ssg.watch();
    break;

  case "folder-setup":
    folderSetup();
    break;

  default:
    console.log("Unknown command ");
    console.log("   - use `npx ap-ssg build` to generate build  ");
    break;
}
