import { assert } from "console";
import { loadInput } from "../utils/load-input";


async function solve(file: string, nmap: Record<string, number>) {
  const input = await loadInput(file);
  const lines = input.split("\n").filter(Boolean);
  let sum = 0;
  for (const line of lines) {
    let num = "";
    num += find(line, nmap);
    num += find(line, nmap, "last");
    sum += Number(num);
  }
  return sum;
}


function find(str: string, nmap: Record<string, number>, mode: "first" | "last" = "first") {
  const isFirst = mode === "first";
  if (isFirst) {
    for (let i = 0; i < str.length; i++) {
      for (const n in nmap) {
        if (match(str, i, n)) {
          return nmap[n as keyof typeof nmap];
        }
      }
    }
  } else {
    let found: number | null = null;
    for (let i = 0; i < str.length; i++) {
      for (const n in nmap) {
        if (match(str, i, n)) {
          found = nmap[n as keyof typeof nmap];
        }
      }
    }
    if (found !== null) return found;
  }
  console.log(str)
  throw new Error("Boom! no number found.")
}

function match(str: string, idx: number, word: string) {
  if (word.length > str.length - idx) return false;
  for (let i = idx; i < str.length && (i - idx < word.length); i++) {
    if (str[i] !== word[i - idx]) return false;
  }
  return true;
}

if (require.main === module) {
  const firstNMap = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
    6: 6, 7: 7, 8: 8, 9: 9,
  };

  const secondNMap = {
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5,
    6: 6, 7: 7, 8: 8, 9: 9,
    one: 1, two: 2, three: 3,
    four: 4, five: 5, six: 6,
    seven: 7, eight: 8, nine: 9
  };
  (async () => {
    const example1 = await solve("2023/01a_example.txt", firstNMap);
    assert(example1 === 142, "example input A should be 142");
    const star1 = await solve("2023/01_input.txt", firstNMap);
    assert(star1 === 54927, "input A one answer should be 54927");
    console.log("first part:", star1);


    const example2 = await solve("2023/01b_example.txt", secondNMap);
    assert(example2 === 281, "example input B should be 281");
    const star2 = await solve("2023/01_input.txt", secondNMap);
    assert(star2 === 54581, "input A one answer should be 54581");
    console.log("second part:", star2);
  })()
}
