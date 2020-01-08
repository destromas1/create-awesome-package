import arg from "arg";
import chalk from "chalk";
import inquirer from "inquirer";
import { createAwesomePackage } from "./main";
import { TemplateEnum, TemplateMapper } from "./constants";

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
  // const template = args._[1];

  // if (!templates.includes(template)) {
  //   console.error(chalk.red.bold("Template should be either 'js' or 'ts'"));
  //   process.exit(1);
  // }

  return {
    skipPrompts: args["--yes"] || false,
    packageName
    // template
  };
};

async function promptForTemplate(params) {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "Please select your Template language",
      choices: [TemplateEnum.JavaScript, TemplateEnum.TypeScript]
    }
  ]);

  const mappedTemplate = TemplateMapper[answers.template];

  return mappedTemplate;
}

export async function cli(args) {
  let options = parseArgsIntoOptions(args);

  const template = await promptForTemplate(options);

  options = {
    ...options,
    template
  };

  await createAwesomePackage(options);
}
