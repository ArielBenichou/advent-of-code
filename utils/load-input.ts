import fs from "fs";

export function readInput(path:string = "./input.txt") {
  try {
    const input = fs.readFileSync(path, "utf-8");
    return input;
  } catch (error) {
    console.log(error);
  }
}