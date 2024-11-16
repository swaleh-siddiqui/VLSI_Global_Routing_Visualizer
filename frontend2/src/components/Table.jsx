import React from 'react';

const Table = ({ data }) => (
    <table>
        <thead>
            <tr>
                <th>Node</th>
                <th>Runtime</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {data.flat().map((row, index) => (
                <tr key={index}>
                    <td>{row.node}</td>
                    <td>{row.runtime.toFixed(2)}</td>
                    <td>{row.value}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default Table;
