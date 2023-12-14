import { assert } from "console";
import { loadInput } from "../utils/load-input";

async function solve(file: string, callback: (id: number, game: Set[]) => void) {
  const input = await loadInput(file);
  const lines = input.split("\n").filter(Boolean);
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

    callback(gameId, sets);
  }
}
type Set = { [key in "green" | "blue" | "red"]: number; }

function isSolvable(game: Set[], compare: Set) {
  return !game.some((set) =>
    set.green > compare.green ||
    set.red > compare.red ||
    set.blue > compare.blue
  )
}

function powerSet(set: Set) {
  return set.red * set.blue * set.green;
}

function findMinimumSet(sets: Set[]) {
  return sets.reduce((min, curr) => {
    if (curr.green > min.green) min.green = curr.green;
    if (curr.blue > min.blue) min.blue = curr.blue;
    if (curr.red > min.red) min.red = curr.red;
    return min;
  }, { green: 0, red: 0, blue: 0 });
}

if (require.main === module) {
  (async () => {
    const compareSet: Set = { red: 12, green: 13, blue: 14 };
    let example1 = 0;
    await solve("2023/02a_example.txt", (id, sets) => {
      if (isSolvable(sets, compareSet)) {
        example1 += id;
      }
    });
    assert(example1 === 8, `example input A should be 8, got ${example1}`);
    let star1 = 0;
    await solve("2023/02a_input.txt", (id, sets) => {
      if (isSolvable(sets, compareSet)) {
        star1 += id;
      }
    });
    assert(star1 === 2593, "input A one answer should be 2593");
    console.log("first part:", star1);


    let example2 = 0;
    await solve("2023/02a_example.txt", (_, game) => {
      const set = findMinimumSet(game);
      example2 += powerSet(set);
    });
    assert(example2 === 2286, `example input B should be 2286, got ${example2}`);
    let star2 = 0;
    await solve("2023/02a_input.txt", (_, game) => {
      const set = findMinimumSet(game);
      star2 += powerSet(set);
    });
    assert(star2 === 54699, "input A one answer should be 54699");
    console.log("second part:", star2);
  })()
}
