import { readInput } from "../../utils/load-input";
import { countVisibleTrees, findTopScenicScore, Grid } from "./models/tree";

function parseInput(str: string): Grid {
  return str
    .split("\n")
    .map((line) => line.split("").map((el) => parseInt(el)));
}

function main() {
  const files = ["input", "example"];

  for (const file of files) {
    console.group(`${file}`);

    const input = readInput(__dirname + `/data/${file}.txt`);
    if (!input) throw new Error("input is invalid");

    const grid = parseInput(input);
    const visibleTreesCount = countVisibleTrees(grid);
    console.log("visible Trees", visibleTreesCount);
    const topScore = findTopScenicScore(grid);
    console.log("top scenic score", topScore);


    console.groupEnd();
  }
}

main();
