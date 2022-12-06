import { Stack } from "./Stack";

export class Dock {
  constructor(private stacks: Stack[]) {}

  peekAll() {
    return this.stacks.map((stack) => stack.peek());
  }

  moveCrates(
    from: number,
    to: number,
    qty: number = 1,
    mode: "grouped" | "one_by_one" = "one_by_one"
  ) {
    if (from < 0) throw new Error("from can be less than 0");
    if (to > this.stacks.length)
      throw new Error("to can be greater than stacks in the dock");
    if (qty > this.stacks[from].length)
      throw new Error("not enough crates in stack");

    if (mode === "one_by_one") {
      for (let i = 0; i < qty; i++) {
        this.stacks[to].push(this.stacks[from].pop()!);
      }
    } else if (mode === "grouped") {
      this.stacks[to].pushMulti(this.stacks[from].popMulti(qty)!);
    }
  }

  static fromString(str: string) {
    const lines = str.split("\n");
    const stacksLines = lines
      .slice(0, -1)
      .map((line) => line2Crates(line, 3))
      .reverse();
    const numbers = lines
      .at(-1)!
      .split(" ")
      .filter((el) => el);

    const stacks = numbers.map(
      (_, idx) =>
        new Stack(stacksLines.map((crates) => crates[idx]).filter((el) => el))
    );

    return new Dock(stacks);
  }
}

function line2Crates(str: string, size: number) {
  const arr: string[] = [];
  for (let i = 0; i < str.length; i += size + 1) {
    const crate = str.slice(i, i + size);
    arr.push(crate[1] === " " ? "" : crate[1]);
  }
  return arr;
}
