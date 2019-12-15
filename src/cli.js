import arg from "arg";
import { createAwesomePackage } from "./main";

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

  return {
    skipPrompts: args["--yes"] || false,
    template: args._[0]
  };
};

export async function cli(args) {
  const options = parseArgsIntoOptions(args);

  await createAwesomePackage(options);
}
