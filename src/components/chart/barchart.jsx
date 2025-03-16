import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import SVG from 'components/renderSvg';
import SelectButton from 'components/button/selectButton';
import first from '../../media/svgs/finance/first.svg';
import last from '../../media/svgs/finance/last.svg';

const options = ['Football', 'Baseball', 'Boxing'];

// Separate constants for better maintainability
const CHART_COLORS = {
  current: '#474D66',
  previous: '#E5E7EB',
};

function BarChart({
  currentPeriodData = [],
  lastPeriodData = [],
  currentTotal = '£15,936.12',
  lastTotal = '£13,864.42',
  percentageChange = 13,
  sportFilter = 'Baseball',
}) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const chartData = {
    series: [
      {
        name: 'Current Period',
        data: currentPeriodData.length
          ? currentPeriodData
          : [
              1200, 800, 900, 1600, 200, 900, 2000, 1000, 900, 200, 1500, 1000,
              300, 800, 1200, 600,
            ],
      },
      {
        name: 'Last Period',
        data: lastPeriodData.length
          ? lastPeriodData
          : [
              1000, 700, 800, 1400, 0, 800, 1800, 900, 800, 0, 1300, 900, 200,
              700, 1100, 500,
            ],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '50%',
          dataLabels: {
            position: 'top',
          },
        },
      },
      colors: [CHART_COLORS.current, CHART_COLORS.previous],
      xaxis: {
        categories: [
          '31 Jan',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          '|',
          'Today',
        ],
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            colors: '#6B7280', // gray-500 color to match the design
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      dataLabels: { enabled: false },
      legend: { show: false },
      tooltip: {
        enabled: true,
        theme: 'dark',
        y: {
          formatter: value => `£${value.toLocaleString()}`,
        },
      },
    },
  };

  const PeriodIndicator = ({ icon, label, className }) => (
    <span className='flex items-center gap-1'>
      <span className={`size-3 bg-purple-400 rounded-sm ${className}`}>
        <SVG icon={icon} />
      </span>
      <span className='text-sm'>{label}</span>
    </span>
  );

  return (
    <div className='w-full p-4'>
      <div className='flex justify-between items-center mb-4 w-[99%]'>
        <div>
          <h2 className='text-sm font-medium text-gray-600'>Service Revenue</h2>
          <div className='flex items-center gap-2'>
            <span className='text-2xl font-semibold'>{currentTotal}</span>
            <span
              className={`text-sm ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange)}%
            </span>
          </div>
          <p className='text-sm text-gray-500'>vs {lastTotal} last period</p>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-4'>
            <PeriodIndicator icon={first} label='Chosen period' />
            <PeriodIndicator icon={last} label='Last period' />
          </div>

          <div className='flex self-end hover:bg-gray-50 cursor-pointer'>
            <SelectButton
              options={options}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </div>
      </div>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        width={'99%'}
        height={350}
      />
    </div>
  );
}

export default BarChart;
