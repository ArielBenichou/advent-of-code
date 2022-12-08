import { readInput } from "../../utils/load-input";
import { FileSystemDevice } from "./models/FileSystemDevice";

function main() {
  const files = ["example", "input"];

  for (const file of files) {
    console.group(`${file}`);

    const input = readInput(__dirname + `/data/${file}.txt`);
    if (!input) throw new Error("input is invalid");

    const device = FileSystemDevice.fromInput(input, 70_000_000);
    // print the file tree
    // console.log(device.getRoot().toString());

    const sum = FileSystemDevice.getSumByThreshold(device.getRoot(), 100000);
    console.log({ sum });

    const smallestDir = device.getSmallestDirThatWillCleanDisk(30_000_000);
    console.log(`name: ${smallestDir.getName()}, size: ${smallestDir.getTotalSize()}`);

    console.groupEnd();
  }
}

main();
