import chalk from "chalk";
import fs from "fs";
import os from "os";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";

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

export async function writePackageFile(options, templateBundler) {
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
