import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  console.log("options", options.templateDirectory, options.targetDirectory);
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
  const templateDir = path.resolve(pathname, "../../template");

  refinedOptions.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error("%s Invalid template path", chalk.red.bold("ERROR"));
    process.exit(1);
  }
}
