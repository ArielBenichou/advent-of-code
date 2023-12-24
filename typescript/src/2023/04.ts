import { assert } from "console";
import { loadInput } from "../utils/load-input";
import { clearLastLine } from "../utils/clear-last-line";
class Card {
  id: number;
  winningNumbers: number[];
  numbers: number[];
  _matches: number[] | null;
  _copies: number[] | null;

  constructor(id: number, winningNumbers: number[], numbers: number[]) {
    this.id = id;
    this.winningNumbers = winningNumbers;
    this.numbers = numbers;
    this._matches = null;
    this._copies = null;
  }

  matches(): number[] {
    if (this._matches !== null) return this._matches;
    this._matches = this.numbers.filter(n => this.winningNumbers.includes(n));
    return this._matches;
  }

  copies(): number[] {
    if (this._copies !== null) return this._copies;
    this._copies = this.matches().map((_, idx) => idx + this.id + 1);
    return this._copies;
  }

  value(): number {
    const l = this.matches().length;
    return l === 0 ? 0 : 1 << (l - 1);
  }
}

function parseCard(line: string) {
  const id = Number(line.split(":")[0].split("Card")[1].trim());
  const [wnums, nums] = line.split(":")[1].split(" | ").map(n => n.trim().split(" ").filter(Boolean).map(Number));
  return new Card(id, wnums, nums);
}

async function solveA(file: string) {
  const input = await loadInput(file);
  const lines = input.split("\n").filter(Boolean);
  let sum = 0;

  let cards: Card[] = lines.map(parseCard);
  sum = cards.reduce((acc, card) => acc + card.value(), 0);

  return sum;
}

async function solveB(file: string) {
  const input = await loadInput(file);
  const lines = input.split("\n").filter(Boolean);

  let sum = 0;
  let cards: Card[] = lines.map(parseCard);
  let queue = cards.map(c => c.id);
  console.log(`it could take a while...`);
  console.log(`PROGERSS: ${sum}`);
  while (queue.length > 0) {
    const id = queue.pop()!;
    sum++;
    clearLastLine();
    console.log(`PROGERSS: ${sum}`);
    const card = cards[id - 1];
    const copies = card.copies();
    queue.push(...copies);
  }
  return sum;
}


if (require.main === module) {
  (async () => {
    const example1 = await solveA("2023/04a_example.txt");
    assert(example1 === 13, "example input A should be 13");
    const star1 = await solveA("2023/04_input.txt");
    assert(star1 === 22897, "input A one answer should be 22897");
    console.log("first part:", star1);


    const example2 = await solveB("2023/04b_example.txt");
    assert(example2 === 30, "example input B should be 30");
    const star2 = await solveB("2023/04_input.txt");
    assert(star2 === 5095824, "input B one answer should be 5095824");
    console.log("first part:", star2);
  })()
}
