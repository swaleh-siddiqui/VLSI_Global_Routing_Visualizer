const pathfinder = (grid, source, destination) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [
      [0, 1], [1, 0], [0, -1], [-1, 0],
    ];
  
    const heuristic = (x, y) =>
      Math.abs(destination.x - x) + Math.abs(destination.y - y);
  
    const pq = [{ x: source.x, y: source.y, cost: 0, estimate: 0, path: [] }];
    const visited = new Set();
  
    while (pq.length > 0) {
      pq.sort((a, b) => a.estimate - b.estimate);
      const { x, y, cost, path } = pq.shift();
  
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
          pq.push({
            x: nx,
            y: ny,
            cost: cost + 1,
            estimate: cost + 1 + heuristic(nx, ny),
            path: [...path, { x, y }],
          });
        }
      }
    }
    return [];
  };
  
  module.exports = pathfinder;
  