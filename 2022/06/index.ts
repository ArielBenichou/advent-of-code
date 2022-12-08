import { readInput } from "../../utils/load-input";

function isStringMadeOfUniqueCharacters(str: string): boolean {
  const split = str.split("");
  return [...new Set(split).values()].length === split.length;
}

function findNonRepeatingString(str: string, len: number) {
  for (let i = len; i < str.length; i++) {
    const slice = str.slice(i - len, i);
    if (isStringMadeOfUniqueCharacters(slice)) return i;
  }
  return -1;
}

function main() {
  const files = ["input", "example"];

  for (const file of files) {
    console.group(`${file}`);

    const input = readInput(__dirname + `/data/${file}.txt`);
    if (!input) throw new Error("input is invalid");

    const startOfPacketIndex = findNonRepeatingString(input, 4);
    const startOfMessageIndex = findNonRepeatingString(input, 14);
    console.log({ startOfPacketIndex, startOfMessageIndex });

    console.groupEnd();
  }
}

main();
