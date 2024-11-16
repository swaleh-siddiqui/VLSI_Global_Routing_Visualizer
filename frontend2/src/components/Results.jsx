import React from 'react';

const Results = ({ results }) => {
    if (!results) {
        return null;
    }

    return (
        <div className="results">
            <h2>Algorithm Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Path Length</td>
                        <td>{results.pathLength}</td>
                    </tr>
                    <tr>
                        <td>Runtime</td>
                        <td>{results.runtime.toFixed(2)} seconds</td>
                    </tr>
                </tbody>
            </table>

            <h3>Path</h3>
            <ul>
                {results.path.map(([row, col], index) => (
                    <li key={index}>
                        ({row}, {col})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Results;
