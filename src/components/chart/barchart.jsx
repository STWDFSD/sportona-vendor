import React from 'react';
import Chart from 'react-apexcharts';
import SVG from 'components/renderSvg';
import first from '../../media/svgs/finance/first.svg';
import last from '../../media/svgs/finance/last.svg';

// Separate constants for better maintainability
const CHART_COLORS = {
  current: '#474D66',
  previous: '#E5E7EB'
};

function BarChart({
  currentPeriodData = [],
  lastPeriodData = [],
  currentTotal = '£15,936.12',
  lastTotal = '£13,864.42',
  percentageChange = 13,
  sportFilter = 'Baseball'
}) {
  const chartData = {
    series: [
      {
        name: 'Current Period',
        data: currentPeriodData.length ? currentPeriodData : [1200, 800, 900, 1600, 200, 900, 2000, 1000, 900, 200, 1500, 1000, 300, 800, 1200, 600],
      },
      {
        name: 'Last Period',
        data: lastPeriodData.length ? lastPeriodData : [1000, 700, 800, 1400, 0, 800, 1800, 900, 800, 0, 1300, 900, 200, 700, 1100, 500],
      }
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
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '50%',
          dataLabels: {
            position: 'top',
          },
        }
      },
      colors: [CHART_COLORS.current, CHART_COLORS.previous],
      xaxis: {
        categories: ['31 Jan', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', '|', 'Today'],
        labels: {
          show: true,
          style: {
            fontSize: '12px',
            colors: '#6B7280' // gray-500 color to match the design
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      dataLabels: { enabled: false },
      legend: { show: false },
      tooltip: {
        enabled: true,
        theme: 'dark',
        y: {
          formatter: (value) => `£${value.toLocaleString()}`
        }
      }
    },
  };

  const PeriodIndicator = ({ icon, label, className }) => (
    <span className="flex items-center gap-1">
      <span className={`size-3 bg-purple-400 rounded-sm ${className}`}>
        <SVG icon={icon} />
      </span>
      <span className="text-sm">{label}</span>
    </span>
  );


  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4 w-[99%]">
        <div>
          <h2 className="text-sm font-medium text-gray-600">Service Revenue</h2>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{currentTotal}</span>
            <span className={`text-sm ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange)}%
            </span>
          </div>
          <p className="text-sm text-gray-500">vs {lastTotal} last period</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PeriodIndicator icon={first} label="Chosen period" />
            <PeriodIndicator icon={last} label="Last period" />
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded-full border hover:bg-gray-50 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            <span className="text-sm">{sportFilter}</span>
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