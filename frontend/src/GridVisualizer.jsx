import React, { useEffect, useState } from "react";

const GridVisualizer = ({ grid, path }) => {
  const [visualGrid, setVisualGrid] = useState([]);

  useEffect(() => {
    // Update visual grid with the path
    const newGrid = [...grid];
    path.forEach(({ x, y }) => {
      newGrid[x][y] = "path";
    });
    setVisualGrid(newGrid);
  }, [path, grid]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${grid[0].length}, 20px)` }}>
      {visualGrid.map((row, i) =>
        row.map((cell, j) => (
          <div key={`${i}-${j}`} style={{
            width: 20, height: 20, backgroundColor: cell === "path" ? "blue" : "white", border: "1px solid black"
          }}></div>
        ))
      )}
    </div>
  );
};

export default GridVisualizer;
