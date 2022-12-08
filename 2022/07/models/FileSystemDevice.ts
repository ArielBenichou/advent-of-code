import { FileSystemNode } from "./FilesystemNode";

export class FileSystemDevice {
  constructor(private maxSpace: number, private root: FileSystemNode) {}

  getRoot() {
    return this.root;
  }

  getSmallestDirThatWillCleanDisk(neededSpace: number) {
    const spaceToClean = neededSpace - this.getUnusedSpace();
    const dirsToCheck = [this.root];
    const possibleDirs: FileSystemNode[] = [];
    while (dirsToCheck.length) {
      const d = dirsToCheck.shift();
      if (!d) throw new Error("no d");
      if (d.getTotalSize() >= spaceToClean) possibleDirs.push(d);
      d.forEach((child) => {
        dirsToCheck.push(child);
      }, "dir");
    }

    possibleDirs.sort((a, b) => a.getTotalSize() - b.getTotalSize());

    return possibleDirs[0];
  }

  private getUnusedSpace() {
    return this.maxSpace - this.getUsedSpace();
  }

  private getUsedSpace() {
    return this.root.getTotalSize();
  }

  static fromInput(str: string, maxSpace: number): FileSystemDevice {
    const root: FileSystemNode = new FileSystemNode("/", 0, null, true);
    let ptr: FileSystemNode = root;
    for (const command of str.split("$ ")) {
      const lines = command.split("\n");
      const firstLine = lines[0];

      if (firstLine === "cd /") {
        ptr = root;
      } else if (firstLine === "cd ..") {
        ptr = ptr.getParent();
      } else if (/^cd .*$/.test(firstLine)) {
        const dir = firstLine.split(" ")[1];
        const foundDir = ptr.findChildDir(dir);
        if (!foundDir) {
          const newDir = new FileSystemNode(dir, 0, ptr, true);
          ptr.addChild(newDir);
          ptr = newDir;
        } else {
          ptr = foundDir;
        }
      } else if (/^ls$/.test(firstLine)) {
        const otherLines = lines.slice(1);
        otherLines.forEach((file) => {
          if (!file) return;
          const [sizeOrDir, name] = file.split(" ");
          const isDir = sizeOrDir === "dir";

          ptr.addChild(
            new FileSystemNode(
              name,
              isDir ? 0 : parseInt(sizeOrDir),
              ptr,
              isDir
            )
          );
        });
      }
    }

    return new FileSystemDevice(maxSpace, root);
  }

  static getSumByThreshold(fs: FileSystemNode, threshold: number): number {
    let sum = 0;
    const size = fs.getTotalSize();
    if (size <= threshold && fs.isDirectory()) sum += size;

    fs.forEach((child) => {
      sum += FileSystemDevice.getSumByThreshold(child, threshold);
    });

    return sum;
  }
}
