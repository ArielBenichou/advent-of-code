export type Position = { x: number; y: number };
export type Grid = number[][];

export function countVisibleTrees(grid: Grid): number {
  let count = 0;
  count += countOuterPerimeter(grid);
  for (let i = 1; i < grid.length - 1; i++) {
    const line = grid[i];
    for (let j = 1; j < line.length - 1; j++) {
      if (isTreeVisible({ x: j, y: i }, grid)) count++;
    }
  }
  return count;
}

function countOuterPerimeter(grid: Grid) {
  let count = grid[0].length * 2;
  count += (grid.length - 2) * 2;
  return count;
}

function isTreeVisible(pos: Position, grid: Grid): boolean {
  return (
    !isTreeHiddenNorth(pos, grid) ||
    !isTreeHiddenSouth(pos, grid) ||
    !isTreeHiddenWest(pos, grid) ||
    !isTreeHiddenEast(pos, grid)
  );
}

function isTreeHiddenNorth(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  for (let y = pos.y - 1; y >= 0; y--) {
    const currValue = grid[y][pos.x];
    if (currValue >= treeValue) {
      return true;
    }
  }
  return false;
}

function isTreeHiddenSouth(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  for (let y = pos.y + 1; y < grid.length; y++) {
    const currValue = grid[y][pos.x];
    if (currValue >= treeValue) {
      return true;
    }
  }
  return false;
}

function isTreeHiddenWest(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  for (let x = pos.x - 1; x >= 0; x--) {
    const currValue = grid[pos.y][x];
    if (currValue >= treeValue) {
      return true;
    }
  }
  return false;
}

function isTreeHiddenEast(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  for (let x = pos.x + 1; x < grid[pos.y].length; x++) {
    const currValue = grid[pos.y][x];
    if (currValue >= treeValue) {
      return true;
    }
  }
  return false;
}
