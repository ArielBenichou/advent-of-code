import { assert } from "console";
import { loadInput } from "../utils/load-input";

async function solve(file: string) {
  const input = await loadInput(file);
  const lines = input.split("\n").filter(Boolean);
  let sum = 0;

  for(const line of lines) {
    const it = line.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
    it.forEach(match => {
      sum += Number(match[1]) * Number(match[2]);
    })
  }

  return sum;
}

if (require.main === module) {
  (async () => {
    const example1 = await solve("2024/03_example.txt");
    assert(example1 === 161, "example A input should be 161");
    const star1 = await solve("2024/03_input.txt");
    assert(star1 === 163931492, "input A one answer should be 54927");
    console.log("first part:", star1);
    //
    //
    // const example2 = await solve("2023/01b_example.txt", secondNMap);
    // assert(example2 === 281, "example input B should be 281");
    // const star2 = await solve("2023/01b_input.txt", secondNMap);
    // assert(star2 === 54581, "input A one answer should be 54581");
    // console.log("second part:", star2);
  })()
}
