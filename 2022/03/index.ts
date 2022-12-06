import { readInput } from "../../utils/load-input";
import { ElvesGroup } from "./ElvesGroup";
import { parseInput } from "./parse";
import { char2PriorityMap } from "./priority";
import { Rucksack } from "./Rucksack";

function main() {
  const input = readInput(__dirname + "/input.txt");
  if (!input) throw new Error("input is invalid");

  const rucksacks = parseInput(input);

  const commons = rucksacks.map((sack) => sack.findCommonInCompartments());
  const prioritiesSum = commons
    .map((item) => char2PriorityMap[item])
    .reduce((sum, n) => sum + n, 0);
  console.log("prio sum - ", prioritiesSum);

  const elvesGroups: ElvesGroup[] = [];
  for (let i = 0; i < rucksacks.length; i += 3) {
    const group = rucksacks.slice(i, i + 3) as [Rucksack, Rucksack, Rucksack];
    elvesGroups.push(new ElvesGroup(...group));
  }
  const sumPrioGroup = elvesGroups
    .map((g) => g.findGroupBadge())
    .map((b) => char2PriorityMap[b])
    .reduce((sum, n) => sum + n, 0);
  console.log("sum prio group - ", sumPrioGroup);
}

main();
