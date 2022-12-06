import { readInput } from "../../utils/load-input";
import { Elf } from "./Elf";

function main() {
  const input = readInput(__dirname + "/input.txt");
  if (!input) throw new Error("input is invalid");
  const pairs = parseInput(input);

  const includedPairs = pairs.filter(
    (pair) => pair[0].isElfIncluded(pair[1]) || pair[1].isElfIncluded(pair[0])
  );

  console.log("included pairs", includedPairs.length);

  const overlapPairs = pairs.filter(
    (pair) => pair[0].isElfOverlap(pair[1]) || pair[1].isElfOverlap(pair[0])
  );

  console.log("overlap pairs", overlapPairs.length);
}

function parseInput(input: string) {
  const elvesPairs = input.split("\n").map((line) => {
    const [a, b] = line.split(",");
    return [Elf.fromRange(a), Elf.fromRange(b)] as [Elf, Elf];
  });
  return elvesPairs;
}

main();
