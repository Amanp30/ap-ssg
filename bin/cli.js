#!/usr/bin/env node

const { ssg } = require("../lib");
const folderSetup = require("../lib/utils/folderSetup");

switch (process.argv[2]) {
  case undefined:
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
    console.log("   - use `npx ap-ssg` to generate build  ");
    break;
}
