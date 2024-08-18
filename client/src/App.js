import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GoogleBarChart from './BarChart';
import './App.css';

const useFetchPlayers = (url) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPlayers(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { players, loading, error };
};

function App() {
  const url = "https://techeetaapi-etzzkfaosa-uw.a.run.app/";
  const { players, loading, error } = useFetchPlayers(url);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GoogleBarChart id="chart1" data={players} options={{
            yAxis: 'avg_speed',
            yLabel: "Average Speed",
            title: "Players Average Speed",
            colors: ['#b87333']
          }} />
        </Grid>
        <Grid item xs={12}>
          <GoogleBarChart id="chart2" data={players} options={{
            yAxis: 'distance',
            yLabel: "Distance",
            title: "Players Distance",
            colors: ['#1b9e72']
          }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
