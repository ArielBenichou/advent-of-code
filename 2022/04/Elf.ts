export class Elf {
  constructor(private min: number, private max: number) {}

  /**
   *
   * @param range like 5-7, which mean [5,6,7]
   */
  static fromRange(range: string) {
    const [min, max] = range.split("-");
    return new Elf(Number(min), Number(max));
  }

  isElfIncluded(other: Elf) {
    return this.min <= other.min && this.max >= other.max;
  }

  isElfOverlap(other: Elf) {
    return this.min <= other.max && this.max >= other.min;
  }
}
