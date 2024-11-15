import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [gridSize, setGridSize] = useState(10);
  const [source, setSource] = useState({ x: 0, y: 0 });
  const [destination, setDestination] = useState({ x: 9, y: 9 });
  const [algorithm, setAlgorithm] = useState("pathfinder");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ gridSize, source, destination, algorithm });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Grid Size: <input type="number" value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} /></label>
      <label>Source (x, y): 
        <input type="number" value={source.x} onChange={(e) => setSource({ ...source, x: Number(e.target.value) })} />
        <input type="number" value={source.y} onChange={(e) => setSource({ ...source, y: Number(e.target.value) })} />
      </label>
      <label>Destination (x, y): 
        <input type="number" value={destination.x} onChange={(e) => setDestination({ ...destination, x: Number(e.target.value) })} />
        <input type="number" value={destination.y} onChange={(e) => setDestination({ ...destination, y: Number(e.target.value) })} />
      </label>
      <label>Algorithm:
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="pathfinder">Pathfinder</option>
          <option value="maze">Maze Routing</option>
        </select>
      </label>
      <button type="submit">Visualize</button>
    </form>
  );
};

export default InputForm;
