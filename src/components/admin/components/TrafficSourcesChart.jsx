import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrafficSourcesChart = () => {
  const data = {
    labels: ['Direct', 'Social Media', 'Search', 'Referral'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [300, 50, 100, 40],
        backgroundColor: ['#4988d4', '#22c55e', '#f59e0b', '#ef4444'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [5, 5],
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Traffic Sources</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TrafficSourcesChart;