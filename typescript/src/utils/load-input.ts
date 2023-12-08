import { promises as fs } from "fs";
import { resolve } from "path";

/**
 * @param {string} file should be from the inputs folder
 * ex. 2023/01_example.txt
*/
export async function loadInput(file: string) {
  const input = await fs.readFile(resolve(__dirname, "../../../inputs/", file), "utf8");
  return input;
}

