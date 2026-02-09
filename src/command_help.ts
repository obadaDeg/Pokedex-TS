import { CLICommand } from "./command.js";

export const commandHelp = (commands: Record<string, CLICommand>) => {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  for (const command in commands) {
    console.log(`- ${command}: ${commands[command].description}`);
  }
};
