import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const inputSplitted = input.trim().split(" ");

  if (inputSplitted.length > 1) {
    return inputSplitted.map((word) => {
      return word.toLowerCase();
    }).filter((word) => word !== "");
  }

  return [input];
}

export function startREPL(state: State) {
  state.rl.prompt();
  state.rl.on("line", async (line) => {
    const input = cleanInput(line);
    if (input.length === 0) {
      state.rl.prompt();
      return;
    }

    const command = input[0];
    const args = input.slice(1);

    if (state.commands[command]) {
      try {
        await state.commands[command].callback(state);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(`Unknown command: ${command}`);
    }
    state.rl.prompt();
  });
}
