import React from 'react';
import Chart from 'react-apexcharts';

function LineChart() {
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
          show: false, // Disable toolbar (zoom, pan, etc.)
        },
        zoom: {
          enabled: false, // Disable zooming
        },
      },
      xaxis: {
        labels: {
          show: false, // Hide X-axis labels
        },
        axisBorder: {
          show: false, // Hide X-axis border
        },
        axisTicks: {
          show: false, // Hide X-axis ticks
        },
      },
      yaxis: {
        show: false, // Hide Y-axis entirely
      },
      grid: {
        show: false, // Hide all grid lines
      },
      stroke: {
        curve: 'smooth', // Make the line smooth (optional)
        width: 2, // Set the line thickness to 2px
        colors: ['#121217'], // Set the line color to #121217
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
        type='line'
        width='96%'
        height={176}
      />
    </div>
  );
}

export default LineChart;
