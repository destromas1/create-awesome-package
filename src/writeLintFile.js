import chalk from "chalk";
import fs from "fs";
import os from "os";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { TemplateEnum, LinterEnum } from "./constants.js";

const eslintPrettier = {
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    es6: true
  },
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ]
  }
};

