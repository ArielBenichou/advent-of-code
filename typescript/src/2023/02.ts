import { assert } from "console";
import { loadInput } from "../utils/load-input";

async function solve(file: string, compareSet: Set) {
  const input = await loadInput(file);
  const lines = input.split("\n").filter(Boolean);
  let sum = 0;
  for (const line of lines) {
    let [game, setsString] = line.split(":");
    const gameId = Number(game.split(" ")[1]);
    const sets = setsString
      .split(";")
      .map(set => set
        .split(",")
        .map(el => el.trim())
      ).map(set => set.reduce((acc, el) => {
        const [v, k] = el.split(" ");
        const val = Number(v);
        const key = k as "green" | "red" | "blue";
        acc[key] = acc[key] !== undefined ? acc[key]! + val : val;
        return acc;
      }, { green: 0, red: 0, blue: 0 } as Set));

    if (isSolvable(sets, compareSet)) {
      sum += gameId;
    }
  }

  return sum;
}
type Set = { [key in "green" | "blue" | "red"]: number; }

function isSolvable(game: Set[], compare: Set) {
  return !game.some((set) =>
    set.green > compare.green ||
    set.red > compare.red ||
    set.blue > compare.blue
  )
}

if (require.main === module) {
  (async () => {
    const compareSet: Set = { red: 12, green: 13, blue: 14 };
    const example1 = await solve("2023/02a_example.txt", compareSet);
    assert(example1 === 8, "example input A should be 8");
    const star1 = await solve("2023/02a_input.txt", compareSet);
    assert(star1 === 2593, "input A one answer should be 2593");
    console.log("first part:", star1);


    // const example2 = await solve("2023/01b_example.txt", secondNMap);
    // assert(example2 === 281, "example input B should be 281");
    // const star2 = await solve("2023/01b_input.txt", secondNMap);
    // assert(star2 === 54581, "input A one answer should be 54581");
    // console.log("second part:", star2);
  })()
}
