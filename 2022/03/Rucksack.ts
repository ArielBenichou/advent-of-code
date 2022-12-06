export class Rucksack {
  readonly length: number;
  constructor(private compartmentA: string[], private compartmentB: string[]) {
    this.length = compartmentA.length + compartmentB.length;
  }

  static fromString(str: string) {
    const a = str.slice(0, str.length / 2).split("");
    const b = str.slice(str.length / 2).split("");
    return new Rucksack(a, b);
  }

  values() {
    return [...this.compartmentA, ...this.compartmentB];
  }

  getAt(index: number) {
    return this.values()[index];
  }

  findCommonInCompartments() {
    for (const itemA of this.compartmentA) {
      for (const itemB of this.compartmentB) {
        if (itemA === itemB) return itemA;
      }
    }
    throw new Error("no common item in compartments")
  }
}
