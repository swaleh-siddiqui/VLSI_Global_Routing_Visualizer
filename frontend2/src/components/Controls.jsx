import React from 'react';

const Controls = ({
    gridSize,
    setGridSize,
    algorithm,
    setAlgorithm,
    params,
    setParams,
    source,
    setSource,
    destination,
    setDestination,
    generateGrid,
    runAlgorithm,
}) => (
    <div className="controls">
        <label>
            Grid Size:
            <input
                type="number"
                value={gridSize}
                onChange={(e) => setGridSize(parseInt(e.target.value))}
            />
        </label>
        <button onClick={generateGrid}>Generate Grid</button>
        <label>
            Algorithm:
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="A-Star">A-Star</option>
                <option value="Dijkstra">Dijkstra</option>
            </select>
        </label>
        <label>
            Source (row, col):
            <input
                type="text"
                value={source.join(',')}
                onChange={(e) => setSource(e.target.value.split(',').map(Number))}
            />
        </label>
        <label>
            Destination (row, col):
            <input
                type="text"
                value={destination.join(',')}
                onChange={(e) => setDestination(e.target.value.split(',').map(Number))}
            />
        </label>
        <label>
            Const1:
            <input
                type="number"
                value={params.const1}
                onChange={(e) => setParams({ ...params, const1: parseFloat(e.target.value) })}
            />
        </label>
        <label>
            Const2:
            <input
                type="number"
                value={params.const2}
                onChange={(e) => setParams({ ...params, const2: parseFloat(e.target.value) })}
            />
        </label>
        <button onClick={runAlgorithm}>Run Algorithm</button>
    </div>
);

export default Controls;
