import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
  const inputSplitted = input.trim().split(" ");

  if (inputSplitted.length > 1) {
    return inputSplitted.map((word) => {
      return word.toLowerCase();
    }).filter((word) => word !== "");
  }

  return [input];
}

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Shows this help message",
      callback: commandHelp,
    }
    // can add more commands here
  };
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();

  rl.prompt();
  rl.on("line", (line) => {
    const input = cleanInput(line);
    if (input.length === 0) {
      rl.prompt();
      return;
    }

    const command = input[0];
    const args = input.slice(1);

    if (commands[command]) {
      commands[command].callback(commands);
    } else {
      console.log(`Unknown command: ${command}`);
    }
    rl.prompt();
  });
}