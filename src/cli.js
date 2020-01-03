import arg from "arg";
import chalk from "chalk";
import { createAwesomePackage } from "./main";
import { templates } from "./constants";

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
  const template = args._[1];

  if (!templates.includes(template)) {
    console.error(chalk.red.bold("Template should be either 'js' or 'ts'"));
    process.exit(1);
  }

  return {
    skipPrompts: args["--yes"] || false,
    packageName,
    template
  };
};

export async function cli(args) {
  const options = parseArgsIntoOptions(args);

  await createAwesomePackage(options);
}
