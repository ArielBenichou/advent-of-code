import { Crate } from "./Crate";

export class Stack {
  constructor(private crates: Crate[]) {}

  get length() {
    return this.crates.length;
  }

  push(crate: Crate): void {
    this.crates.push(crate);
  }

  pushMulti(crates: Crate[]): void {
    this.crates.push(...crates);
  }

  pop() {
    return this.crates.pop();
  }

  popMulti(qty: number): Crate[] {
    const popped: Crate[] = [];
    for (let i = 0; i < qty; i++) {
      popped.push(this.crates.pop()!);
    }
    return popped.reverse();
  }

  peek() {
    return this.crates.at(-1);
  }
}
