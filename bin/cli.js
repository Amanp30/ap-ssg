#!/usr/bin/env node

const { ssg } = require("../lib");

const fs = require("fs-extra");
const path = require("path");

switch (process.argv[2]) {
  case undefined:
    ssg.generate();
    break;

  case "watch":
    ssg.watch();
    break;

  default:
    console.log("Unknown command ");
    console.log("   - use `npx ap-ssg` to generate build  ");
    break;
}
