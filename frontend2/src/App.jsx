import React, { useState } from 'react';
import GridInput from './components/GridInput';
import Controls from './components/Controls.jsx';
import Results from './components/Results';
import './styles/App.css';

const App = () => {
    const [gridSize, setGridSize] = useState(3);
    const [grid, setGrid] = useState([]);
    const [algorithm, setAlgorithm] = useState('A-Star');
    const [params, setParams] = useState({ const1: 1, const2: 1 });
    const [source, setSource] = useState([0, 0]);
    const [destination, setDestination] = useState([2, 2]);
    const [results, setResults] = useState(null);

    const handleRun = async () => {
        const response = await fetch('http://localhost:5000/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ algorithm, grid, params, source, destination }),
        });
        const data = await response.json();
        setResults(data);
    };

    return (
        <div className="App">
            <h1>Algorithm Comparison</h1>
            <Controls
                gridSize={gridSize}
                setGridSize={setGridSize}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                params={params}
                setParams={setParams}
                source={source}
                setSource={setSource}
                destination={destination}
                setDestination={setDestination}
                generateGrid={() => setGrid(Array(gridSize).fill(Array(gridSize).fill(0)))}
                runAlgorithm={handleRun}
            />
            <GridInput grid={grid} setGrid={setGrid} results={results} />
            {results && <Results results={results} />}
        </div>
    );
};

export default App;
