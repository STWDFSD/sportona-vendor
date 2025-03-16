import React from 'react';
import Chart from 'react-apexcharts';

function LineChart() {
  const chartData = {
    series: [
      {
        name: 'Series 1',
        type: 'line',
        data: [
          { x: 0, y: 20 },
          { x: 20, y: 40 },
          { x: 30, y: 60 },
          { x: 40, y: 70 },
          { x: 60, y: 40 },
          { x: 70, y: 50 },
          { x: 80, y: 10 },
          { x: 100, y: 50 },
        ], // Sample data
      },
      {
        name: 'Series 2',
        type: 'line',
        data: [
          { x: 0, y: 30 },
          { x: 30, y: 10 },
          { x: 40, y: 50 },
          { x: 50, y: 30 },
          { x: 60, y: 80 },
          { x: 80, y: 90 },
          { x: 90, y: 20 },
          { x: 100, y: 10 },
        ], // Sample data
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
      legend: {
        show: false, // Hide series labels
      },
      grid: {
        show: false, // Hide all grid lines
      },
      stroke: {
        curve: 'straight', // Make the line smooth (optional)
        width: 2, // Set the line thickness to 2px
        colors: ['#121217', '#7047EB'], // Set the line color to #121217
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
        width='100%'
        height={176}
      />
    </div>
  );
}

export default LineChart;
