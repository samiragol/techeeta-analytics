import React, { useEffect, useRef } from 'react';

const sortByField = (array, field, order = 'desc') => {
  return array.sort((a, b) => {
    if (a[field] < b[field]) return order === 'desc' ? 1 : -1;
    if (a[field] > b[field]) return order === 'desc' ? -1 : 1;
    return 0;
  });
};

// Function to load Google Charts and draw the chart
const loadGoogleCharts = (callback) => {
  if (window.google && window.google.charts) {
    callback();
  } else {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart', 'bar'] });
      window.google.charts.setOnLoadCallback(callback);
    };
    document.body.appendChild(script);
  }
};

// Function to draw the chart
const drawChart = (data, containerId, chartOptions) => {
  const dataTable = new window.google.visualization.DataTable();
  dataTable.addColumn('string', 'Player');
  dataTable.addColumn('number', chartOptions.yLabel);
  
  const sortedPlayers = sortByField(data, chartOptions.yAxis, 'desc');
  const rows = sortedPlayers?.map(player => [player.player_name, player[chartOptions.yAxis]]) || [];
  dataTable.addRows(rows);

  const options = {
    title: chartOptions.title,
    chartArea: { width: '50%' },
    hAxis: {
      title: chartOptions.yLabel,
      minValue: 0
    },
    vAxis: {
      title: 'Player'
    },
    colors: chartOptions.colors || ['#1b9e77'],
  };

  const chart = new window.google.visualization.BarChart(document.getElementById(containerId));
  chart.draw(dataTable, options);
};

const GoogleBarChart = ({ data, options, id }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const callback = () => drawChart(data, id, options);
    loadGoogleCharts(callback);

    return () => {
      // Cleanup function
      const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [data, id]);

  return (
    <div>
      <div id={id} style={{ width: '100%', height: '500px' }} ref={chartRef}></div>
    </div>
  );
};

export default GoogleBarChart;
