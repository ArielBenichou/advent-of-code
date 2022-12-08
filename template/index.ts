import { readInput } from "../utils/load-input";

function main() {
  const files = ["input", "example"];

  for (const file of files) {
    console.group(`${file}`);

    const input = readInput(__dirname + `/data/${file}.txt`);
    if (!input) throw new Error("input is invalid");

    // code here

    console.groupEnd();
  }
}

main();
