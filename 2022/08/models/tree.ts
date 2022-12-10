export type Position = { x: number; y: number };
export type Grid = number[][];

export function countVisibleTrees(grid: Grid): number {
  let count = 0;
  count += countOuterPerimeter(grid);
  for (let i = 1; i < grid.length - 1; i++) {
    const line = grid[i];
    for (let j = 1; j < line.length - 1; j++) {
      if (isTreeVisible({ x: j, y: i }, grid).isVisible) count++;
    }
  }
  return count;
}

export function findTopScenicScore(grid: Grid): number {
  let topScore = 0;
  for (let i = 1; i < grid.length - 1; i++) {
    const line = grid[i];
    for (let j = 1; j < line.length - 1; j++) {
      const currScore = isTreeVisible({ x: j, y: i }, grid).scenicScore;
      if (currScore > topScore) topScore = currScore;
    }
  }
  return topScore;
}

function countOuterPerimeter(grid: Grid) {
  let count = grid[0].length * 2;
  count += (grid.length - 2) * 2;
  return count;
}

function isTreeVisible(pos: Position, grid: Grid) {
  const north = isTreeHiddenNorth(pos, grid);
  const south = isTreeHiddenSouth(pos, grid);
  const west = isTreeHiddenWest(pos, grid);
  const east = isTreeHiddenEast(pos, grid);

  const isVisible =
    !north.isHidden || !south.isHidden || !west.isHidden || !east.isHidden;
  const scenicScore =
    north.viewCount * south.viewCount * west.viewCount * east.viewCount;

  return { isVisible, scenicScore };
}

function isTreeHiddenNorth(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  let viewCount = 0;
  for (let y = pos.y - 1; y >= 0; y--) {
    const currValue = grid[y][pos.x];
    viewCount++;
    if (currValue >= treeValue) {
      return { isHidden: true, viewCount };
    }
  }
  return { isHidden: false, viewCount };
}

function isTreeHiddenSouth(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  let viewCount = 0;
  for (let y = pos.y + 1; y < grid.length; y++) {
    const currValue = grid[y][pos.x];
    viewCount++;
    if (currValue >= treeValue) {
      return { isHidden: true, viewCount };
    }
  }
  return { isHidden: false, viewCount };
}

function isTreeHiddenWest(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  let viewCount = 0;
  for (let x = pos.x - 1; x >= 0; x--) {
    const currValue = grid[pos.y][x];
    viewCount++;
    if (currValue >= treeValue) {
      return { isHidden: true, viewCount };
    }
  }
  return { isHidden: false, viewCount };
}

function isTreeHiddenEast(pos: Position, grid: Grid) {
  const treeValue = grid[pos.y][pos.x];
  let viewCount = 0;
  for (let x = pos.x + 1; x < grid[pos.y].length; x++) {
    const currValue = grid[pos.y][x];
    viewCount++;
    if (currValue >= treeValue) {
      return { isHidden: true, viewCount };
    }
  }
  return { isHidden: false, viewCount };
}
