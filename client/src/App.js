import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from '@mui/material/Alert';
import GoogleBarChart from './BarChart';
import GoogleTable from './Table';
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
      <Grid container spacing={1} rowSpacing={2} columnSpacing={2}>
      <Grid spacing={3} item xs={12} sx={{ margin: 6 }}>
        <Alert variant="outlined" severity="info">
        This web app is currently under development, and all rights are reserved by Techeeta Group.
        </Alert>
        </Grid>
        <Grid item xs={11.5} sx={{ margin: 2 }}>
          <GoogleTable rows={players} />
        </Grid>
        <Grid item xs={12}>
          <GoogleBarChart id="chart1" data={players} options={{
            yAxis: 'avg_speed',
            yLabel: "Average Speed",
            title: "Players Average Speed",
            colors: ['#76A7FA']
          }} />
        </Grid>
        <Grid item xs={12}>
          <GoogleBarChart id="chart2" data={players} options={{
            yAxis: 'distance',
            yLabel: "Distance",
            title: "Players Distance",
            colors: ['#C5A5CF']
          }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
