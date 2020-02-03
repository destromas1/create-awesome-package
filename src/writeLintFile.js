import chalk from "chalk";
import fs from "fs";
import os from "os";
import path from "path";

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

export async function writeLintFile(options) {
  fs.writeFileSync(
    path.join(options.targetDirectory, ".eslintrc.json"),
    JSON.stringify(eslintPrettier, null, 2) + os.EOL
  );
}
