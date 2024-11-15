const mazeRouting = (grid, source, destination) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
    ];
  
    const queue = [{ x: source.x, y: source.y, path: [] }];
    const visited = new Set();
  
    while (queue.length > 0) {
      const { x, y, path } = queue.shift();
  
      if (x === destination.x && y === destination.y) {
        return [...path, { x, y }];
      }
  
      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);
  
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && grid[nx][ny] === 0) {
          queue.push({
            x: nx,
            y: ny,
            path: [...path, { x, y }],
          });
        }
      }
    }
    return [];
  };
  
  module.exports = mazeRouting;
  