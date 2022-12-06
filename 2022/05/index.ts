import { readInput } from "../../utils/load-input";
import { Algorithm } from "./models/Algorithm";
import { Dock } from "./models/Dock";

function main() {
  const input = readInput(__dirname + "/data/input.txt");
  if (!input) throw new Error("input is invalid");
  const { dock, algorithm } = parseInput(input);
  algorithm.execute(dock, "grouped");
  const peekRes = dock.peekAll();
  console.log(peekRes.join(''));

}

function parseInput(input: string) {
  const [dockInput, algoInput] = input.split("\n\n");
  const algorithm = Algorithm.fromString(algoInput);
  const dock = Dock.fromString(dockInput);
  return { algorithm, dock };
}

main();
