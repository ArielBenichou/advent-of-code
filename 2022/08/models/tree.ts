export type Position = { x: number; y: number };
export type Grid = number[][];
export type Direction = "north" | "south" | "west" | "east";

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
  const directions: Direction[] = ["north", "south", "east", "west"];
  const dirCounts = directions.map((dir) => isTreeHidden(pos, grid, dir));

  const isVisible = dirCounts.some((dir) => !dir.isHidden);
  const scenicScore = dirCounts.reduce((acc, dir) => acc * dir.viewCount, 1);

  return { isVisible, scenicScore };
}

function isTreeHidden(pos: Position, grid: Grid, direction: Direction) {
  const treeValue = grid[pos.y][pos.x];
  let viewCount = 0;
  let currX = pos.x;
  let currY = pos.y;
  let isHidden = false;

  // Continue looping until the tree is hidden or we reach the edge of the grid
  while (!isHidden) {
    if (direction === "north") currY--;
    if (direction === "south") currY++;
    if (direction === "west") currX--;
    if (direction === "east") currX++;
    if (
      !(
        currX >= 0 &&
        currX < (grid?.[currY]?.length || 0) &&
        currY >= 0 &&
        currY < grid.length
      )
    )
      break;
    viewCount++;
    isHidden = grid[currY][currX] >= treeValue;
  }

  return { isHidden, viewCount };
}
