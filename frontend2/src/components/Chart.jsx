import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.design),
    datasets: [
      {
        label: 'Runtime',
        data: data.map((item) => item.runtime),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Wire Length',
        data: data.map((item) => item.wire_length),
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;
