import React, { useEffect } from 'react';

const GoogleTable = () => {
  useEffect(() => {
    // Function to load Google Charts and draw the table
    const loadGoogleCharts = () => {
      // Load the Google Charts library
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        // Load the necessary packages
        window.google.charts.load('current', { packages: ['table'] });
        window.google.charts.setOnLoadCallback(drawTable);
      };
      document.body.appendChild(script);
    };

    // Function to draw the table
    const drawTable = () => {
      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Name');
      data.addColumn('number', 'Salary');
      data.addColumn('boolean', 'Full Time Employee');
      data.addRows([
        ['Mike', { v: 10000, f: '$10,000' }, true],
        ['Jim', { v: 8000, f: '$8,000' }, false],
        ['Alice', { v: 12500, f: '$12,500' }, true],
        ['Bob', { v: 7000, f: '$7,000' }, true]
      ]);

      const table = new window.google.visualization.Table(document.getElementById('table_div'));

      table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
    };

    loadGoogleCharts(); // Load Google Charts when the component mounts

    // Clean up function to remove script from document
    return () => {
      const script = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div>
      <div id="table_div" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default GoogleTable;
