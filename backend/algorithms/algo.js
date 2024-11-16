class PriorityQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element, priority) {
      this.items.push({ element, priority });
      this.items.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue() {
      return this.items.shift().element;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  // Heuristic function for A* (Manhattan distance)
  function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  
  // A* Algorithm
  function aStar(grid, source, destination) {
    const rows = grid.length;
    const cols = grid[0].length;
    const openSet = new PriorityQueue();
    const cameFrom = new Map();
    const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  
    gScore[source.x][source.y] = 0;
    fScore[source.x][source.y] = heuristic(source, destination);
  
    openSet.enqueue(source, fScore[source.x][source.y]);
  
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];
  
    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();
  
      if (current.x === destination.x && current.y === destination.y) {
        const path = [];
        let temp = current;
        while (temp) {
          path.push([temp.x, temp.y]);
          temp = cameFrom.get(`${temp.x},${temp.y}`);
        }
        // console.log(path.reverse());
        return path.reverse();
      }
  
      for (const dir of directions) {
        const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
  
        if (
          neighbor.x < 0 ||
          neighbor.x >= rows ||
          neighbor.y < 0 ||
          neighbor.y >= cols ||
          grid[neighbor.x][neighbor.y] === 1
        ) {
          continue;
        }
  
        const tentativeGScore = gScore[current.x][current.y] + 1;
  
        if (tentativeGScore < gScore[neighbor.x][neighbor.y]) {
          cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
          gScore[neighbor.x][neighbor.y] = tentativeGScore;
          fScore[neighbor.x][neighbor.y] =
            tentativeGScore + heuristic(neighbor, destination);
          openSet.enqueue(neighbor, fScore[neighbor.x][neighbor.y]);
        }
      }
    }
  
    return []; // No path found
  }
  
  // Dijkstra's Algorithm
  function dijkstra(grid, source, destination) {
    const rows = grid.length;
    const cols = grid[0].length;
    const pq = new PriorityQueue();
    const distances = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const cameFrom = new Map();
  
    distances[source.x][source.y] = 0;
    pq.enqueue(source, 0);
  
    const directions = [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ];
  
    while (!pq.isEmpty()) {
      const current = pq.dequeue();
  
      if (current.x === destination.x && current.y === destination.y) {
        const path = [];
        let temp = current;
        while (temp) {
          path.push([temp.x, temp.y]);
          temp = cameFrom.get(`${temp.x},${temp.y}`);
        }
        return path.reverse();
      }
  
      for (const dir of directions) {
        const neighbor = { x: current.x + dir.x, y: current.y + dir.y };
  
        if (
          neighbor.x < 0 ||
          neighbor.x >= rows ||
          neighbor.y < 0 ||
          neighbor.y >= cols ||
          grid[neighbor.x][neighbor.y] === 1
        ) {
          continue;
        }
  
        const tentativeDistance = distances[current.x][current.y] + 1;
  
        if (tentativeDistance < distances[neighbor.x][neighbor.y]) {
          cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
          distances[neighbor.x][neighbor.y] = tentativeDistance;
          pq.enqueue(neighbor, tentativeDistance);
        }
      }
    }
  
    return []; // No path found
  }
  
  module.exports = { aStar, dijkstra };
  