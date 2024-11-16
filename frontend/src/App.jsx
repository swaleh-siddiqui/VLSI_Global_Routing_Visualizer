
import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Ensure you have the CSS file for styling

const App = () => {
  const [gridSize, setGridSize] = useState(3); // Default grid size
  const [grid, setGrid] = useState([]);
  const [source, setSource] = useState({ x: 0, y: 0 });
  const [destination, setDestination] = useState({ x: 0, y: 0 });
  const [algorithm, setAlgorithm] = useState("a-star"); // Default algorithm
  const [path, setPath] = useState([]);
  const [runtime, setRuntime] = useState(null); // Track runtime
  const [pathLength, setPathLength] = useState(null); // Track path length

  // Initialize the grid
  const initializeGrid = () => {
    const newGrid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    );
    setGrid(newGrid);
    setPath([]); // Reset the path
    setRuntime(null); // Reset runtime
    setPathLength(null); // Reset path length
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
      setRuntime(response.data.runtime); // Set runtime from the response
      setPathLength(response.data.pathLength); // Set path length from the response
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
      <br />

      <div >
        <label>
          Grid Size:
          <input
            className="form-control"
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value) || 3)}
          />
        </label>
        <button onClick={initializeGrid}>Initialize Grid</button>
      </div>

      <br />
      <br />

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
                        : (grid[rowIndex][colIndex] === 1)
                        ? "red"
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

          <br />
          <br />

          <h3>Source and Destination</h3>
          <br />
          <div >
            <label className=" row">
              <h5 className="col-sm-4">Source (x, y):</h5>
              <input
                className="form-control col-sm-4"
                type="number"
                value={source.x}
                onChange={(e) => setSource({ ...source, x: parseInt(e.target.value) || 0 })}
              />
              <input
                className="form-control col-sm-4"
                type="number"
                value={source.y}
                onChange={(e) => setSource({ ...source, y: parseInt(e.target.value) || 0 })}
              />
            </label>
          </div>
          <div >
            <label className="row">
              <h5 className="col-sm-4">Destination (x, y):</h5>
              <input
                className="form-control col-sm-3"
                type="number"
                value={destination.x}
                onChange={(e) =>
                  setDestination({ ...destination, x: parseInt(e.target.value) || 0 })
                }
              />
              <input
                className="form-control col-sm-4"
                type="number"
                value={destination.y}
                onChange={(e) =>
                  setDestination({ ...destination, y: parseInt(e.target.value) || 0 })
                }
              />
            </label>
          </div>

          <br /><br />

          <h3>Select Algorithm</h3>
          <br />
          <div>
            <label>
              Algorithm:
              <br />
              <br />
              <select className="form-control" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option className="form-control" value="a-star">A-star</option>
                <option className="form-control" value="d">Dijkstra</option>
              </select>
            </label>
            <button onClick={handleSubmit}>Visualize</button>
          </div>

          
        </div>
      )}

      <br /><br />

      {path.length > 0 && (
        <>
        <h3>Generated Path:</h3>
        <br />
        <div className="gridpath">
          
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
                        : (grid[rowIndex][colIndex] === 1)
                        ? "red"
                        : ""
                    }`}
                  ></div>
                ))}
              </div>
            ))}
          </div>

          <br />
          <br />

          <div className="card shadow">
            <h3>Results:</h3>
            <p>Path Length: {pathLength}</p>
            <p>Runtime: {runtime} ms</p>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default App;
