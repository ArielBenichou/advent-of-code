import { readInput } from "../utils/load-input";

function main() {
  const input = readInput(__dirname + "/data/input.txt");
  if (!input) throw new Error("input is invalid");
}

main();
