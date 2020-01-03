import chalk from "chalk";
import fs from "fs";
import os from "os";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { TemplateEnum } from "./constants.js";

import packageJsTmpl from "./package-templates/package-js-tmpl.json";
import packageTsTmpl from "./package-templates/package-ts-tmpl.json";


const access = promisify(fs.access);
const copy = promisify(ncp);

async function writePackageFile(options) {
  const packageJson = {
    ...(options.template === TemplateEnum.JS ? packageJsTmpl : packageTsTmpl),
    name: options.packageName
  };
  fs.writeFileSync(path.join(options.targetDirectory, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);
}

async function copyTemplateFiles(options) {
  await writePackageFile(options);

  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false
  });
}

export async function createAwesomePackage(options) {
  const refinedOptions = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  };
  const currentFilePath = import.meta.url;
  const pathname = new URL(currentFilePath).pathname;

  const templateDir = path.resolve(pathname, `../../templates/${options.template}`);

  refinedOptions.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error("%s Invalid template path", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  await copyTemplateFiles(refinedOptions);

  console.log("Now you can write code for your awesome package! 🚀");
  console.log("RUN ---");
  console.log("npm i");
  console.log("To Build the package RUN - npm run build");
}
