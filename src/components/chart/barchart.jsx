import React from 'react';
import Chart from 'react-apexcharts';

function BarChart() {
  const chartData = {
    series: [
      {
        name: 'Series 1',
        data: [0, 0, 0], // Sample data
      },
    ],
    options: {
      chart: {
        id: 'basic-line',
        type: 'line',
        height: 350,
        toolbar: {
          show: false, // Disable toolbar (zoom, pan, download, etc.)
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // X-axis labels
      },
      markers: {
        size: 0, // Hide data point markers
      },
      dataLabels: {
        enabled: false, // Hide data labels on the line
      },
      title: {
        text: '',
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        width={'96%'}
        height={350}
      />
    </div>
  );
}

export default BarChart;
