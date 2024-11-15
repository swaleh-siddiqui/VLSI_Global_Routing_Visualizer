import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Ensure you have the CSS file for styling

const App = () => {
  const [gridSize, setGridSize] = useState(3); // Default grid size
  const [grid, setGrid] = useState([]);
  const [source, setSource] = useState({ x: 0, y: 0 });
  const [destination, setDestination] = useState({ x: 0, y: 0 });
  const [algorithm, setAlgorithm] = useState("pathfinder"); // Default algorithm
  const [path, setPath] = useState([]);

  // Initialize the grid
  const initializeGrid = () => {
    const newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    );
    setGrid(newGrid);
    setPath([]); // Reset the path
  };

  const updateGridValue = (row, col, value) => {
    const updatedGrid = [...grid];
    updatedGrid[row][col] = parseInt(value) || 0; // Convert input to number
    setGrid(updatedGrid);
  };

  const handleSubmit = async () => {
    const requestBody = {
      algorithm,
      grid,
      source,
      destination,
    };

    try {
      const response = await axios.post("http://localhost:5000/route", requestBody);
      setPath(response.data.path);
    } catch (error) {
      console.error("Error in routing:", error);
    }
  };

  const isPathCell = (row, col) => {
    return path.some((p) => p.x === row && p.y === col);
  };

  return (
    <div>
      <h1>VLSI Global Routing Visualization</h1>

      <div>
        <label>
          Grid Size:
          <input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value) || 3)}
          />
        </label>
        <button onClick={initializeGrid}>Initialize Grid</button>
      </div>

      {grid.length > 0 && (
        <div>
          <h3>Enter Grid Values</h3>
          <div className="grid-container">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`grid-cell ${
                      rowIndex === source.x && colIndex === source.y
                        ? "source"
                        : rowIndex === destination.x && colIndex === destination.y
                        ? "destination"
                        : isPathCell(rowIndex, colIndex)
                        ? "path"
                        : ""
                    }`}
                  >
                    <input
                      type="number"
                      value={grid[rowIndex][colIndex]}
                      onChange={(e) => updateGridValue(rowIndex, colIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <h3>Source and Destination</h3>
          <div>
            <label>
              Source (x, y):
              <input
                type="number"
                value={source.x}
                onChange={(e) => setSource({ ...source, x: parseInt(e.target.value) || 0 })}
              />
              <input
                type="number"
                value={source.y}
                onChange={(e) => setSource({ ...source, y: parseInt(e.target.value) || 0 })}
              />
            </label>
          </div>
          <div>
            <label>
              Destination (x, y):
              <input
                type="number"
                value={destination.x}
                onChange={(e) =>
                  setDestination({ ...destination, x: parseInt(e.target.value) || 0 })
                }
              />
              <input
                type="number"
                value={destination.y}
                onChange={(e) =>
                  setDestination({ ...destination, y: parseInt(e.target.value) || 0 })
                }
              />
            </label>
          </div>

          <h3>Select Algorithm</h3>
          <div>
            <label>
              Algorithm:
              <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="pathfinder">Pathfinder</option>
                <option value="maze">Maze Routing</option>
              </select>
            </label>
          </div>

          <button onClick={handleSubmit}>Visualize</button>
        </div>
      )}

      {path.length > 0 && (
        <div>
          <h3>Generated Path:</h3>
          <div className="grid-container">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`grid-cell ${
                      rowIndex === source.x && colIndex === source.y
                        ? "source"
                        : rowIndex === destination.x && colIndex === destination.y
                        ? "destination"
                        : isPathCell(rowIndex, colIndex)
                        ? "path"
                        : ""
                    }`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
