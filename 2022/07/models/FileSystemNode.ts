export class FileSystemNode {
  private children: FileSystemNode[];
  private parent: FileSystemNode | null;
  private name: string;
  private size: number;
  private isDir: boolean;

  constructor(
    name: string,
    size: number,
    parent: FileSystemNode | null = null,
    isDirectory: boolean = false
  ) {
    this.name = name;
    this.size = size;
    this.children = [];
    this.parent = parent;
    this.isDir = isDirectory;
  }

  getChildren() {
    return this.children;
  }

  addChild(child: FileSystemNode) {
    this.children.push(child);
  }

  getTotalSize(): number {
    if (this.isFile()) return this.getSize();
    let sum = 0;
    this.forEach((child) => (sum += child.getTotalSize()));
    return sum;
  }

  getSize() {
    return this.size;
  }

  getName() {
    return this.name;
  }

  getParent() {
    if (!this.parent) throw new Error("no parent for " + this.name);
    return this.parent;
  }

  isFile(): boolean {
    return !this.children.length;
  }

  isDirectory(): boolean {
    return this.isDir;
  }

  findChildDir(name: string) {
    for (const child of this.children) {
      if (child.getName() === name && child.isDirectory()) return child;
    }
    return null;
  }

  forEach(
    fn: (child: FileSystemNode) => void,
    filter: "none" | "dir" | "file" = "none"
  ) {
    for (const child of this.children) {
      if (filter === "none") fn(child);
      else if (filter === "dir" && child.isDirectory()) fn(child);
      else if (filter === "file" && child.isFile()) fn(child);
    }
  }

  private _toString(tabs: number, lines: string[]): string {
    lines.push(
      `${" ".repeat(tabs)}- ${this.name} (${
        this.isDirectory() ? "dir" : `file, size=${this.getSize()}`
      })`
    );

    this.forEach((child) => {
      child._toString(tabs + 1, lines);
    });

    return lines.join("\n");
  }

  toString() {
    return this._toString(0, []);
  }
}
