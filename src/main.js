import chalk from "chalk";
import fs from "fs";
import os from "os";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import { TemplateEnum, LinterEnum, LinterConfirmation } from "./constants.js";
import { writeLintFile } from "./writeLintFile.js";

const access = promisify(fs.access);
const copy = promisify(ncp);

const linterLibs = {
  eslint: "^6.8.0",
  "eslint-config-airbnb": "^18.0.1",
  "eslint-config-prettier": "6.10.0",
  "eslint-plugin-import": "^2.20.0",
  "eslint-plugin-jsx-a11y": "^6.2.3",
  "eslint-plugin-prettier": "3.1.2",
  "eslint-plugin-react": "^7.18.1",
  prettier: "1.19.1"
};

async function writePackageFile(options, templateBundler) {
  const packageTmpl = require(`./package-templates/package-${templateBundler}-tmpl.json`);

  const packageJson = {
    ...packageTmpl,
    name: options.packageName,
    devDependencies: {
      ...packageTmpl.devDependencies,
      ...(options.linter !== LinterConfirmation.No && linterLibs)
    }
  };
  fs.writeFileSync(
    path.join(options.targetDirectory, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
}

async function copyTemplateFiles(options, templateBundler) {
  console.log("options.linter", options.linter);

  if (options.linter !== LinterConfirmation.No) {
    await writeLintFile(options);
  }
  await writePackageFile(options, templateBundler);

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

  console.log("Bootstrapping package for", options.template);

  const templateBundler = `${options.template}${options.bundler}`;

  const templateDir = path.resolve(
    pathname,
    `../../templates/${templateBundler}`
  );

  console.log("Using template Directory :", templateDir);

  refinedOptions.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (error) {
    console.error("%s Invalid template path", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  await copyTemplateFiles(refinedOptions, templateBundler);

  console.log("Now you can write code for your awesome package! 🚀");
  console.log("RUN ---");
  console.log("npm i");
  console.log("To Build the package RUN - npm run build");
}
