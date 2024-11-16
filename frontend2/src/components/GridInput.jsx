import React from 'react';

const GridInput = ({ grid, setGrid, results }) => {
    const handleChange = (i, j, value) => {
        const newGrid = [...grid];
        newGrid[i][j] = parseInt(value) || 0;
        setGrid(newGrid);
    };

    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}>
            {grid.map((row, i) =>
                row.map((cell, j) => {
                    const isPath =
                        results?.path.some(([x, y]) => x === i && y === j) || false;
                    return (
                        <input
                            key={`${i}-${j}`}
                            type="number"
                            value={cell}
                            className={isPath ? 'path' : ''}
                            onChange={(e) => handleChange(i, j, e.target.value)}
                        />
                    );
                })
            )}
        </div>
    );
};

export default GridInput;
