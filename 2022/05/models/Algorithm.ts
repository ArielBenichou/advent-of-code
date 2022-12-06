import { AlgorithmCommand } from "./AlgorithmCommand";
import { Dock } from "./Dock";

export class Algorithm {
  constructor(private commands: AlgorithmCommand[]) {}

  static fromString(str: string) {
    //this is the format: "move 1 from 2 to 1"
    const lines = str.split("\n").map((line) => {
      const [_, qty, __, from, ___, to] = line.split(" ");
      return {
        qty: parseInt(qty),
        from: parseInt(from) - 1,
        to: parseInt(to) - 1,
      } as AlgorithmCommand;
    });
    return new Algorithm(lines);
  }

  execute(dock: Dock, mode: "grouped" | "one_by_one" = "one_by_one"): void {
    for (const command of this.commands) {
      dock.moveCrates(command.from, command.to, command.qty, mode);
    }
  }
}
