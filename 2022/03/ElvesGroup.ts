import { Rucksack } from "./Rucksack";

export class ElvesGroup {
  constructor(
    private r1: Rucksack,
    private r2: Rucksack,
    private r3: Rucksack
  ) {}

  findGroupBadge() {
    for (let i = 0; i < this.r1.length; i++) {
      const a = this.r1.getAt(i);
      for (let j = 0; j < this.r2.length; j++) {
        const b = this.r2.getAt(j);
        for (let k = 0; k < this.r3.length; k++) {
          const c = this.r3.getAt(k);
          if (a === b && a === c) {
            return a;
          }
        }
      }
    }

    throw new Error("no group badge");
  }
}
