import arg from "arg";
import chalk from "chalk";
import inquirer from "inquirer";
import { createAwesomePackage } from "./main";
import { TemplateEnum, TemplateMapper, BundlerEnum, BundlerMapper } from "./constants";

const parseArgsIntoOptions = rawArgs => {
  const args = arg(
    {
      "--yes": Boolean,
      "-y": "--yes"
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  // Q - ready to create your awesome package?

  const packageName = args._[0];

  return {
    skipPrompts: args["--yes"] || false,
    packageName
  };
};

async function promptForTemplate() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Select your Template language",
      choices: [TemplateEnum.JavaScript, TemplateEnum.TypeScript]
    }
  ]);

  const mappedTemplate = TemplateMapper[answers.template];

  return mappedTemplate;
}

async function promptForBundler() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "bundler",
      message: "Select your bundler",
      choices: [BundlerEnum.Webpack, BundlerEnum.Parcel]
    }
  ]);

  const mappedBundler = BundlerMapper[answers.bundler];

  return mappedBundler;
}

export async function cli(args) {
  // TODO refactor
  let options = parseArgsIntoOptions(args);

  const template = await promptForTemplate();
  const bundler = await promptForBundler();

  options = {
    ...options,
    template,
    bundler
  };

  await createAwesomePackage(options);
}
