import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = data.labels;
    const chartData = {
      labels: labels,
      datasets: data.datasets,
    };

    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Population Density',
          },
        },
      },
    });

    return () => {
      chartInstance.destroy(); // destroy previous chart 
    };
  }, [data]);

  return <canvas id="myChart" />;
};

export default ChartComponent;